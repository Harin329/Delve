from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.route import user, study
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
app.include_router(study.router)

db = connect_mongo_db()

@app.get("/")
async def hello_world():
    return {
        "message": "Hello, World!",
        "status code": 200
    }
