from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os
from bson import json_util
from bson.json_util import dumps

STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
app = Flask(__name__, static_folder = STATIC_DIR)

MONGODB_HOST    = 'localhost'
MONGODB_PORT    = 27017
DBS_NAME        = 'maladie'
COLLECTION_NAME = 'projects'

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/maladie/projects/nb_malades_code")
def maladie_projects():
	connection     = MongoClient(MONGODB_HOST, MONGODB_PORT)
	db             = connection[DBS_NAME];
	collection     = db[COLLECTION_NAME]
	code_activites = collection.find().distinct("Lieu_activite")
	json_result    = []
	for code_activite in code_activites:
		json_result.append({code_activite: collection.count({"Lieu_activite": code_activite})})
	json_result = json.dumps(json_result, default = json_util.default)
	connection.close()
	return json_result

@app.route("/maladie/projects/nb_malades_age")
def maladie_projects_age():
	connection     = MongoClient(MONGODB_HOST, MONGODB_PORT)
	db             = connection[DBS_NAME];
	collection     = db[COLLECTION_NAME]
	ages           = collection.find().distinct("Age")
	json_result    = []
	for age in ages:
		json_result.append({age: collection.count({"Age": age})})
	json_result = json.dumps(json_result, default = json_util.default)
	connection.close()
	return json_result

@app.route("/maladie/projects/nb_malades_civilite")
def maladie_projects_civilite():
	connection     = MongoClient(MONGODB_HOST, MONGODB_PORT)
	db             = connection[DBS_NAME];
	collection     = db[COLLECTION_NAME]
	sexes          = collection.find().distinct("Sexe")
	json_result    = []
	for sexe in sexes:
		json_result.append({sexe: collection.count({"Sexe": sexe})})
	json_result = json.dumps(json_result, default = json_util.default)
	connection.close()
	return json_result

@app.route("/maladie/projects/nb_malades_metier")
def maladie_projects_metier():
	connection     = MongoClient(MONGODB_HOST, MONGODB_PORT)
	db             = connection[DBS_NAME];
	collection     = db[COLLECTION_NAME]
	metiers        = collection.find().distinct("Profession")
	json_result    = []
	for metier in metiers:
		json_result.append({metier: collection.count({"Profession": metier})})
	json_result = json.dumps(json_result, default = json_util.default)
	connection.close()
	return json_result

if __name__ == "__main__":
	app.run(host='0.0.0.0',port=5000,debug=True)