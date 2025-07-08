from pymongo import MongoClient
from datetime import datetime, timedelta
import random
import os
from dotenv import load_dotenv

load_dotenv()

# Moroccan names and cities
moroccan_names = [
    "Ahmed Hassan", "Fatima Zahra", "Omar Benali", "Aicha Alami", "Youssef Tazi",
    "Khadija Bennani", "Hassan Alaoui", "Nadia Cherkaoui", "Rachid Idrissi", "Samira Fassi",
    "Abdelkader Berrada", "Latifa Ouali", "Mohamed Lahlou", "Zineb Amrani", "Karim Benjelloun",
    "Malika Sefrioui", "Driss Chraibi", "Houda Taarji", "Saad Lamrani", "Rajae Belkadi"
]

moroccan_cities = [
    "Casablanca", "Rabat", "Fes", "Marrakech", "Agadir", "Tangier", "Meknes", "Oujda",
    "Kenitra", "Tetouan", "Safi", "Mohammedia", "Khouribga", "Beni Mellal", "El Jadida"
]

moroccan_emails = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "moroccotelecom.ma"
]

def generate_phone():
    return f"+212 6 {random.randint(10, 99)} {random.randint(10, 99)} {random.randint(10, 99)} {random.randint(10, 99)}"

def generate_id_number():
    return f"BE{random.randint(100000, 999999)}"

def init_database():
    client = MongoClient(os.getenv('MONGODB_URI'))
    db = client[os.getenv('DATABASE_NAME', 'moroccoin_db')]
    
    # Clear existing data
    db.users.delete_many({})
    db.transactions.delete_many({})
    db.chat_messages.delete_many({})
    
    print("🗑️  Cleared existing data")
    
    # Create admin user
    admin_user = {
        "name": "Admin User",
        "email": "admin@moroccoin.com",
        "password": "admin123",  # In production, this should be hashed
        "phone": "+212 5 22 00 00 00",
        "address": "Casablanca, Morocco",
        "idNumber": "ADMIN001",
        "status": "active",
        "role": "admin",
        "createdAt": datetime.utcnow(),
        "lastActivity": datetime.utcnow()
    }
    
    admin_result = db.users.insert_one(admin_user)
    print("👤 Created admin user")
    
    # Create regular users
    users = []
    for i, name in enumerate(moroccan_names):
        email_domain = random.choice(moroccan_emails)
        email = f"{name.lower().replace(' ', '.')}.{random.randint(1, 99)}@{email_domain}"
        
        user = {
            "name": name,
            "email": email,
            "phone": generate_phone(),
            "address": f"{random.choice(moroccan_cities)}, Morocco",
            "idNumber": generate_id_number(),
            "status": random.choice(["active", "active", "active", "suspended"]),  # 75% active
            "createdAt": datetime.utcnow() - timedelta(days=random.randint(1, 365)),
            "lastActivity": datetime.utcnow() - timedelta(days=random.randint(0, 30))
        }
        users.append(user)
    
    user_results = db.users.insert_many(users)
    user_ids = user_results.inserted_ids
    print(f"👥 Created {len(users)} users")
    
    # Create transactions
    transaction_statuses = ["completed", "pending", "failed"]
    transactions = []
    
    for i in range(100):  # Create 100 transactions
        sender_id = random.choice(user_ids)
        recipient_id = random.choice(user_ids)
        
        while recipient_id == sender_id:
            recipient_id = random.choice(user_ids)
        
        transaction = {
            "transactionId": f"TXN{str(i+1).zfill(6)}",
            "senderId": sender_id,
            "recipientId": recipient_id,
            "amount": random.randint(100, 5000),
            "status": random.choice(transaction_statuses),
            "createdAt": datetime.utcnow() - timedelta(days=random.randint(0, 90)),
            "description": f"Money transfer #{i+1}"
        }
        transactions.append(transaction)
    
    db.transactions.insert_many(transactions)
    print(f"💳 Created {len(transactions)} transactions")
    
    # Create some chat messages
    chat_messages = []
    sample_messages = [
        "Hello, I need help with my transaction",
        "My transfer is showing as pending for 2 days",
        "Can you help me cancel a transaction?",
        "I didn't receive my money yet",
        "There's an error in my transaction amount",
        "How long does a transfer usually take?",
        "I need to update my phone number",
        "Can you resend the confirmation SMS?"
    ]
    
    admin_responses = [
        "Hello! I'm here to help you with your issue.",
        "Let me check your transaction status for you.",
        "I can help you with that. Let me look into it.",
        "Thank you for contacting us. I'll resolve this quickly.",
        "I understand your concern. Let me investigate this.",
        "I'll check our system and get back to you shortly.",
        "Let me verify your account details first.",
        "I'll process your request right away."
    ]
    
    for i in range(50):  # Create 50 chat messages
        user_id = str(random.choice(user_ids))
        
        # User message
        user_message = {
            "userId": user_id,
            "sender": random.choice(moroccan_names),
            "message": random.choice(sample_messages),
            "timestamp": datetime.utcnow() - timedelta(hours=random.randint(1, 48)),
            "isAdmin": False
        }
        chat_messages.append(user_message)
        
        # Admin response
        admin_message = {
            "userId": user_id,
            "sender": "Admin",
            "message": random.choice(admin_responses),
            "timestamp": datetime.utcnow() - timedelta(hours=random.randint(0, 47)),
            "isAdmin": True
        }
        chat_messages.append(admin_message)
    
    db.chat_messages.insert_many(chat_messages)
    print(f"💬 Created {len(chat_messages)} chat messages")
    
    print("✅ Database initialization completed!")
    print(f"📊 Summary:")
    print(f"   - Users: {len(users) + 1} (including admin)")
    print(f"   - Transactions: {len(transactions)}")
    print(f"   - Chat Messages: {len(chat_messages)}")
    print(f"")
    print(f"🔑 Admin Login:")
    print(f"   Email: admin@moroccoin.com")
    print(f"   Password: admin123")

if __name__ == "__main__":
    init_database()
