import logging
from typing import List, Optional
from datetime import datetime
from models.course import Course, CourseCreate, CourseUpdate
from services.lms_service import LMSService
from services.database_service import DatabaseService

logger = logging.getLogger(__name__)

class CourseService:
    """Service for course operations"""
    
    def __init__(self):
        self.lms_service = LMSService()
        self.db_service = None  # Initialize lazily when needed
    
    def _get_db_service(self):
        """Get database service, initializing if needed"""
        if self.db_service is None:
            self.db_service = DatabaseService()
        return self.db_service
    
    async def get_courses_from_db(self) -> List[Course]:
        """Get courses from database"""
        try:
            db_service = self._get_db_service()
            return await db_service.get_courses()
        except Exception as e:
            logger.error(f"Error fetching courses from database: {e}")
            raise
    
    async def get_courses_from_lms_direct(self, lms_type: str = "canvas") -> List[Course]:
        """Get courses directly from LMS without storing in database"""
        try:
            # Get courses directly from LMS
            courses = await self.lms_service.get_courses_from_lms(lms_type)
            logger.info(f"Fetched {len(courses)} courses directly from {lms_type}")
            return courses
        except Exception as e:
            logger.error(f"Error fetching courses directly from LMS: {e}")
            raise
    
    async def get_course_by_id(self, course_id: str) -> Optional[Course]:
        """Get a specific course by ID from database"""
        try:
            db_service = self._get_db_service()
            return await db_service.get_course_by_id(course_id)
        except Exception as e:
            logger.error(f"Error fetching course {course_id} from database: {e}")
            raise
    
    async def sync_courses_from_lms(self, lms_type: str = "canvas") -> List[Course]:
        """Sync courses from LMS to database"""
        try:
            # Get courses from LMS
            lms_courses = await self.lms_service.get_courses_from_lms(lms_type)
            
            # Store courses in database
            db_service = self._get_db_service()
            synced_courses = []
            for course in lms_courses:
                # Check if course already exists
                existing_course = await db_service.get_course_by_lms_id(course.lms_id, lms_type)
                
                if existing_course:
                    # Update existing course
                    updated_course = await db_service.update_course_by_lms_id(
                        course.lms_id, lms_type, course
                    )
                    synced_courses.append(updated_course)
                else:
                    # Create new course
                    new_course = await db_service.create_course(course)
                    synced_courses.append(new_course)
            
            logger.info(f"Synced {len(synced_courses)} courses from {lms_type}")
            return synced_courses
            
        except Exception as e:
            logger.error(f"Error syncing courses from LMS: {e}")
            raise
    
    async def create_course(self, course: CourseCreate) -> Course:
        """Create a new course"""
        try:
            db_service = self._get_db_service()
            return await db_service.create_course(course)
        except Exception as e:
            logger.error(f"Error creating course: {e}")
            raise
    
    async def update_course(self, course_id: str, course: CourseUpdate) -> Optional[Course]:
        """Update a course"""
        try:
            db_service = self._get_db_service()
            return await db_service.update_course(course_id, course)
        except Exception as e:
            logger.error(f"Error updating course {course_id}: {e}")
            raise
    
    async def delete_course(self, course_id: str) -> bool:
        """Delete a course"""
        try:
            db_service = self._get_db_service()
            return await db_service.delete_course(course_id)
        except Exception as e:
            logger.error(f"Error deleting course {course_id}: {e}")
            raise
