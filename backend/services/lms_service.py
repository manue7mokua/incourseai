import logging
from typing import List, Optional
from integrations.canvas import CanvasProvider
from models.course import Course
from utils.config import get_settings

logger = logging.getLogger(__name__)

class LMSService:
    """Service for LMS operations"""
    
    def __init__(self):
        self.settings = get_settings()
    
    def _get_lms_provider(self, lms_type: str = "canvas"):
        """Get the appropriate LMS provider"""
        if lms_type.lower() == "canvas":
            if not self.settings.canvas_api_base_url or not self.settings.canvas_api_key:
                raise ValueError("Canvas API credentials not configured")
            return CanvasProvider(
                self.settings.canvas_api_base_url,
                self.settings.canvas_api_key
            )
        else:
            raise ValueError(f"Unsupported LMS type: {lms_type}")
    
    async def get_courses_from_lms(self, lms_type: str = "canvas") -> List[Course]:
        """Get courses directly from LMS"""
        try:
            provider = self._get_lms_provider(lms_type)
            courses = await provider.get_courses()
            await provider.close()
            return courses
        except Exception as e:
            logger.error(f"Error fetching courses from LMS: {e}")
            raise
    
    async def get_course_from_lms(self, course_id: str, lms_type: str = "canvas") -> Course:
        """Get a specific course from LMS"""
        try:
            provider = self._get_lms_provider(lms_type)
            course = await provider.get_course(course_id)
            await provider.close()
            return course
        except Exception as e:
            logger.error(f"Error fetching course {course_id} from LMS: {e}")
            raise
    
    async def test_connection(self, lms_type: str = "canvas") -> bool:
        """Test connection to LMS"""
        try:
            provider = self._get_lms_provider(lms_type)
            is_connected = await provider.test_connection()
            await provider.close()
            return is_connected
        except Exception as e:
            logger.error(f"Error testing LMS connection: {e}")
            return False
