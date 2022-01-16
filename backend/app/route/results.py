from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
import logging
from datetime import datetime
from typing import List, Optional
from app.indexer.tools import connect_mongo_db
from app.indexer.results import insert_results, update_results
from app.models.results_model import ResultsModel

default_results = {
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

router = APIRouter(
    prefix="/results",
    tags=["results"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=ResultsModel)
async def post_results(results: dict = default_results):
    try:
        db = connect_mongo_db()
        res = insert_results(db, jsonable_encoder(results))
        return res
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.put("/{study_id}", response_model=ResultsModel)
async def put_results(study_id: str, new_results: dict = default_results):
    try:
        db = connect_mongo_db()
        res = update_results(db, study_id, jsonable_encoder(new_results))
        return res
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400