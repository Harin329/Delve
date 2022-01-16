from pymongo import ReturnDocument
import logging

def insert_results(db, results):
    try:
        results_id = db["results"].insert_one(results).inserted_id
        inserted_results = db["results"].find_one({"_id": results_id})
        return inserted_results
    except Exception as e:
        print("MongoDB Error: ", "insert_results")
        logging.error(e)

def update_results(db, study_id, results):
    try:
        return db["results"].find_one_and_replace(
            {
                "study_id": study_id
            },
            results,
            return_document=ReturnDocument.AFTER
        )
    except Exception as e:
        print("MongoDB Error: ", "update_results")
        logging.error(e)

def fetch_results_by_study_id(db, study_id):
    try:
        results = db["results"].find_one({"study_id": study_id})
        return results
    except Exception as e:
        print("MongoDB Error: ", "fetch_results_by_study_id")
        logging.error(e)