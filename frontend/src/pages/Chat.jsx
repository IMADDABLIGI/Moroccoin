import React, { useState, useRef, useEffect } from 'react'
import { Send, Search, User, Phone, Mail } from 'lucide-react'

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef(null)

  const chatUsers = [
    { 
      id: 1, 
      name: 'Ahmed Ben Ali', 
      lastMessage: 'I need help with my transaction', 
      time: '2 min ago', 
      unread: 2,
      online: true
    },
    { 
      id: 2, 
      name: 'Fatima El Mansouri', 
      lastMessage: 'Thank you for your help', 
      time: '15 min ago', 
      unread: 0,
      online: false
    },
    { 
      id: 3, 
      name: 'Mohammed Hajji', 
      lastMessage: 'When will my refund be processed?', 
      time: '1 hour ago', 
      unread: 1,
      online: true
    },
  ]

  const messages = selectedUser ? [
    { id: 1, sender: 'user', content: 'Hello, I need help with my transaction', time: '10:30 AM' },
    { id: 2, sender: 'admin', content: 'Hi! I\'d be happy to help you with your transaction. Could you please provide me with your transaction ID?', time: '10:32 AM' },
    { id: 3, sender: 'user', content: 'It\'s TX001234', time: '10:33 AM' },
    { id: 4, sender: 'admin', content: 'Thank you. Let me check that for you right away.', time: '10:34 AM' },
    { id: 5, sender: 'user', content: 'I need help with my transaction', time: '10:35 AM' },
  ] : []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && selectedUser) {
      // Here you would send the message to your backend
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const filteredUsers = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Chat Support</h1>
        <p className="text-gray-600">Communicate with users in real-time</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.id === user.id ? 'bg-primary bg-opacity-10 border-primary' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    {user.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.time}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                  </div>
                  {user.unread > 0 && (
                    <div className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {user.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    {selectedUser.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedUser.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedUser.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Mail size={18} />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'admin'
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'admin' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={24} className="text-gray-500" />
                </div>
                <p className="text-gray-500">Select a user to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
