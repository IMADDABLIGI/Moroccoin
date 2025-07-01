import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true)
      setUser({ name: 'Admin User', email: 'admin@moroccoin.ma' })
    }
  }, [])

  const login = (credentials) => {
    // Mock login - replace with actual API call
    localStorage.setItem('authToken', 'mock-token')
    setIsAuthenticated(true)
    setUser({ name: 'Admin User', email: 'admin@moroccoin.ma' })
    return Promise.resolve()
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    setUser(null)
  }

  return { isAuthenticated, user, login, logout }
}
