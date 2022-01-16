from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import List
from datetime import datetime
from app.models.py_object_id import PyObjectId

class UpdateModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    study_id: str = Field(...)
    creator: str = Field(...)
    description: str = Field(...)
    created_at: datetime = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "study_id": "abcdefg",
                "creator": "Charlie",
                "description": "monthly update",
                "created_at": datetime.now(),
            }
        }