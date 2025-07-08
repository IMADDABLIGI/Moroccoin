from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key')
    
    # Enable CORS
    CORS(app)
    
    # MongoDB connection
    client = MongoClient(os.getenv('MONGODB_URI'))
    app.db = client[os.getenv('DATABASE_NAME', 'moroccoin_db')]
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.users import users_bp
    from app.routes.transactions import transactions_bp
    from app.routes.dashboard import dashboard_bp
    from app.routes.communication import communication_bp
    from app.routes.chat import chat_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(transactions_bp, url_prefix='/api/transactions')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    app.register_blueprint(communication_bp, url_prefix='/api/communication')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    
    return app
