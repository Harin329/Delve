from fastapi import APIRouter
import logging
from app.indexer.tools import connect_mongo_db
from app.indexer.user import get_user

default_user = {
    "user_id": "testID",
    "username": "Test",
    "email": "test@test.com",
}

router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_user(user_id: str = ""):
    try:
        db = connect_mongo_db()
        res = get_user(db, user_id)
        return res, 200

    except Exception as e:
        logging.error(e)
        return "Error with {}".format(e), 400
