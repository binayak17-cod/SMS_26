from app import app, db
from models import User

def init_database():
    """Initialize database with admin user"""
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Check if admin user already exists
        admin_user = User.query.filter_by(id='admin').first()
        
        if not admin_user:
            # Create admin user
            admin = User(
                id='admin',
                name='Administrator',
                email='admin@example.com',
                password='admin123',
                role='admin',
                department='ADMIN'
            )
            db.session.add(admin)
            db.session.commit()
            print("Admin user created successfully!")
        else:
            print("Admin user already exists")

if __name__ == '__main__':
    init_database()