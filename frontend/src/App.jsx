import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import UsersList from './pages/users/UsersList'
import UserDetails from './pages/users/UserDetails'
import TransactionsList from './pages/transactions/TransactionsList'
import TransactionDetails from './pages/transactions/TransactionDetails'
import Communication from './pages/communication/Communication'
import Chat from './pages/chat/Chat'
import Layout from './components/common/Layout'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <Layout>
                <UsersList />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/users/:id" element={
            <ProtectedRoute>
              <Layout>
                <UserDetails />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Layout>
                <TransactionsList />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/transactions/:id" element={
            <ProtectedRoute>
              <Layout>
                <TransactionDetails />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/communication" element={
            <ProtectedRoute>
              <Layout>
                <Communication />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute>
              <Layout>
                <Chat />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
