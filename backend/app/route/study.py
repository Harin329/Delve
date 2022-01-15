from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
import logging
from app.indexer.tools import connect_mongo_db
from app.indexer.study import insert_study
from app.models.study_model import StudyModel

default_study = {
    "title": "An Investigation into the Effects of Y in Treating Z",
    "researchers": ["Alice", "Bob"],
    "contact": "researcher@test.com",
    "description": "We are seeking X participants for a trial of Y to determine its effects on Z",
    "requirements": "Must be between 18-55 years old",
    "categories": ["medicine"],
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