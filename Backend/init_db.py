import os
from sqlalchemy import create_engine, text
from config import Config

# Extract database URL components
db_url = Config.SQLALCHEMY_DATABASE_URI
# Format: mysql+pymysql://user:password@host:port/dbname
# We need to connect without the database first to create it

# Parse the connection string
if "mysql+pymysql://" in db_url:
    parts = db_url.replace("mysql+pymysql://", "").split("/")
    db_name = parts[-1]
    base_url = db_url.rsplit("/", 1)[0]  # URL without the database name
    
    print(f"Creating database: {db_name}")
    
    try:
        # Connect to MySQL server without specifying a database
        engine = create_engine(base_url + "/mysql")
        with engine.connect() as conn:
            # Create database if it doesn't exist
            conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {db_name}"))
            conn.commit()
            print(f"✅ Database '{db_name}' created or already exists")
    except Exception as e:
        print(f"❌ Error creating database: {e}")
        print("Make sure MySQL server is running and you have correct credentials in config.py")
        exit(1)
else:
    print("❌ Invalid DATABASE_URL format in config.py")
    exit(1)

print("\n✅ Database initialization complete! Now run: python app.py")
