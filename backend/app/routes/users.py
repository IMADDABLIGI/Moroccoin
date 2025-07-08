from flask import Blueprint, request, jsonify, current_app
from app.models.user import User
from app.models.transaction import Transaction
from bson import ObjectId
import json
from datetime import datetime

users_bp = Blueprint('users', __name__)

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

@users_bp.route('', methods=['GET'])
def get_users():
    try:
        user_model = User(current_app.db)
        transaction_model = Transaction(current_app.db)
        
        filters = {
            'search': request.args.get('search'),
            'status': request.args.get('status')
        }
        
        users = user_model.get_all_users(filters)
        
        # Add transaction stats for each user
        for user in users:
            user_transactions = transaction_model.get_user_transactions(str(user['_id']))
            user['totalTransactions'] = len(user_transactions)
            user['totalAmount'] = sum(t.get('amount', 0) for t in user_transactions)
            user['successfulTransactions'] = len([t for t in user_transactions if t.get('status') == 'completed'])
            user['failedTransactions'] = len([t for t in user_transactions if t.get('status') == 'failed'])
        
        return json.dumps(users, cls=JSONEncoder), 200, {'Content-Type': 'application/json'}
    
    except Exception as e:
        return jsonify({'message': 'Failed to fetch users', 'error': str(e)}), 500

@users_bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user_model = User(current_app.db)
        transaction_model = Transaction(current_app.db)
        
        user = user_model.get_user_by_id(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Add transaction stats
        user_transactions = transaction_model.get_user_transactions(user_id)
        user['totalTransactions'] = len(user_transactions)
        user['totalAmount'] = sum(t.get('amount', 0) for t in user_transactions)
        user['successfulTransactions'] = len([t for t in user_transactions if t.get('status') == 'completed'])
        user['failedTransactions'] = len([t for t in user_transactions if t.get('status') == 'failed'])
        
        return json.dumps(user, cls=JSONEncoder), 200, {'Content-Type': 'application/json'}
    
    except Exception as e:
        return jsonify({'message': 'Failed to fetch user', 'error': str(e)}), 500

@users_bp.route('/<user_id>', methods=['PATCH'])
def update_user(user_id):
    try:
        user_model = User(current_app.db)
        data = request.get_json()
        
        result = user_model.update_user(user_id, data)
        if result.matched_count == 0:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({'message': 'User updated successfully'})
    
    except Exception as e:
        return jsonify({'message': 'Failed to update user', 'error': str(e)}), 500
