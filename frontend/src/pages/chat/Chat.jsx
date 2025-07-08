import { useState, useEffect } from 'react'
import { Send, User } from 'lucide-react'
import { chatAPI } from '../../services/api'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('user1')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await chatAPI.getMessages(selectedUserId)
        setMessages(response.data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [selectedUserId])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      try {
        await chatAPI.sendMessage(selectedUserId, newMessage)
        setMessages([...messages, {
          _id: Date.now(),
          sender: 'Admin',
          message: newMessage,
          timestamp: new Date(),
          isAdmin: true
        }])
        setNewMessage('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Live Chat Support</h1>
      <div className="bg-white rounded-lg shadow border border-gray-200 h-96 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message._id} className={`mb-4 flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isAdmin
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center mb-1">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{message.sender}</span>
                  <span className="text-xs ml-2 opacity-75">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
