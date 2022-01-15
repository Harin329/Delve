# Backend

Our backend makes use of FastAPI and MongoDB. As such, make sure you have at least
Python 3.6 installed first before trying these steps
## Setup

Add your IP address and get the connection URL, i.e. `MONGODB_URL` by following parts 3 and 5
of this [MongoDB guide](https://docs.atlas.mongodb.com/getting-started/):

```bash
# Create and activate venv
python -m venv venv
# Windows
source ./venv/Scripts/activate
# Mac
source ./venv/bin/activate
# Install the requirements:
pip install -r requirements.txt

# Configure the location of your MongoDB database:
export MONGODB_URL="mongodb+srv://<username>:<password>@<url>/<db>?retryWrites=true&w=majority"

# Start the service:
uvicorn app.main:app --reload
```

(Check out [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) if you need a MongoDB database.)

Now you can load http://localhost:8000 in your browser, you should see
a "Hello World" response. You can also visit http://localhost:8000/docs to see
the endpoints