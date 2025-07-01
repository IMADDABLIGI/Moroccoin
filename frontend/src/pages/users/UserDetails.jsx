import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Calendar, CreditCard, DollarSign, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

export default function UserDetails() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: parseInt(id),
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@email.com',
        phone: '+212 6 12 34 56 78',
        status: 'active',
        joinDate: '2023-06-15',
        lastActivity: '2024-01-15',
        address: 'Casablanca, Morocco',
        idNumber: 'BE123456',
        totalTransactions: 15,
        totalAmount: 7500,
        successfulTransactions: 13,
        failedTransactions: 2
      })
      
      setTransactions([
        { id: 'TXN001', amount: 500, status: 'completed', date: '2024-01-15', recipient: 'Fatima Zahra' },
        { id: 'TXN002', amount: 1200, status: 'pending', date: '2024-01-14', recipient: 'Omar Benali' },
        { id: 'TXN003', amount: 800, status: 'completed', date: '2024-01-13', recipient: 'Aicha Alami' },
        { id: 'TXN004', amount: 300, status: 'failed', date: '2024-01-12', recipient: 'Hassan Alaoui' },
        { id: 'TXN005', amount: 600, status: 'completed', date: '2024-01-11', recipient: 'Khadija Bennani' }
      ])
      
      setLoading(false)
    }, 1000)
  }, [id])

  const handleRefund = (transactionId) => {
    // Implement refund logic
    alert(`Refund initiated for transaction ${transactionId}`)
  }

  const handleSendEmail = () => {
    // Implement email sending logic
    alert('Email sent to user')
  }

  const handleSendSMS = () => {
    // Implement SMS sending logic
    alert('SMS sent to user')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">User not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/users" 
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">User ID: {user.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSendEmail}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </button>
          <button
            onClick={handleSendSMS}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Phone className="h-4 w-4 mr-2" />
            Send SMS
          </button>
        </div>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{user.totalTransactions}</p>
            </div>
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">${user.totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-green-600">{user.successfulTransactions}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{user.failedTransactions}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-sm text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-sm text-gray-900">{user.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-sm text-gray-900">{user.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">ID Number</label>
                <p className="text-sm text-gray-900">{user.idNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Join Date</label>
                <p className="text-sm text-gray-900">{user.joinDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Activity</label>
                <p className="text-sm text-gray-900">{user.lastActivity}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link 
                          to={`/transactions/${transaction.id}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          {transaction.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.recipient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {transaction.status === 'completed' && (
                          <button
                            onClick={() => handleRefund(transaction.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Refund
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
