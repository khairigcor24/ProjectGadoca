import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../lib/auth'

function AuthLayout() {
  const token = getToken()

  if (token) {
    return <Navigate to="/dashboard/overview" replace />
  }

  return (
    <div className="auth-layout">
      <aside className="auth-layout__visual" aria-hidden="true">
        <div className="auth-layout__visual-quote">
          <h2>Rasa autentik, disajikan dengan hati</h2>
          <p>
            Desain ramah dan mengundang — tempat makanan dan minuman Anda menjadi
            pusat perhatian, seperti template kafe Wix.
          </p>
        </div>
      </aside>
      <div className="auth-layout__form">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
