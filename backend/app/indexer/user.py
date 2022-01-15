import logging
from bson.objectid import ObjectId

def get_user(db, user_id):
    try:
        user = db["users"].find_one({"_id": ObjectId(user_id)})
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
