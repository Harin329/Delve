import logging

def insert_study(db, study):
    try:
        study_id = db["studies"].insert_one(study).inserted_id
        inserted_study = db["studies"].find_one({"_id": study_id})
        return inserted_study
    except Exception as e:
        print("MongoDB Error: ", "insert_study")
        logging.error(e)

def fetch_studies_for_user(db, user_id, is_researcher):
    try:
        studies = []
        if is_researcher:
            studies_cursor = db["studies"].find({"researchers": user_id})
        else:
            studies_cursor = db["studies"].find({"participants": user_id})
        
        for study in studies_cursor:
            studies.append(study)

        return studies
    except Exception as e:
        print("MongoDB Error: ", "fetch_studies_for_user")
        logging.error(e)

def add_user_to_study(db, study_id, participant_id):
    try:
        study = db["studies"].find_one({"study_id": study_id})
        if len(study["participants"]) == study["max_participants"]:
            return None
        db["studies"].update(
            {
                "study_id": study_id
            }, {
                "$push": {
                    "participants": participant_id
                }
            }
        )
        updated_study = db["studies"].find_one({"study_id": study_id})
        return updated_study
    except Exception as e:
        print("MongoDB Error: ", "add_user_to_study")
        logging.error(e)

def insert_update(db, study_id, update):
    update["study_id"] = study_id
    try:
        update_id = db["updates"].insert_one(update).inserted_id
        inserted_update = db["updates"].find_one({"_id": update_id})
        return inserted_update
    except Exception as e:
        print("MongoDB Error: ", "insert_update")
        logging.error(e)

def fetch_open_studies(db, category_ids=None):
    try:
        open_studies = []
        open_studies_cursor = db["studies"].find(
            {
                "status": "open",
            },
            limit=20
        )
        
        for open_study in open_studies_cursor:
            if category_ids:
                let_through = False
                for category_id in open_study["categories"]:
                    if category_id in category_ids:
                        let_through = True
                
                if let_through:
                    open_studies.append(open_study)
            else:
                open_studies.append(open_study)

        return open_studies
    except Exception as e:
        print("MongoDB Error: ", "fetch_open_studies")
        logging.error(e)