from abc import ABC, abstractmethod
from typing import List
from models.course import Course, Module, ModuleItem, FileDetails

class BaseLMSProvider(ABC):
    """Base class for LMS providers"""
    
    @abstractmethod
    async def get_courses(self) -> List[Course]:
        """Get all courses from the LMS"""
        pass
    
    @abstractmethod
    async def get_course(self, course_id: str) -> Course:
        """Get a specific course by ID"""
        pass
    
    @abstractmethod
    async def get_course_modules(self, course_id: str) -> List[Module]:
        """Get modules for a specific course"""
        pass
    
    @abstractmethod
    async def get_module_items(self, module_id: str, course_id: str) -> List[ModuleItem]:
        """Get items for a specific module"""
        pass
    
    @abstractmethod
    async def get_file_details(self, file_id: str, course_id: str) -> FileDetails:
        """Get details for a specific file"""
        pass
    
    @abstractmethod
    async def test_connection(self) -> bool:
        """Test connection to the LMS"""
        pass
