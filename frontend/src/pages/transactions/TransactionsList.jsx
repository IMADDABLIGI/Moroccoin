import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Eye } from 'lucide-react'

export default function TransactionsList() {
  const [transactions] = useState([
    { id: 'TXN001', user: 'Ahmed Hassan', amount: 500, status: 'completed', date: '2024-01-15', recipient: 'Fatima Zahra' },
    { id: 'TXN002', user: 'Fatima Zahra', amount: 1200, status: 'pending', date: '2024-01-15', recipient: 'Omar Benali' },
    { id: 'TXN003', user: 'Omar Benali', amount: 800, status: 'completed', date: '2024-01-14', recipient: 'Aicha Alami' },
    { id: 'TXN004', user: 'Aicha Alami', amount: 300, status: 'failed', date: '2024-01-14', recipient: 'Hassan Alaoui' },
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
      
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/transactions/${transaction.id}`} className="text-primary hover:text-primary-dark">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
