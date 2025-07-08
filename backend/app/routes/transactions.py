from flask import Blueprint, request, jsonify, current_app
from app.models.transaction import Transaction
from app.models.user import User
from bson import ObjectId
import json
from datetime import datetime

transactions_bp = Blueprint('transactions', __name__)

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)
    
@transactions_bp.route('', methods=['GET'])
def get_transactions():
    try:
        transaction_model = Transaction(current_app.db)
        user_model = User(current_app.db)
        
        filters = {
            'userId': request.args.get('userId'),
            'status': request.args.get('status')
        }
        
        transactions = transaction_model.get_all_transactions(filters)
        
        # Add user names to transactions
        for transaction in transactions:
            if 'senderId' in transaction:
                sender = user_model.get_user_by_id(str(transaction['senderId']))
                transaction['senderName'] = sender['name'] if sender else 'Unknown'
            
            if 'recipientId' in transaction:
                recipient = user_model.get_user_by_id(str(transaction['recipientId']))
                transaction['recipientName'] = recipient['name'] if recipient else 'Unknown'
        
        return json.dumps(transactions, cls=JSONEncoder), 200, {'Content-Type': 'application/json'}
    
    except Exception as e:
        return jsonify({'message': 'Failed to fetch transactions', 'error': str(e)}), 500

@transactions_bp.route('/<transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    try:
        transaction_model = Transaction(current_app.db)
        user_model = User(current_app.db)
        
        transaction = transaction_model.get_transaction_by_id(transaction_id)
        if not transaction:
            return jsonify({'message': 'Transaction not found'}), 404
        
        # Add user names
        if 'senderId' in transaction:
            sender = user_model.get_user_by_id(str(transaction['senderId']))
            transaction['senderName'] = sender['name'] if sender else 'Unknown'
        
        if 'recipientId' in transaction:
            recipient = user_model.get_user_by_id(str(transaction['recipientId']))
            transaction['recipientName'] = recipient['name'] if recipient else 'Unknown'
        
        return json.dumps(transaction, cls=JSONEncoder), 200, {'Content-Type': 'application/json'}
    
    except Exception as e:
        return jsonify({'message': 'Failed to fetch transaction', 'error': str(e)}), 500

@transactions_bp.route('/<transaction_id>/refund', methods=['POST'])
def refund_transaction(transaction_id):
    try:
        transaction_model = Transaction(current_app.db)
        
        result = transaction_model.update_transaction_status(transaction_id, 'refunded')
        if result.matched_count == 0:
            return jsonify({'message': 'Transaction not found'}), 404
        
        return jsonify({'message': 'Refund processed successfully'})
    
    except Exception as e:
        return jsonify({'message': 'Failed to process refund', 'error': str(e)}), 500
