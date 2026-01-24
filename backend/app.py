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

    # Generate a temporary token for the next step
    temp_token = generate_csrf()
    session["pending_login"] = {"token": temp_token}
    return jsonify(
        {"success": True, "message": "Captcha verified", "temp_token": temp_token}
    )


@app.route("/api/login", methods=["POST"])
def login():
    """Verify id and password."""
    data = request.get_json()
    user_id = data.get("id", "").strip()
    password = data.get("password", "")

    # Check if user exists
    user = User.query.filter_by(id=user_id).first()
    
    if not user:
        # ID doesn't exist
        return jsonify({"success": False, "message": "ID not found"}), 401
    
    # ID exists, now check password
    if not user.check_password(password):
        # Password is wrong
        return jsonify({"success": False, "message": "Wrong password"}), 401
    
    # Both ID and password are correct
    session.pop("captcha", None)
    session.pop("pending_login", None)
    session["user_id"] = user_id
    return jsonify(
        {"success": True, "message": "Login successful", "id": user_id}
    )


@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    """Get user dashboard data (requires login)."""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"success": False, "message": "Not logged in"}), 401

    return jsonify(
        {
            "success": True,
            "message": f"Welcome {user_id}",
            "id": user_id,
        }
    )


@app.route("/api/logout", methods=["POST"])
def logout():
    """Logout user."""
    session.pop("user_id", None)
    session.pop("captcha", None)
    session.pop("pending_login", None)
    return jsonify({"success": True, "message": "Logged out"})


if __name__ == "__main__":
    app.run(debug=True)
