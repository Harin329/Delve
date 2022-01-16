from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import List
from app.models.py_object_id import PyObjectId

class StudyModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    study_id : str = Field(...)
    title: str = Field(...)
    researchers: List[str] = Field(...)
    participants: List[str] = Field(...)
    max_participants: int = Field(...)
    contact: EmailStr = Field(...)
    description: str = Field(...)
    requirements: str = Field(...)
    categories: List[str] = Field(...)
    status: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "study_id": "abcdefg",
                "title": "An Investigation into the Effects of Y in Treating Z",
                "researchers": ["Alice", "Bob"],
                "participants": ["Charlie"],
                "max_participants": 50,
                "contact": "researcher@test.com",
                "description": "We are seeking 50 participants for a trial of Y to determine its effects on Z",
                "requirements": "Must be between 18-55 years old",
                "categories": ["clinical"],
                "status": "open",
            }
        }