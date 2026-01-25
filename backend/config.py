import os

class Config:
    # SQLite Database Configuration (no MySQL server needed)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "sqlite:///sms_db.sqlite"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "084c798ae26ad8bb088a191feb8224f772"
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = False
