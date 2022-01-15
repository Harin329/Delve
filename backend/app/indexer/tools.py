import os
from pymongo import MongoClient

def connect_mongo_db():
    client = MongoClient(os.environ["MONGODB_URL"])
    return client['dev']
