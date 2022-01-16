from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List
from app.models.py_object_id import PyObjectId

class ResultsModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    study_id : str = Field(...)
    title: str = Field(...)
    researchers: List[str] = Field(...)
    abstract: str = Field(...)
    intro: str = Field(...)
    results: str = Field(...)
    methods: str = Field(...)
    discussion: str = Field(...)
    conclusion: str = Field(...)
    link: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "study_id": "abcdefg",
                "title": "An Investigation into the Effects of Y in Treating Z",
                "researchers": ["Alice", "Bob"],
                "abstract": "",
                "intro": "",
                "results": "",
                "methods": "",
                "discussion": "",
                "conclusion": "",
                "link": "",
            }
        }