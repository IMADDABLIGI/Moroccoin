from flask import Blueprint, jsonify, current_app
from app.models.user import User
from app.models.transaction import Transaction
import json
from bson import ObjectId
from datetime import datetime

dashboard_bp = Blueprint('dashboard', __name__)

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

@dashboard_bp.route('/stats', methods=['GET'])
def get_dashboard_stats():
    try:
        user_model = User(current_app.db)
        transaction_model = Transaction(current_app.db)
        
        # Get stats
        total_users = current_app.db.users.count_documents({})
        total_transactions = current_app.db.transactions.count_documents({})
        
        # Calculate total volume
        pipeline = [
            {'$group': {'_id': None, 'total': {'$sum': '$amount'}}}
        ]
        volume_result = list(current_app.db.transactions.aggregate(pipeline))
        total_volume = volume_result[0]['total'] if volume_result else 0
        
        # Count pending refunds
        pending_refunds = current_app.db.transactions.count_documents({'status': 'pending'})
        
        # Get recent transactions
        recent_transactions = transaction_model.get_recent_transactions(5)
        

        # Add user names to recent transactions
        for transaction in recent_transactions:
            if 'senderId' in transaction:
                sender = user_model.get_user_by_id(str(transaction['senderId']))
                transaction['senderName'] = sender['name'] if sender else 'Unknown'
        
        stats = {
            'stats': {
                'totalUsers': total_users,
                'totalTransactions': total_transactions,
                'totalVolume': total_volume,
                'pendingRefunds': pending_refunds
            },
            'recentTransactions': recent_transactions
        }
        
        return json.dumps(stats, cls=JSONEncoder), 200, {'Content-Type': 'application/json'}
    
    except Exception as e:
        print("Error fetching dashboard stats:", str(e))
        return jsonify({'message': 'Failed to fetch dashboard stats', 'error': str(e)}), 500
