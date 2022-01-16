import logging
from bson.objectid import ObjectId
from pymongo import ReturnDocument

def get_user(db, user_id):
    try:
        user = db["users"].find_one({"user_id": user_id})
        return user
    except Exception as e:
        print("MongoDB Error: ", "get_user")
        logging.error(e)

def insert_user(db, user):
    try:
        user_id = db["users"].insert_one(user).inserted_id
        inserted_user = db["users"].find_one({"_id": user_id})
        return inserted_user
    except Exception as e:
        print("MongoDB Error: ", "insert_user")
        logging.error(e)

def update_user(db, user_id):
    try:
        return db["users"].update_one(
            {
                "user_id": user_id,
            },
            { "$set": { "is_researcher": True } }
        )
    except Exception as e:
        print("MongoDB Error: ", "update_user")
        logging.error(e)