import logging

def insert_study(db, study):
    try:
        study_id = db["studies"].insert_one(study).inserted_id
        inserted_study = db["studies"].find_one({"_id": study_id})
        return inserted_study
    except Exception as e:
        print("MongoDB Error: ", "insert_study")
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