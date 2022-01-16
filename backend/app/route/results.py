from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
import logging
from datetime import datetime
from typing import List, Optional
import os
import openai
from app.indexer.tools import connect_mongo_db
from app.indexer.results import insert_results, update_results, fetch_results_by_study_id
from app.models.results_model import ResultsModel

openai.api_key = os.environ["OPENAI_API_KEY"]

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

@router.get("/{study_id}", response_model=ResultsModel)
async def put_results(study_id: str):
    try:
        db = connect_mongo_db()
        res = fetch_results_by_study_id(db, study_id)
        return res
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.get("/{study_id}/simplified", response_model=ResultsModel)
async def get_simplified_results(study_id: str):
    try:
        db = connect_mongo_db()
        res = fetch_results_by_study_id(db, study_id)
        res["abstract"] = get_simplified_section(res, "abstract")
        res["intro"] = get_simplified_section(res, "intro")
        res["results"] = get_simplified_section(res, "results")
        res["methods"] = get_simplified_section(res, "methods")
        res["discussion"] = get_simplified_section(res, "discussion")
        res["conclusion"] = get_simplified_section(res, "conclusion")
        print("HERE", res)
        return res
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

def get_simplified_section(results, section: str):
    response = openai.Completion.create(
        engine="davinci",
        prompt= results[section] + "\n\ntl;dr:",
        temperature=0.3,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    print(response)
    return response["choices"][0]["text"]