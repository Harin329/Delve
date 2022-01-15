import logging

def get_user(cursor, userID):
    sql = 'getUser'
    try:
        cursor.callproc(sql, (userID, ))
        return cursor.fetchall()
    except Exception as e:
        print("MYSQL ERROR:", sql)
        logging.error(e)
