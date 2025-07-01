# 🪙 Moroccoin - Admin Dashboard

A modern React frontend for the Moroccoin money wiring platform admin dashboard.

## Features

- **Dashboard**: Overview of key metrics and recent activities
- **User Management**: View, search, and manage user accounts
- **Transaction Monitoring**: Track and manage all transactions
- **Chat Support**: Real-time communication with users
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, Header)
│   ├── ui/              # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── users/           # User management components
│   ├── transactions/    # Transaction components
│   └── chat/            # Chat components
├── pages/               # Page components
├── hooks/               # Custom React hooks
└── utils/               # Utility functions
```

## Backend Integration

This frontend is designed to work with a Django backend. Update the API endpoints in the components to match your Django REST API URLs.

## Login Credentials (Demo)

- Email: admin@moroccoin.ma
- Password: password

## Color Theme

Primary Color: #2f0c6e (Purple)
- Light: #4c1d95
- Dark: #1e0a4e

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
