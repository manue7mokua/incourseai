import logging
from typing import List, Optional
from datetime import datetime
from models.course import Course, CourseCreate, CourseUpdate
from supabase import create_client, Client
from utils.config import get_settings

logger = logging.getLogger(__name__)

class DatabaseService:
    """Service for database operations"""
    
    def __init__(self):
        self.settings = get_settings()
        self.supabase: Client = create_client(
            self.settings.supabase_url,
            self.settings.supabase_service_role_key
        )
    
    async def get_courses(self) -> List[Course]:
        """Get all courses from database"""
        try:
            response = self.supabase.table("courses").select("*").execute()
            courses = []
            for course_data in response.data:
                courses.append(Course(
                    id=course_data["id"],
                    name=course_data["name"],
                    code=course_data["code"],
                    description=course_data.get("description"),
                    instructor=course_data.get("instructor"),
                    semester=course_data.get("semester"),
                    year=course_data.get("year"),
                    lms_id=course_data.get("lms_id"),
                    lms_provider=course_data.get("lms_provider"),
                    created_at=datetime.fromisoformat(course_data["created_at"].replace('Z', '+00:00')),
                    updated_at=datetime.fromisoformat(course_data["updated_at"].replace('Z', '+00:00'))
                ))
            return courses
        except Exception as e:
            logger.error(f"Error fetching courses from database: {e}")
            raise
    
    async def get_course_by_id(self, course_id: str) -> Optional[Course]:
        """Get a specific course by ID"""
        try:
            response = self.supabase.table("courses").select("*").eq("id", course_id).execute()
            if not response.data:
                return None
            
            course_data = response.data[0]
            return Course(
                id=course_data["id"],
                name=course_data["name"],
                code=course_data["code"],
                description=course_data.get("description"),
                instructor=course_data.get("instructor"),
                semester=course_data.get("semester"),
                year=course_data.get("year"),
                lms_id=course_data.get("lms_id"),
                lms_provider=course_data.get("lms_provider"),
                created_at=datetime.fromisoformat(course_data["created_at"].replace('Z', '+00:00')),
                updated_at=datetime.fromisoformat(course_data["updated_at"].replace('Z', '+00:00'))
            )
        except Exception as e:
            logger.error(f"Error fetching course {course_id} from database: {e}")
            raise
    
    async def get_course_by_lms_id(self, lms_id: str, lms_provider: str) -> Optional[Course]:
        """Get a course by LMS ID and provider"""
        try:
            response = self.supabase.table("courses").select("*").eq("lms_id", lms_id).eq("lms_provider", lms_provider).execute()
            if not response.data:
                return None
            
            course_data = response.data[0]
            return Course(
                id=course_data["id"],
                name=course_data["name"],
                code=course_data["code"],
                description=course_data.get("description"),
                instructor=course_data.get("instructor"),
                semester=course_data.get("semester"),
                year=course_data.get("year"),
                lms_id=course_data.get("lms_id"),
                lms_provider=course_data.get("lms_provider"),
                created_at=datetime.fromisoformat(course_data["created_at"].replace('Z', '+00:00')),
                updated_at=datetime.fromisoformat(course_data["updated_at"].replace('Z', '+00:00'))
            )
        except Exception as e:
            logger.error(f"Error fetching course by LMS ID {lms_id} from database: {e}")
            raise
    
    async def create_course(self, course: CourseCreate) -> Course:
        """Create a new course"""
        try:
            now = datetime.utcnow()
            course_data = {
                "name": course.name,
                "code": course.code,
                "description": course.description,
                "instructor": course.instructor,
                "semester": course.semester,
                "year": course.year,
                "lms_id": course.lms_id,
                "lms_provider": course.lms_provider,
                "created_at": now.isoformat(),
                "updated_at": now.isoformat()
            }
            
            response = self.supabase.table("courses").insert(course_data).execute()
            created_course = response.data[0]
            
            return Course(
                id=created_course["id"],
                name=created_course["name"],
                code=created_course["code"],
                description=created_course.get("description"),
                instructor=created_course.get("instructor"),
                semester=created_course.get("semester"),
                year=created_course.get("year"),
                lms_id=created_course.get("lms_id"),
                lms_provider=created_course.get("lms_provider"),
                created_at=datetime.fromisoformat(created_course["created_at"].replace('Z', '+00:00')),
                updated_at=datetime.fromisoformat(created_course["updated_at"].replace('Z', '+00:00'))
            )
        except Exception as e:
            logger.error(f"Error creating course: {e}")
            raise
    
    async def update_course(self, course_id: str, course: CourseUpdate) -> Optional[Course]:
        """Update a course"""
        try:
            update_data = {k: v for k, v in course.dict().items() if v is not None}
            if update_data:
                update_data["updated_at"] = datetime.utcnow().isoformat()
                
                response = self.supabase.table("courses").update(update_data).eq("id", course_id).execute()
                if not response.data:
                    return None
                
                updated_course = response.data[0]
                return Course(
                    id=updated_course["id"],
                    name=updated_course["name"],
                    code=updated_course["code"],
                    description=updated_course.get("description"),
                    instructor=updated_course.get("instructor"),
                    semester=updated_course.get("semester"),
                    year=updated_course.get("year"),
                    lms_id=updated_course.get("lms_id"),
                    lms_provider=updated_course.get("lms_provider"),
                    created_at=datetime.fromisoformat(updated_course["created_at"].replace('Z', '+00:00')),
                    updated_at=datetime.fromisoformat(updated_course["updated_at"].replace('Z', '+00:00'))
                )
            return await self.get_course_by_id(course_id)
        except Exception as e:
            logger.error(f"Error updating course {course_id}: {e}")
            raise
    
    async def update_course_by_lms_id(self, lms_id: str, lms_provider: str, course: Course) -> Course:
        """Update a course by LMS ID"""
        try:
            update_data = {
                "name": course.name,
                "code": course.code,
                "description": course.description,
                "instructor": course.instructor,
                "semester": course.semester,
                "year": course.year,
                "updated_at": datetime.utcnow().isoformat()
            }
            
            response = self.supabase.table("courses").update(update_data).eq("lms_id", lms_id).eq("lms_provider", lms_provider).execute()
            if not response.data:
                raise Exception("Course not found")
            
            updated_course = response.data[0]
            return Course(
                id=updated_course["id"],
                name=updated_course["name"],
                code=updated_course["code"],
                description=updated_course.get("description"),
                instructor=updated_course.get("instructor"),
                semester=updated_course.get("semester"),
                year=updated_course.get("year"),
                lms_id=updated_course.get("lms_id"),
                lms_provider=updated_course.get("lms_provider"),
                created_at=datetime.fromisoformat(updated_course["created_at"].replace('Z', '+00:00')),
                updated_at=datetime.fromisoformat(updated_course["updated_at"].replace('Z', '+00:00'))
            )
        except Exception as e:
            logger.error(f"Error updating course by LMS ID {lms_id}: {e}")
            raise
    
    async def delete_course(self, course_id: str) -> bool:
        """Delete a course"""
        try:
            response = self.supabase.table("courses").delete().eq("id", course_id).execute()
            return len(response.data) > 0
        except Exception as e:
            logger.error(f"Error deleting course {course_id}: {e}")
            raise
