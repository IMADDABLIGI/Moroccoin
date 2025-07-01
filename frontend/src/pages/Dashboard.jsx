import React from 'react'
import { Users, CreditCard, TrendingUp, AlertCircle } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '12,456', icon: Users, color: 'bg-blue-500' },
    { title: 'Transactions Today', value: '2,847', icon: CreditCard, color: 'bg-green-500' },
    { title: 'Revenue (MAD)', value: '1,234,567', icon: TrendingUp, color: 'bg-primary' },
    { title: 'Pending Issues', value: '23', icon: AlertCircle, color: 'bg-red-500' },
  ]

  const recentTransactions = [
    { id: '1', user: 'Ahmed Ben Ali', amount: '500 MAD', status: 'Completed', time: '2 min ago' },
    { id: '2', user: 'Fatima El Mansouri', amount: '1,200 MAD', status: 'Pending', time: '5 min ago' },
    { id: '3', user: 'Mohammed Hajji', amount: '300 MAD', status: 'Completed', time: '12 min ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Moroccoin Admin Dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{transaction.user}</p>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{transaction.amount}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition-colors">
              Process Refund
            </button>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
              Send Notification
            </button>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
