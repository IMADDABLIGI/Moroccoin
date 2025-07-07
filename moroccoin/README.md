# 🪙 MoroccoCoin - Money Wiring Platform

A fullstack web application for managing money transfers with an admin dashboard for customer support and business reporting.

## 🚀 Features

- **User Management**: View and manage user accounts
- **Transaction Tracking**: Monitor all money transfers
- **Customer Support**: Handle support tickets and chat with users
- **Business Intelligence**: Generate reports and insights
- **Refund Processing**: Process refunds for completed transactions
- **Communication**: Send SMS and email notifications

## 🛠 Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS** (via CDN)
- **JavaScript**
- **Responsive Design**

### Backend
- **Django** with Django REST Framework
- **SQLite** Database
- **CORS** enabled for frontend communication

## 📁 Project Structure

```
moroccoin/
├── backend/                 # Django backend
│   ├── moroccoin_backend/   # Main Django project
│   ├── users/              # User management app
│   ├── transactions/       # Transaction handling app
│   ├── support/           # Customer support app
│   ├── manage.py          # Django management script
│   └── requirements.txt   # Python dependencies
├── frontend/              # React frontend
└── README.md             # This file
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
source bin/activate  # On Windows: Scripts\activate
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
# Open index.html in your browser or use a local server
```

## 🔑 Default Admin Credentials
- **Username**: admin
- **Password**: admin123
- **Admin Panel**: http://127.0.0.1:8000/admin/

## 📊 API Endpoints

### Users
- `GET /api/users/` - List all users
- `POST /api/users/` - Create new user
- `GET /api/users/{id}/` - Get user details
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user
- `POST /api/users/{id}/send_email/` - Send email to user
- `POST /api/users/{id}/send_sms/` - Send SMS to user

### Transactions
- `GET /api/transactions/` - List all transactions
- `POST /api/transactions/` - Create new transaction
- `GET /api/transactions/{id}/` - Get transaction details
- `PUT /api/transactions/{id}/` - Update transaction
- `DELETE /api/transactions/{id}/` - Delete transaction
- `POST /api/transactions/{id}/refund/` - Process refund

### Support
- `GET /api/support-tickets/` - List all support tickets
- `POST /api/support-tickets/` - Create new support ticket
- `GET /api/support-tickets/{id}/` - Get ticket details
- `PUT /api/support-tickets/{id}/` - Update ticket
- `DELETE /api/support-tickets/{id}/` - Delete ticket

### Chat Messages
- `GET /api/chat-messages/` - List all chat messages
- `POST /api/chat-messages/` - Create new chat message
- `GET /api/chat-messages/{id}/` - Get message details

## 🔧 Development

### Making Changes
1. Backend changes: Modify files in the `backend/` directory
2. Frontend changes: Modify files in the `frontend/` directory
3. Database changes: Run `python manage.py makemigrations` and `python manage.py migrate`

### Running Tests
```bash
cd backend
python manage.py test
```

## 🚀 Deployment

### Production Settings
Before deploying to production:
1. Change `SECRET_KEY` in `settings.py`
2. Set `DEBUG = False`
3. Update `ALLOWED_HOSTS`
4. Use a production database (PostgreSQL recommended)
5. Configure static file serving
6. Set up environment variables for sensitive data

## 📝 License

This project is licensed under the MIT License.
