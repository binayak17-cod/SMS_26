import os
import random
import string
from flask import Flask, session, request, jsonify
from flask_cors import CORS
from flask_wtf.csrf import generate_csrf
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from models import db, User
from config import Config
from models import db, User

app = Flask(__name__)
app.config.from_object(Config)


users = [
    {
        "id": "1260",
        "password": generate_password_hash("admin123"),
        "role": "admin"
    },
    {
        "id": "23CSE346",
        "password": generate_password_hash("student123"),
        "role": "student"
    },
    {
        "id": "345",
        "password": generate_password_hash("faculty123"),
        "role": "faculty"
    }
] 

# Initialize database
db.init_app(app)

CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

# Create database tables
with app.app_context():
    db.create_all()


def generate_captcha(length=4):
    chars = string.ascii_uppercase + string.digits
    return "".join(random.choice(chars) for _ in range(length))


@app.route("/api/captcha", methods=["GET"])
def get_captcha():
    """Generate and return a new captcha."""
    captcha = generate_captcha()
    session["captcha"] = captcha
    return jsonify({"captcha": captcha})


@app.route("/api/verify-captcha", methods=["POST"])
def verify_captcha():
    """Verify the captcha entered by the user."""
    data = request.get_json()
    user_captcha = data.get("captcha", "").strip().upper()
    expected = session.get("captcha", "").upper()

    if user_captcha != expected:
        return jsonify({"success": False, "message": "Captcha does not match"}), 400

    temp_token = generate_csrf()
    session["pending_login"] = {"token": temp_token}
    return jsonify(
        {"success": True, "message": "Captcha verified", "temp_token": temp_token}
    )




@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    id = data.get('id')
    password = data.get('password')
    
    
    user = next((u for u in users if u["id"] == id), None)
    
    if not user:
        return jsonify({"success": False, "message": "ID not found"}), 401
    
    if not check_password_hash(user["password"], password):
        return jsonify({"success": False, "message": "Wrong password"}), 401
    
    session.pop("captcha", None)
    session.pop("pending_login", None)
    session["user_id"] = id
    
    return jsonify({
        "success": True,
        "message": "Login successful",
        "id": id,
        "role": user["role"],
        "dashboard": '/admin-dashboard' if user["role"] == 'admin' else '/student-dashboard' if user["role"] == 'student' else '/admin-dashboard'
    }), 200
    
@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True})


if __name__ == "__main__":
    app.run(debug=True)  