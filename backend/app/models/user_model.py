from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from app.models.py_object_id import PyObjectId

class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str = Field(...)
    is_researcher: bool = Field(...)
    email: EmailStr = Field(...)
    username: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "user_id": "abcdefg",
                "is_researcher": False,
                "username": "Jane Doe",
                "email": "jdoe@example.com",
            }
        }