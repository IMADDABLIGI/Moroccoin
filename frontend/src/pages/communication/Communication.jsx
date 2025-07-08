import { useState } from 'react'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { communicationAPI } from '../../services/api'

export default function Communication() {
  const [emailForm, setEmailForm] = useState({ recipient: '', subject: '', message: '' })
  const [smsForm, setSmsForm] = useState({ recipient: '', message: '' })
  const [loading, setLoading] = useState({ email: false, sms: false })

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setLoading({ ...loading, email: true })
    try {
      await communicationAPI.sendEmail(emailForm)
      alert('Email sent successfully!')
      setEmailForm({ recipient: '', subject: '', message: '' })
    } catch (error) {
      alert('Error sending email')
    } finally {
      setLoading({ ...loading, email: false })
    }
  }

  const handleSMSSubmit = async (e) => {
    e.preventDefault()
    setLoading({ ...loading, sms: true })
    try {
      await communicationAPI.sendSMS(smsForm)
      alert('SMS sent successfully!')
      setSmsForm({ recipient: '', message: '' })
    } catch (error) {
      alert('Error sending SMS')
    } finally {
      setLoading({ ...loading, sms: false })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Form */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold">Send Email</h2>
          </div>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Recipient</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={emailForm.recipient}
                onChange={(e) => setEmailForm({...emailForm, recipient: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={emailForm.message}
                onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
              />
            </div>
            <button
              type="submit"
              disabled={loading.email}
              className="w-full flex justify-center items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading.email ? 'Sending...' : 'Send Email'}
            </button>
          </form>
        </div>

        {/* SMS Form */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold">Send SMS</h2>
          </div>
          <form onSubmit={handleSMSSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={smsForm.recipient}
                onChange={(e) => setSmsForm({...smsForm, recipient: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={smsForm.message}
                onChange={(e) => setSmsForm({...smsForm, message: e.target.value})}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">{smsForm.message.length}/160 characters</p>
            </div>
            <button
              type="submit"
              disabled={loading.sms}
              className="w-full flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading.sms ? 'Sending...' : 'Send SMS'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
