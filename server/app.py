from database import db 
from flask import Flask, jsonify
from flask_cors import CORS

connection = db.cursor(dictionary=True)
app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def senWelcomeMessage():
    return "Hello"

@app.route("/get-note", methods=["GET"])
def get_note():
    connection.execute("SELECT * FROM note")
    notes = connection.fetchall()
    return jsonify(notes)

print("SUCCESS")
app.run()