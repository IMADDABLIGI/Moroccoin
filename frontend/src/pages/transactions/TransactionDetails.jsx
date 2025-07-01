import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function TransactionDetails() {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/transactions" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Transaction {id}</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Transaction ID</label>
            <p className="text-sm text-gray-900">{id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Amount</label>
            <p className="text-sm text-gray-900">$500</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Date</label>
            <p className="text-sm text-gray-900">2024-01-15</p>
          </div>
        </div>
      </div>
    </div>
  )
}
