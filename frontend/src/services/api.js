import axios from 'axios'

// const API_BASE_URL = 'http://localhost:5000/api'
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
}

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
}

// Users API
export const usersAPI = {
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.patch(`/users/${id}`, data),
}

// Transactions API
export const transactionsAPI = {
  getTransactions: (params) => api.get('/transactions', { params }),
  getTransaction: (id) => api.get(`/transactions/${id}`),
  refundTransaction: (id) => api.post(`/transactions/${id}/refund`),
}

// Communication API
export const communicationAPI = {
  sendEmail: (data) => api.post('/communication/email', data),
  sendSMS: (data) => api.post('/communication/sms', data),
}

// Chat API
export const chatAPI = {
  getMessages: (userId) => api.get(`/chat/${userId}/messages`),
  sendMessage: (userId, message) => api.post(`/chat/${userId}/messages`, { message }),
}

export default api
