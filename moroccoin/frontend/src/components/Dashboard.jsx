import { useState } from 'react'
import UserList from './UserList'
import TransactionList from './TransactionList'
import UserDetails from './UserDetails'

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('users')
  const [selectedUser, setSelectedUser] = useState(null)

  const tabs = [
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'transactions', name: 'Transactions', icon: '💰' },
    { id: 'support', name: 'Support', icon: '🎧' },
    { id: 'reports', name: 'Reports', icon: '📊' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-morocco-purple">MoroccoCoin Admin</h1>
            </div>
            <button
              onClick={onLogout}
              className="bg-morocco-purple text-white px-4 py-2 rounded-md hover:bg-morocco-dark transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-morocco-purple text-morocco-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'users' && (
            <UserList onSelectUser={setSelectedUser} />
          )}
          {activeTab === 'transactions' && <TransactionList />}
          {activeTab === 'support' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Support</h3>
              <p className="text-gray-600">Support features coming soon...</p>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Business Reports</h3>
              <p className="text-gray-600">Reporting features coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}

export default Dashboard
