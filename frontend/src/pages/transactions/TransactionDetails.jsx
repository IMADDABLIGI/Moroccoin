import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { transactionsAPI } from '../../services/api'

export default function TransactionDetails() {
  const { id } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await transactionsAPI.getTransaction(id)
        setTransaction(response.data)
      } catch (error) {
        console.error('Error fetching transaction:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">Transaction not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/transactions" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Transaction {transaction.transactionId}</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Transaction ID</label>
            <p className="text-sm text-gray-900">{transaction.transactionId}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Amount</label>
            <p className="text-sm text-gray-900">${transaction.amount}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Sender</label>
            <p className="text-sm text-gray-900">{transaction.senderName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Recipient</label>
            <p className="text-sm text-gray-900">{transaction.recipientName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
            }`}>
              {transaction.status}
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Date</label>
            <p className="text-sm text-gray-900">{new Date(transaction.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
