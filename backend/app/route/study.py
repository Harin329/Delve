from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
import logging
from typing import List, Optional
from app.indexer.tools import connect_mongo_db
from app.indexer.study import insert_study, fetch_open_studies
from app.models.study_model import StudyModel

default_study = {
    "title": "An Investigation into the Effects of Y in Treating Z",
    "researchers": ["Alice", "Bob"],
    "contact": "researcher@test.com",
    "description": "We are seeking X participants for a trial of Y to determine its effects on Z",
    "requirements": "Must be between 18-55 years old",
    "categories": ["clinical"],
    "status": "open",
}

router = APIRouter(
    prefix="/study",
    tags=["study"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=StudyModel)
async def post_study(study: dict = default_study):
    try:
        db = connect_mongo_db()
        res = insert_study(db, jsonable_encoder(study))
        return res
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.get("/open", response_model=List[StudyModel])
async def get_open_studies_by_category_id(category_ids: Optional[List[str]] = Query(None)):
    try:
        db = connect_mongo_db()
        if category_ids:
            res = fetch_open_studies(db, category_ids)
            return res
        else:
            res = fetch_open_studies(db)
            return res
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.get("/categories")
async def get_study_categories():
    return [
        {
            "id": "all",
            "name": "All"
        },
        {
            "id": "civic",
            "name": "Civic"
        },
        {
            "id": "psychological",
            "name": "Psychological"
        },
        {
            "id": "environmental",
            "name": "Environmental"
        },
        {
            "id": "science",
            "name": "Science"
        },
        {
            "id": "clinical",
            "name": "Clinical"
        },
    ]