from flask import Flask, request, jsonify
from flask_cors import CORS
from config import contacts_collection

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Contact API is running successfully"

@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")
        
        if not name or not email or not message:
            return jsonify({"success": False, "message": "All fields are required."}), 400
        
        contact_data = {
            "name": name,
            "email": email,
            "message": message
        }
        
        contacts_collection.insert_one(contact_data)
        
        return jsonify({
            "success": True,
            "message": "Message sent successfully"
        }), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)