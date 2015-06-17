from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os
from bson import json_util
from bson.json_util import dumps

STATIC_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder = STATIC_DIR)

MONGODB_HOST    = 'localhost'
MONGODB_PORT    = 27017
DBS_NAME        = 'maladie'
COLLECTION_NAME = 'projects'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/maladie/projects")
def maladie_projects():
    connection    = MongoClient(MONGODB_HOST, MONGODB_PORT)
    db            = connection[DBS_NAME];
    collection    = db[COLLECTION_NAME]
    people        = collection.find()
    json_projects = []
    for person in people:
        json_projects.append(person)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)