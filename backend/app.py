import os
import random
import string
from flask import Flask, session, request, jsonify
from flask_cors import CORS
from flask_wtf.csrf import generate_csrf
from flask_mail import Mail, Message
from config import Config
from models import db, User, Student, Teacher, Attendance
from forms import LoginForm
from datetime import datetime

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
        department = data.get('department')
        sec = data.get('sec')

        if not all([user_id, name, email, password, role]):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        if User.query.filter_by(id=user_id).first():
            return jsonify({"success": False, "message": "User ID already exists"}), 409

        # Create and commit the user first
        new_user = User(id=user_id, name=name, email=email, password=password, role=role)
        db.session.add(new_user)
        db.session.flush()  # Flush to make the user available for foreign key reference
        
        if role == "student":
            if not department or not sec:
                db.session.rollback()
                return jsonify({"success": False, "message": "Department and Section required for students"}), 400

            student = Student(
                id=user_id,
                department=department,
                sec=sec
            )
            db.session.add(student)

        elif role == "teacher":
            if not department:
                db.session.rollback()
                return jsonify({"success": False, "message": "Department required for teachers"}), 400

            teacher = Teacher(
                id=user_id,
                department=department
            )
            db.session.add(teacher)

        elif role != "admin":
            db.session.rollback()
            return jsonify({"success": False, "message": "Invalid role"}), 400
        
        # Commit everything together
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
Department: {department if department else 'N/A'}
{f"Section: {sec}" if sec else ""}

Please keep this information secure.

