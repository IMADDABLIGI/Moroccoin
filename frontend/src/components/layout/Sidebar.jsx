import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  MessageCircle,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Sidebar = () => {
  const { logout } = useAuth()

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/transactions', icon: CreditCard, label: 'Transactions' },
    { to: '/chat', icon: MessageCircle, label: 'Chat Support' },
  ]

  return (
    <div className="bg-primary text-white w-64 flex flex-col">
      <div className="p-6 border-b border-primary-light">
        <h1 className="text-2xl font-bold">🪙 Moroccoin</h1>
        <p className="text-purple-200 text-sm">Admin Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-light text-white'
                      : 'text-purple-200 hover:bg-primary-light hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-primary-light">
        <button
          onClick={logout}
          className="flex items-center space-x-3 p-3 w-full text-purple-200 hover:bg-primary-light hover:text-white rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
