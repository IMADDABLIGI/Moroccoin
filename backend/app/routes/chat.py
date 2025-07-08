from flask import Blueprint, request, jsonify, current_app
from datetime import datetime
import json
from bson import ObjectId

chat_bp = Blueprint('chat', __name__)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

@chat_bp.route('/<user_id>/messages', methods=['GET'])
def get_messages(user_id):
    try:
        messages = list(current_app.db.chat_messages.find({
            'userId': user_id
        }).sort('timestamp', 1))
        
        return json.dumps(messages, cls=JSONEncoder), 200, {'Content-Type': 'application/json'}
    
    except Exception as e:
        return jsonify({'message': 'Failed to fetch messages', 'error': str(e)}), 500

@chat_bp.route('/<user_id>/messages', methods=['POST'])
def send_message(user_id):
    try:
        data = request.get_json()
        message = data.get('message')
        
        message_data = {
            'userId': user_id,
            'sender': 'Admin',
            'message': message,
            'timestamp': datetime.utcnow(),
            'isAdmin': True
        }
        
        current_app.db.chat_messages.insert_one(message_data)
        
        return jsonify({'message': 'Message sent successfully'})
    
    except Exception as e:
        return jsonify({'message': 'Failed to send message', 'error': str(e)}), 500
