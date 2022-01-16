from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
import logging
from app.indexer.tools import connect_mongo_db
from app.indexer.user import get_user, insert_user, update_user
from app.models.user_model import UserModel

default_user = {
    "user_id": "testID",
    "is_researcher": False,
    "username": "Test",
    "email": "test@test.com",
}

router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=UserModel)
async def read_user(user_id: str = ""):
    try:
        db = connect_mongo_db()
        res = get_user(db, user_id)
        return res
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.post("/", response_model=UserModel)
async def post_user(user: dict = default_user):
    try:
        db = connect_mongo_db()
        res = insert_user(db, jsonable_encoder(user))
        return res
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400

@router.put("/", response_model=UserModel)
async def put_user(user_id: str):
    try:
        db = connect_mongo_db()
        res = update_user(db, user_id)
        return default_user
    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400