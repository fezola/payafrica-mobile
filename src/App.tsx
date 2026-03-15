import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import { MobileAuthProvider } from "./hooks/useMobileAuth"
import MobileLayout from "./mobile/MobileLayout"
import MobileAuthPage from "./mobile/MobileAuthPage"
import SendMoneyPage from "./mobile/SendMoneyPage"
import WalletPage from "./mobile/WalletPage"
import ActivityPage from "./mobile/ActivityPage"
import ProfilePage from "./mobile/ProfilePage"
import ReceiveMoneyPage from "./mobile/ReceiveMoneyPage"

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useMobileAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}

// Auth Route Component (redirect if already logged in)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useMobileAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// Hook import for protected routes
import { useMobileAuth } from "./hooks/useMobileAuth"

function AppContent() {
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={
          <AuthRoute>
            <MobileAuthPage />
          </AuthRoute>
        } />

        {/* Protected Mobile Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <MobileLayout />
          </ProtectedRoute>
        }>
          <Route index element={null} />
          <Route path="send" element={<SendMoneyPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="receive" element={<ReceiveMoneyPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  )
}

function App() {
  return (
    <MobileAuthProvider>
      <AppContent />
    </MobileAuthProvider>
  )
}

export default App
