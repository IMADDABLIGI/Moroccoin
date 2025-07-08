from datetime import datetime
from bson import ObjectId

class User:
    def __init__(self, db):
        self.collection = db.users
    
    def create_user(self, user_data):
        user_data['createdAt'] = datetime.utcnow()
        user_data['lastActivity'] = datetime.utcnow()
        result = self.collection.insert_one(user_data)
        return str(result.inserted_id)
    
    def get_user_by_id(self, user_id):
        return self.collection.find_one({'_id': ObjectId(user_id)})
    
    def get_user_by_email(self, email):
        return self.collection.find_one({'email': email})
    
    def get_all_users(self, filters=None):
        query = {}
        if filters:
            if filters.get('search'):
                query['$or'] = [
                    {'name': {'$regex': filters['search'], '$options': 'i'}},
                    {'email': {'$regex': filters['search'], '$options': 'i'}}
                ]
            if filters.get('status') and filters['status'] != 'all':
                query['status'] = filters['status']
        
        return list(self.collection.find(query))
    
    def update_user(self, user_id, update_data):
        update_data['updatedAt'] = datetime.utcnow()
        return self.collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_data}
        )
    
    def update_last_activity(self, user_id):
        return self.collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'lastActivity': datetime.utcnow()}}
        )
