from database import db 
from flask import Flask, jsonify, request
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

@app.route("/post-note", methods=["POST"])
def post_note():
    query = "INSERT INTO note(id, description, title) VALUES(%s, %s, %s)"
    data = request.get_json()
    
    id = data.get("id")
    desc = data.get("description")
    title = data.get("title")
    
    connection.execute(query, (id, desc, title))
    db.commit()
    return "success"

@app.route("/update-note/<int:id>", methods=["PUT"])
def update_note(id):
    query = "UPDATE note SET description = %s, title = %s WHERE id = %s"
    data = request.get_json()
    
    desc = data.get("description")
    title = data.get("title")
    
    connection.execute(query, (desc, title, id))
    db.commit()
    return "update success"

@app.route("/del-note/<int:id>", methods=["DELETE"])
def del_note(id):
    query = "DELETE FROM note WHERE id = %s"
    connection.execute(query, (id,))
    db.commit()
    return "Deleted Success!"

# post_note(1, "sdfsdfsd", "asdasdaedsadasdssd")
    
print("SUCCESS")
# del_note(1)
app.run()