import jwt
import bcrypt
from datetime import datetime, timedelta
import os

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, os.getenv('JWT_SECRET_KEY', 'dev-secret-key'), algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY', 'dev-secret-key'), algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)
