from flask import Blueprint, request, jsonify, current_app
from app.models.user import User
from app.utils.auth import generate_token, verify_password, hash_password
import bcrypt

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'message': 'Email and password required'}), 400
        
        user_model = User(current_app.db)
        user = user_model.get_user_by_email(email)
        
        if not user:
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # For demo purposes, allow admin@moroccoin.com with password admin123
        if email == 'admin@moroccoin.com' and password == 'admin123':
            token = generate_token(str(user['_id']))
            return jsonify({
                'token': token,
                'user': {
                    'id': str(user['_id']),
                    'name': user['name'],
                    'email': user['email'],
                    'role': user.get('role', 'admin')
                }
            })
        
        if not verify_password(password, user.get('password', '')):
            return jsonify({'message': 'Invalid credentials'}), 401
        
        token = generate_token(str(user['_id']))
        user_model.update_last_activity(str(user['_id']))
        
        return jsonify({
            'token': token,
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'role': user.get('role', 'user')
            }
        })
    
    except Exception as e:
        return jsonify({'message': 'Login failed', 'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    try:
        # For demo purposes, return admin user
        return jsonify({
            'id': 'admin',
            'name': 'Admin User',
            'email': 'admin@moroccoin.com',
            'role': 'admin'
        })
    except Exception as e:
        return jsonify({'message': 'Failed to get profile', 'error': str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logged out successfully'})
