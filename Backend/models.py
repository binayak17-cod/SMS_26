from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(50), primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<User {self.id}>"

    def check_password(self, password):
        """Check if the provided password matches (plain text comparison)."""
        return self.password == password
