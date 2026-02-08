import os
import random
import string
from flask import Flask, session, request, jsonify
from flask_cors import CORS
from flask_wtf.csrf import generate_csrf
from flask_mail import Mail, Message
from config import Config
from models import db, User
from forms import LoginForm

app = Flask(__name__)
app.config.from_object(Config)
app.config['DEBUG'] = False

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'sipunofficial382@gmail.com'
app.config['MAIL_PASSWORD'] = 'tmee iuny zgsk ikgz'
app.config['MAIL_DEFAULT_SENDER'] = 'sipunofficial382@gmail.com'

# Initialize database and mail
db.init_app(app)
mail = Mail(app)

CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"], allow_headers=["Content-Type", "X-CSRFToken"], methods=["GET", "POST", "OPTIONS"])

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




@app.route('/api/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json() or {}
        user_id = data.get('id')
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')
        department = data.get('dept') or data.get('department') or 'N/A'

        if not all([user_id, name, email, password, role]):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        if User.query.filter_by(id=user_id).first():
            return jsonify({"success": False, "message": "User ID already exists"}), 409

        user = User(id=user_id, name=name, email=email, password=password, role=role, department=department)
        db.session.add(user)
        db.session.commit()
        
        # Send email
        try:
            msg = Message('Your Account Has Been Created', recipients=[email])
            msg.body = f'''Hello {name},

Your account has been successfully created!

Your Login Credentials:
ID: {user_id}
Password: {password}
Role: {role}
Department: {department}

Please keep this information secure.

Best regards,
EDUNEXUS Team'''
            mail.send(msg)
        except Exception as mail_error:
            print(f"Email error: {str(mail_error)}")
        
        return jsonify({"success": True, "message": "User created", "user": {"id": user.id, "name": user.name, "email": user.email, "role": user.role, "department": user.department}}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error creating user: {str(e)}")
        return jsonify({"success": False, "message": f"Error: {str(e)}"}), 500


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    id = data.get('id')
    password = data.get('password')
    captcha = data.get('captcha')
    csrf_token = request.headers.get('X-CSRFToken', data.get('csrf_token'))
    
    # Validate CSRF token
    if not csrf_token:
        return jsonify({"success": False, "message": "CSRF token missing"}), 400
    
    # Verify captcha
    expected_captcha = session.get("captcha", "").upper()
    if captcha.upper() != expected_captcha:
        return jsonify({"success": False, "message": "Captcha does not match"}), 400
    
    # Query user from database
    user = User.query.filter_by(id=id).first()
    
    if not user:
        return jsonify({"success": False, "message": "ID not found"}), 401
    
    if user.password != password:
        return jsonify({"success": False, "message": "Wrong password"}), 401
    
    session.pop("captcha", None)
    session.pop("pending_login", None)
    session["user_id"] = id
    
    return jsonify({
        "success": True,
        "message": "Login successful",
        "id": id,
        "role": user.role,
        "dashboard": '/admin' if user.role == 'admin' else '/student' if user.role == 'student' else '/teacher' 
    }), 200
    
    
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        role = request.args.get('role')
        if role:
            users = User.query.filter_by(role=role).all()
        else:
            users = User.query.all()
        
        return jsonify({
            "success": True,
            "users": [
                {"id": user.id, "name": user.name, "email": user.email, "role": user.role, "department": user.department}
                for user in users
            ]
        }), 200
    except Exception as e:
        print(f"Error fetching users: {str(e)}")
        return jsonify({"success": False, "message": str(e)}), 500
        
    
    
@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True})


if __name__ == "__main__":
    app.run(debug=True)