from datetime import datetime
from bson import ObjectId
import random
import string

class Transaction:
    def __init__(self, db):
        self.collection = db.transactions
    
    def generate_transaction_id(self):
        return 'TXN' + ''.join(random.choices(string.digits, k=6))
    
    def create_transaction(self, transaction_data):
        transaction_data['transactionId'] = self.generate_transaction_id()
        transaction_data['createdAt'] = datetime.utcnow()
        result = self.collection.insert_one(transaction_data)
        return str(result.inserted_id)
    
    def get_transaction_by_id(self, transaction_id):
        return self.collection.find_one({'_id': ObjectId(transaction_id)})
    
    def get_all_transactions(self, filters=None):
        query = {}
        if filters:
            if filters.get('userId'):
                query['senderId'] = ObjectId(filters['userId'])
            if filters.get('status'):
                query['status'] = filters['status']
        
        return list(self.collection.find(query).sort('createdAt', -1))
    
    def update_transaction_status(self, transaction_id, status):
        return self.collection.update_one(
            {'_id': ObjectId(transaction_id)},
            {'$set': {'status': status, 'updatedAt': datetime.utcnow()}}
        )
    
    def get_user_transactions(self, user_id):
        return list(self.collection.find({
            '$or': [
                {'senderId': ObjectId(user_id)},
                {'recipientId': ObjectId(user_id)}
            ]
        }).sort('createdAt', -1))
    
    def get_recent_transactions(self, limit=5):
        return list(self.collection.find().sort('createdAt', -1).limit(limit))
