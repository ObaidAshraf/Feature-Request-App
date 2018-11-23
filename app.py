import json
from flask import Flask, request, url_for, render_template, jsonify
import db_controls as dbc

app = Flask(__name__)


@app.route("/", methods = ['GET', 'POST'])
def index():
    return render_template("feature_request.html")


@app.route("/newFeature", methods = ['POST'])
def addNewFeature():
    print("Hello!!")
    print(json.dumps(request))
    #dbc.insert_feature(json.dumps(request.json))
    return "ABC"

@app.route("/getFeatures", methods = ['GET'])
def getAllFeatures():
    data = dbc.get_all_features()
    #print(data)
    return str(json.dumps(data))


app.run(debug = True, port = 8080)