from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
import logging
from datetime import datetime
from typing import List, Optional
from app.indexer.tools import connect_mongo_db
from app.indexer.study import insert_study, insert_update, add_user_to_study, fetch_open_studies
from app.models.study_model import StudyModel
from app.models.update_model import UpdateModel

default_study = {
    "study_id": "abcdefg",
    "title": "An Investigation into the Effects of Y in Treating Z",
    "researchers": ["Alice", "Bob"],
    "participants": ["Charlie"],
    "max_participants": 50,
    "contact": "researcher@test.com",
    "description": "We are seeking X participants for a trial of Y to determine its effects on Z",
    "requirements": "Must be between 18-55 years old",
    "categories": ["clinical"],
    "status": "open",
}

default_update = {
    "creator": "Charlie",
    "description": "monthly update",
    "created_at": datetime.now()
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

@router.post("/{study_id}/join", response_model=StudyModel)
async def post_join_study(study_id: str, participant_id: str):
    try:
        db = connect_mongo_db()
        res = add_user_to_study(db, study_id, participant_id)
        if res:
            return res
        raise Exception("Could not add user as a participant to the study")
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.post("/{study_id}/update", response_model=UpdateModel)
async def post_update_to_study(study_id: str, update: dict = default_update):
    try:
        db = connect_mongo_db()
        res = insert_update(db, study_id, jsonable_encoder(update))
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