import { useState } from 'react'
import { Send, User } from 'lucide-react'

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ahmed Hassan', message: 'Hello, I need help with my transaction', time: '10:30 AM', isAdmin: false },
    { id: 2, user: 'Admin', message: 'Hi Ahmed, I can help you with that. What seems to be the issue?', time: '10:32 AM', isAdmin: true },
    { id: 3, user: 'Ahmed Hassan', message: 'My transaction TXN001 is showing as pending for 2 days', time: '10:33 AM', isAdmin: false },
  ])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'Admin',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdmin: true
      }])
      setNewMessage('')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Live Chat Support</h1>
      
      <div className="bg-white rounded-lg shadow border border-gray-200 h-96 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isAdmin 
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center mb-1">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{message.user}</span>
                  <span className="text-xs ml-2 opacity-75">{message.time}</span>
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
