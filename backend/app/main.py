from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.route import user
from bson import ObjectId
from app.indexer.tools import connect_mongo_db

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user.router)

db = connect_mongo_db()

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


@app.get("/")
async def hello_world():
    return {
        "message": "Hello, World!",
        "status code": 200
    }
