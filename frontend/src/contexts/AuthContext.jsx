import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (check localStorage or make API call)
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      setUser({ name: 'Admin User', email: 'admin@moroccoin.com' })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Replace with actual API call
      if (email === 'admin@moroccoin.com' && password === 'admin123') {
        const token = 'fake-jwt-token'
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
        setUser({ name: 'Admin User', email })
        return { success: true }
      }
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
