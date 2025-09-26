import httpx
import logging
from typing import List, Optional
from models.course import Course, Module, ModuleItem, FileDetails
from integrations.base_lms import BaseLMSProvider

logger = logging.getLogger(__name__)

class CanvasProvider(BaseLMSProvider):
    """Canvas LMS integration provider"""
    
    def __init__(self, api_base_url: str, api_key: str):
        self.api_base_url = api_base_url.rstrip('/')
        self.api_key = api_key
        self.client = httpx.AsyncClient(
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            timeout=30.0
        )
    
    def _convert_canvas_course(self, course_data: dict) -> Course:
        """Convert Canvas course data to our Course model"""
        from datetime import datetime
        
        full_course_name = course_data.get("name", "")
        course_semester = ""
        course_year = ""
        course_code = ""
        
        if full_course_name:
            # Extract semester
            if "Spring" in full_course_name:
                course_semester = "Spring"
            elif "Summer" in full_course_name:
                course_semester = "Summer"
            elif "Fall" in full_course_name:
                course_semester = "Fall"
            elif "Winter" in full_course_name:
                course_semester = "Winter"
            
            # Extract year
            import re
            year_match = re.search(r'\d{4}', full_course_name)
            course_year = year_match.group(0) if year_match else "Not found"
            
            # Extract course code from parentheses
            code_match = re.search(r'\(([^)]+)\)$', full_course_name)
            course_code = code_match.group(1) if code_match else ""
        else:
            course_code = "Not found"
            course_year = "Not found"
            course_semester = "Not found"
        
        # Handle datetime fields - Canvas might not always provide these
        created_at = course_data.get("created_at")
        updated_at = course_data.get("updated_at")
        
        # Convert to datetime objects if they exist, otherwise use current time
        if created_at:
            try:
                created_at = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
            except (ValueError, AttributeError):
                created_at = datetime.now()
        else:
            created_at = datetime.now()
            
        if updated_at:
            try:
                updated_at = datetime.fromisoformat(updated_at.replace('Z', '+00:00'))
            except (ValueError, AttributeError):
                updated_at = datetime.now()
        else:
            updated_at = datetime.now()
        
        return Course(
            id=str(course_data.get("id", "")),
            lms_id=str(course_data.get("id", "")),
            lms_provider="canvas",
            name=course_data.get("name", ""),
            code=course_code,
            instructor=None,  # Canvas doesn't provide this in courses endpoint
            description=course_data.get("description"),
            semester=course_semester,
            year=course_year,
            created_at=created_at,
            updated_at=updated_at
        )
    
    def _convert_canvas_module(self, module_data: dict, course_id: str) -> Module:
        """Convert Canvas module data to our Module model"""
        return Module(
            id=str(module_data.get("id", "")),
            lms_id=str(module_data.get("id", "")),
            course_id=course_id,
            name=module_data.get("name", ""),
            description=None,
            items_count=module_data.get("items_count"),
            prerequisites=module_data.get("prerequisites")
        )
    
    def _convert_canvas_module_item(self, item_data: dict, module_id: str, course_id: str) -> ModuleItem:
        """Convert Canvas module item data to our ModuleItem model"""
        return ModuleItem(
            id=str(item_data.get("id", "")),
            lms_id=str(item_data.get("id", "")),
            name=item_data.get("title", ""),
            module_id=module_id,
            course_id=course_id,
            type=item_data.get("type", ""),
            url=item_data.get("url"),
            lms_content_id=str(item_data.get("content_id", "")) if item_data.get("content_id") else None,
            position=item_data.get("position")
        )
    
    def _convert_canvas_file_details(self, file_data: dict) -> FileDetails:
        """Convert Canvas file data to our FileDetails model"""
        content_type = file_data.get("content-type", "")
        file_name = file_data.get("filename", "")
        file_size = file_data.get("size", 0)
        
        # Basic validation
        is_valid = content_type.startswith(('application/pdf', 'text/', 'image/'))
        validation_error = None if is_valid else "Unsupported file type"
        
        return FileDetails(
            id=str(file_data.get("id", "")),
            canvas_id=str(file_data.get("id", "")),
            name=file_name,
            url=file_data.get("url", ""),
            size=file_size,
            type=content_type,
            is_valid_for_processing=is_valid,
            validation_error=validation_error,
            file_type_name=content_type.split('/')[0] if '/' in content_type else None
        )
    
    async def get_courses(self) -> List[Course]:
        """Get all courses from Canvas"""
        try:
            response = await self.client.get(
                f"{self.api_base_url}/courses",
                params={"per_page": 100, "enrollment_type": "student"}
            )
            response.raise_for_status()
            
            courses_data = response.json()
            
            # Filter out courses with access restrictions
            filtered_courses = [
                course for course in courses_data
                if not course.get("access_restricted_by_date", False)
            ]
            
            return [self._convert_canvas_course(course) for course in filtered_courses]
            
        except httpx.HTTPError as e:
            logger.error(f"HTTP error fetching courses: {e}")
            raise Exception(f"Failed to fetch courses: {e}")
        except Exception as e:
            logger.error(f"Error fetching courses: {e}")
            raise Exception(f"Failed to fetch courses: {e}")
    
    async def get_course(self, course_id: str) -> Course:
        """Get a specific course by ID"""
        try:
            response = await self.client.get(f"{self.api_base_url}/courses/{course_id}")
            response.raise_for_status()
            
            course_data = response.json()
            return self._convert_canvas_course(course_data)
            
        except httpx.HTTPError as e:
            logger.error(f"HTTP error fetching course {course_id}: {e}")
            raise Exception(f"Failed to fetch course: {e}")
        except Exception as e:
            logger.error(f"Error fetching course {course_id}: {e}")
            raise Exception(f"Failed to fetch course: {e}")
    
    async def get_course_modules(self, course_id: str) -> List[Module]:
        """Get modules for a specific course"""
        try:
            response = await self.client.get(
                f"{self.api_base_url}/courses/{course_id}/modules",
                params={"per_page": 100}
            )
            response.raise_for_status()
            
            modules_data = response.json()
            modules = [self._convert_canvas_module(module, course_id) for module in modules_data]
            
            # Get module items for each module
            for module in modules:
                module.module_items = await self.get_module_items(module.lms_id, course_id)
            
            return modules
            
        except httpx.HTTPError as e:
            logger.error(f"HTTP error fetching modules for course {course_id}: {e}")
            raise Exception(f"Failed to fetch course modules: {e}")
        except Exception as e:
            logger.error(f"Error fetching modules for course {course_id}: {e}")
            raise Exception(f"Failed to fetch course modules: {e}")
    
    async def get_module_items(self, module_id: str, course_id: str) -> List[ModuleItem]:
        """Get items for a specific module"""
        try:
            response = await self.client.get(
                f"{self.api_base_url}/courses/{course_id}/modules/{module_id}/items",
                params={"per_page": 100}
            )
            response.raise_for_status()
            
            items_data = response.json()
            return [self._convert_canvas_module_item(item, module_id, course_id) for item in items_data]
            
        except httpx.HTTPError as e:
            logger.error(f"HTTP error fetching module items for module {module_id}: {e}")
            raise Exception(f"Failed to fetch module items: {e}")
        except Exception as e:
            logger.error(f"Error fetching module items for module {module_id}: {e}")
            raise Exception(f"Failed to fetch module items: {e}")
    
    async def get_file_details(self, file_id: str, course_id: str) -> FileDetails:
        """Get details for a specific file"""
        try:
            response = await self.client.get(f"{self.api_base_url}/courses/{course_id}/files/{file_id}")
            response.raise_for_status()
            
            file_data = response.json()
            return self._convert_canvas_file_details(file_data)
            
        except httpx.HTTPError as e:
            logger.error(f"HTTP error fetching file {file_id}: {e}")
            raise Exception(f"Failed to fetch file details: {e}")
        except Exception as e:
            logger.error(f"Error fetching file {file_id}: {e}")
            raise Exception(f"Failed to fetch file details: {e}")
    
    async def test_connection(self) -> bool:
        """Test connection to Canvas"""
        try:
            response = await self.client.get(f"{self.api_base_url}/users/self")
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Connection test failed: {e}")
            return False
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()
