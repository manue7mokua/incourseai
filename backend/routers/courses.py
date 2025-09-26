from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
import logging

from services.course_service import CourseService
from models.course import Course, CourseCreate, CourseUpdate

router = APIRouter()
logger = logging.getLogger(__name__)

# Dependency injection
def get_course_service() -> CourseService:
    return CourseService()

@router.get("/", response_model=List[Course])
async def get_courses(
    lms: Optional[str] = "canvas",
    sync: bool = False,
    course_service: CourseService = Depends(get_course_service)
):
    """
    Get all courses. Optionally sync from LMS.
    """
    try:
        if sync:
            # Sync courses from LMS to database
            courses = await course_service.sync_courses_from_lms(lms)
        else:
            # Get courses from database
            courses = await course_service.get_courses_from_db()
        
        return courses
    except Exception as e:
        logger.error(f"Error fetching courses: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch courses: {str(e)}")

@router.get("/lms", response_model=List[Course])
async def get_courses_from_lms(
    lms: Optional[str] = "canvas",
    course_service: CourseService = Depends(get_course_service)
):
    """
    Get courses directly from LMS without storing in database.
    """
    try:
        # Get courses directly from LMS
        courses = await course_service.get_courses_from_lms_direct(lms)
        return courses
    except Exception as e:
        logger.error(f"Error fetching courses from LMS: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch courses from LMS: {str(e)}")

@router.get("/{course_id}", response_model=Course)
async def get_course(
    course_id: str,
    course_service: CourseService = Depends(get_course_service)
):
    """
    Get a specific course by ID.
    """
    try:
        course = await course_service.get_course_by_id(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching course {course_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch course: {str(e)}")

@router.post("/sync", response_model=List[Course])
async def sync_courses(
    lms: str = "canvas",
    course_service: CourseService = Depends(get_course_service)
):
    """
    Sync courses from LMS to database.
    """
    try:
        courses = await course_service.sync_courses_from_lms(lms)
        return courses
    except Exception as e:
        logger.error(f"Error syncing courses: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to sync courses: {str(e)}")

@router.post("/", response_model=Course)
async def create_course(
    course: CourseCreate,
    course_service: CourseService = Depends(get_course_service)
):
    """
    Create a new course.
    """
    try:
        new_course = await course_service.create_course(course)
        return new_course
    except Exception as e:
        logger.error(f"Error creating course: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create course: {str(e)}")

@router.put("/{course_id}", response_model=Course)
async def update_course(
    course_id: str,
    course: CourseUpdate,
    course_service: CourseService = Depends(get_course_service)
):
    """
    Update a course.
    """
    try:
        updated_course = await course_service.update_course(course_id, course)
        if not updated_course:
            raise HTTPException(status_code=404, detail="Course not found")
        return updated_course
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating course {course_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update course: {str(e)}")

@router.delete("/{course_id}")
async def delete_course(
    course_id: str,
    course_service: CourseService = Depends(get_course_service)
):
    """
    Delete a course.
    """
    try:
        success = await course_service.delete_course(course_id)
        if not success:
            raise HTTPException(status_code=404, detail="Course not found")
        return {"message": "Course deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting course {course_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to delete course: {str(e)}")
