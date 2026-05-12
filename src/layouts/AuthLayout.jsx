import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../lib/auth'

function AuthLayout() {
  const token = getToken()

  if (token) {
    return <Navigate to="/dashboard/overview" replace />
  }

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  )
}

export default AuthLayout
