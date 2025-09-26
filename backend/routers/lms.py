from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
import logging

from services.lms_service import LMSService
from models.course import Course

router = APIRouter()
logger = logging.getLogger(__name__)

# Dependency injection
def get_lms_service() -> LMSService:
    return LMSService()

@router.get("/courses", response_model=List[Course])
async def get_lms_courses(
    lms: str = "canvas",
    lms_service: LMSService = Depends(get_lms_service)
):
    """
    Get courses directly from LMS (Canvas).
    """
    try:
        courses = await lms_service.get_courses_from_lms(lms)
        return courses
    except Exception as e:
        logger.error(f"Error fetching courses from LMS: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch courses from LMS: {str(e)}")

@router.get("/courses/{course_id}", response_model=Course)
async def get_lms_course(
    course_id: str,
    lms: str = "canvas",
    lms_service: LMSService = Depends(get_lms_service)
):
    """
    Get a specific course from LMS.
    """
    try:
        course = await lms_service.get_course_from_lms(course_id, lms)
        return course
    except Exception as e:
        logger.error(f"Error fetching course {course_id} from LMS: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch course from LMS: {str(e)}")

@router.post("/test-connection")
async def test_lms_connection(
    lms: str = "canvas",
    lms_service: LMSService = Depends(get_lms_service)
):
    """
    Test connection to LMS.
    """
    try:
        is_connected = await lms_service.test_connection(lms)
        if is_connected:
            return {"status": "success", "message": f"Successfully connected to {lms}"}
        else:
            return {"status": "error", "message": f"Failed to connect to {lms}"}
    except Exception as e:
        logger.error(f"Error testing LMS connection: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to test LMS connection: {str(e)}")

@router.get("/config")
async def get_lms_config():
    """
    Get LMS configuration (for debugging).
    """
    try:
        from utils.config import get_settings
        settings = get_settings()
        return {
            "canvas_api_base_url": settings.canvas_api_base_url,
            "canvas_api_key": settings.canvas_api_key[:20] + "..." if settings.canvas_api_key else None,
            "has_canvas_url": bool(settings.canvas_api_base_url),
            "has_canvas_key": bool(settings.canvas_api_key)
        }
    except Exception as e:
        logger.error(f"Error getting LMS config: {e}")
        return {"error": str(e)}