Best regards,
EDUNEXUS Team'''
            mail.send(msg)
        except Exception as mail_error:
            print(f"Email error: {str(mail_error)}")
        
        return jsonify({
            "success": True, 
            "message": "User created successfully", 
            "user": {
                "id": user_id, 
                "name": name, 
                "email": email, 
                "role": role, 
                "department": department,
                "sec": sec
            }
        }), 201
        
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
        users_list = []
        
        if role == 'student':
            students = db.session.query(User, Student).join(Student, User.id == Student.id).filter(User.role == 'student').all()
            users_list = [{"id": u.id, "name": u.name, "email": u.email, "role": u.role, "department": s.department, "sec": s.sec} for u, s in students]
        elif role == 'teacher':
            teachers = db.session.query(User, Teacher).join(Teacher, User.id == Teacher.id).filter(User.role == 'teacher').all()
            users_list = [{"id": u.id, "name": u.name, "email": u.email, "role": u.role, "department": t.department} for u, t in teachers]
        else:
            users = User.query.all()
            users_list = [{"id": u.id, "name": u.name, "email": u.email, "role": u.role} for u in users]
        
        return jsonify({"success": True, "users": users_list}), 200
    except Exception as e:
        print(f"Error fetching users: {str(e)}")
        return jsonify({"success": False, "message": str(e)}), 500
        

# GET attendance records
@app.route('/api/attendance', methods=['GET'])
def get_attendance():
    try:
        class_name = request.args.get('class')
        date_str = request.args.get('date')
        session_type = request.args.get('session_type')
        
        if not class_name or not date_str or not session_type:
            return jsonify({'error': 'Class, date and session_type are required'}), 400
        
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        
        students_query = db.session.query(
            User.id,
            User.name,
            Student.department,
            Student.sec
        ).join(
            Student, User.id == Student.id
        ).filter(
            User.role == 'student'
        ).all()
        
        filtered_students = []
        for user_id, name, department, sec in students_query:
            constructed_class = f"{department}{sec}" if sec else department
            if constructed_class == class_name:
                filtered_students.append((user_id, name, department, sec))
        
        attendance_list = []
        for user_id, name, department, sec in filtered_students:
            attendance_record = Attendance.query.filter_by(
                student_id=user_id,
                date=date_obj,
                class_name=class_name,
                session_type=session_type
            ).first()
            
            if attendance_record:
                attendance_list.append({
                    'id': user_id,
                    'roll': user_id,
                    'name': name,
                    'status': attendance_record.status,
                    'remarks': attendance_record.remarks or ''
                })
            else:
                attendance_list.append({
                    'id': user_id,
                    'roll': user_id,
                    'name': name,
                    'status': 'Absent',
                    'remarks': ''
                })
        
        return jsonify({
            'success': True,
            'attendance': attendance_list
        }), 200
        
    except Exception as e:
        print(f'Error fetching attendance: {e}')
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Server error', 'message': str(e)}), 500


@app.route('/api/attendance', methods=['POST'])
def save_attendance():
    try:
        data = request.get_json()
        
        student_id = data.get('studentId')
        date_str = data.get('date')
        class_name = data.get('class')
        session_type = data.get('session_type')
        status = data.get('status')
        remarks = data.get('remarks', '')
        
        if not all([student_id, date_str, class_name, session_type, status]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        
        attendance_record = Attendance.query.filter_by(
            student_id=student_id,
            date=date_obj,
            class_name=class_name,
            session_type=session_type
        ).first()
        
        if attendance_record:
            attendance_record.status = status
            attendance_record.remarks = remarks
            message = 'Attendance updated successfully'
        else:
            new_attendance = Attendance(
                student_id=student_id,
                date=date_obj,
                class_name=class_name,
                session_type=session_type,
                status=status,
                remarks=remarks
            )
            db.session.add(new_attendance)
            message = 'Attendance recorded successfully'
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': message
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f'Error saving attendance: {e}')
        return jsonify({'error': 'Server error', 'message': str(e)}), 500


@app.route('/api/student/attendance', methods=['GET'])
def get_student_attendance():
    try:
        student_id = request.args.get('studentId')
        
        if not student_id:
            return jsonify({'error': 'Student ID is required'}), 400
        
        # Get student details
        student = db.session.query(User, Student).join(
            Student, User.id == Student.id
        ).filter(User.id == student_id).first()
        
        if not student:
            return jsonify({'error': 'Student not found'}), 404
        
        user, student_info = student
        class_name = f"{student_info.department}{student_info.sec}"
        
        # Get all attendance records for this student
        attendance_records = Attendance.query.filter_by(
            student_id=student_id
        ).order_by(Attendance.date.desc()).all()
        
        attendance_list = []
        for record in attendance_records:
            attendance_list.append({
                'date': record.date.strftime('%Y-%m-%d'),
                'class': record.class_name,
                'session_type': record.session_type,
                'status': record.status,
                'remarks': record.remarks or ''
            })
        
        total_days = len(attendance_records)
        present_days = len([r for r in attendance_records if r.status == 'Present'])
        absent_days = len([r for r in attendance_records if r.status == 'Absent'])
        late_days = len([r for r in attendance_records if r.status == 'Late'])
        
       
        theory_records = [r for r in attendance_records if r.session_type == 'Theory']
        theory_total = len(theory_records)
        theory_present = len([r for r in theory_records if r.status == 'Present'])
        theory_absent = len([r for r in theory_records if r.status == 'Absent'])
        theory_late = len([r for r in theory_records if r.status == 'Late'])
        
      
        lab_records = [r for r in attendance_records if r.session_type == 'Lab']
        lab_total = len(lab_records)
        lab_present = len([r for r in lab_records if r.status == 'Present'])
        lab_absent = len([r for r in lab_records if r.status == 'Absent'])
        lab_late = len([r for r in lab_records if r.status == 'Late'])
        
        attendance_percentage = (present_days / total_days * 100) if total_days > 0 else 0
        theory_percentage = (theory_present / theory_total * 100) if theory_total > 0 else 0
        lab_percentage = (lab_present / lab_total * 100) if lab_total > 0 else 0
        
        return jsonify({
            'success': True,
            'student': {
                'id': user.id,
                'name': user.name,
                'class': class_name
            },
            'attendance': attendance_list,
            'statistics': {
                'overall': {
                    'total': total_days,
                    'present': present_days,
                    'absent': absent_days,
                    'late': late_days,
                    'percentage': round(attendance_percentage, 2)
                },
                'theory': {
                    'total': theory_total,
                    'present': theory_present,
                    'absent': theory_absent,
                    'late': theory_late,
                    'percentage': round(theory_percentage, 2)
                },
                'lab': {
                    'total': lab_total,
                    'present': lab_present,
                    'absent': lab_absent,
                    'late': lab_late,
                    'percentage': round(lab_percentage, 2)
                }
            }
        }), 200
        
    except Exception as e:
        print(f'Error fetching student attendance: {e}')
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Server error', 'message': str(e)}), 500   
    
@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    try:
        total_students = User.query.filter_by(role='student').count()
        total_teachers = User.query.filter_by(role='teacher').count()
        
        return jsonify({
            "success": True,
            "totalStudents": str(total_students),
            "totalTeachers": str(total_teachers),
            "overallAttendance": "85%",
            "activeClasses": "42"
        }), 200
    except Exception as e:
        print(f"Error fetching stats: {str(e)}")
        return jsonify({"success": False, "message": str(e)}), 500


@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True})


if __name__ == "__main__":
    app.run(debug=True)