from flask import Flask, request, url_for, render_template, jsonify

app = Flask(__name__)


@app.route("/", methods = ['GET', 'POST'])
def index():
    return "Hello!"


app.run(debug = True, port = 8080)