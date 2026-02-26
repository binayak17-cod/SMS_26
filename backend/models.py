from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<User {self.id} - {self.role}>"


class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.String(50), db.ForeignKey('users.id'), primary_key=True)
    department = db.Column(db.String(60), nullable=False)
    sec = db.Column(db.String(10), nullable=True)

    def __repr__(self):
        return f"<Student {self.id}>"


class Teacher(db.Model):
    __tablename__ = "teachers"

    id = db.Column(db.String(50), db.ForeignKey('users.id'), primary_key=True)
    department = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"<Teacher {self.id}>"
    
class Attendance(db.Model):
    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.String(50), db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    class_name = db.Column(db.String(10), nullable=False)
    session_type = db.Column(db.String(10), nullable=False, default='Theory')
    status = db.Column(db.String(20), default='Absent')  
    remarks = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    __table_args__ = (
        db.UniqueConstraint('student_id', 'date', 'class_name', 'session_type', name='unique_attendance'),
    )

    def __repr__(self):
        return f"<Attendance {self.student_id} - {self.date} - {self.status}>"