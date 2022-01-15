def insert_study(db, study):
    try:
        study_id = db["studies"].insert_one(study).inserted_id
        inserted_study = db["studies"].find_one({"_id": study_id})
        return inserted_study
    except Exception as e:
        print("MongoDB Error: ", "insert_study")
        logging.error(e)