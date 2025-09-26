from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class CourseBase(BaseModel):
    name: str
    code: str
    description: Optional[str] = None
    instructor: Optional[str] = None
    semester: Optional[str] = None
    year: Optional[str] = None
    lms_id: Optional[str] = None
    lms_provider: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    description: Optional[str] = None
    instructor: Optional[str] = None
    semester: Optional[str] = None
    year: Optional[str] = None

class Course(CourseBase):
    id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class Module(BaseModel):
    id: Optional[str] = None
    lms_id: Optional[str] = None
    course_id: str
    name: str
    description: Optional[str] = None
    items_count: Optional[int] = None
    prerequisites: Optional[str] = None

class ModuleItem(BaseModel):
    id: Optional[str] = None
    lms_id: Optional[str] = None
    name: str
    module_id: str
    course_id: str
    type: str
    url: Optional[str] = None
    lms_content_id: Optional[str] = None
    position: Optional[int] = None

class FileDetails(BaseModel):
    id: Optional[str] = None
    canvas_id: Optional[str] = None
    name: str
    url: str
    size: int
    type: str
    is_valid_for_processing: bool
    validation_error: Optional[str] = None
    file_type_name: Optional[str] = None
