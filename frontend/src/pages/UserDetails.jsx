import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, CreditCard, RefreshCw } from 'lucide-react'

const UserDetails = () => {
  const { id } = useParams()
  
  // Mock user data - replace with actual API call
  const user = {
    id: id,
    name: 'Ahmed Ben Ali',
    email: 'ahmed@email.com',
    phone: '+212-600-123456',
    status: 'Active',
    joinDate: '2024-01-15',
    totalTransactions: 45,
    totalAmount: '45,670 MAD',
    address: 'Casablanca, Morocco'
  }

  const transactions = [
    { id: 'TX001', date: '2024-06-30', amount: '500 MAD', status: 'Completed', type: 'Send', recipient: 'Fatima El Mansouri' },
    { id: 'TX002', date: '2024-06-28', amount: '1,200 MAD', status: 'Completed', type: 'Receive', sender: 'Mohammed Hajji' },
    { id: 'TX003', date: '2024-06-25', amount: '300 MAD', status: 'Pending', type: 'Send', recipient: 'Aicha Berrada' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/users" className="text-primary hover:text-primary-dark">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-600">Detailed information for {user.name}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="mt-1 text-lg text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="mt-1 text-lg text-gray-900">{user.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  user.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Address</label>
                <p className="mt-1 text-lg text-gray-900">{user.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Join Date</label>
                <p className="mt-1 text-lg text-gray-900">{user.joinDate}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.amount}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.type === 'Send' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.recipient || transaction.sender}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Transactions</span>
                <span className="font-semibold">{user.totalTransactions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold">{user.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Status</span>
                <span className={`font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition-colors">
                <RefreshCw size={16} />
                <span>Process Refund</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
                <Mail size={16} />
                <span>Send Email</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
                <Phone size={16} />
                <span>Send SMS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
