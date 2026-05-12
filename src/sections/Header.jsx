import { useNavigate } from 'react-router-dom'
import { clearToken } from '../lib/auth'

const pageMeta = {
  '/dashboard/overview': { title: 'Monthly Sales Overview', crumb: 'Dashboard / eCommerce' },
  '/dashboard/insights': { title: 'Dashboard Insights', crumb: 'Dashboard / Insights' },
  '/product': { title: 'Product Management', crumb: 'E-commerce / Products' },
  '/transactions': { title: 'Transactions', crumb: 'E-commerce / Transactions' },
  '/analytics': { title: 'Analytics Overview', crumb: 'Dashboard / Analytics' },
  '/user-profile': { title: 'User Profile', crumb: 'Account / Profile' },
}

function Header({ pathname }) {
  const navigate = useNavigate()
  const meta = pageMeta[pathname] || pageMeta['/dashboard/overview']

  function handleLogout() {
    clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">{meta.crumb}</p>
        <h2>{meta.title}</h2>
        <p className="topbar-tagline">
          Ruang kerja ramah — ala kafe: sederhana, hangat, untuk tim dan komunitas Anda.
        </p>
      </div>
      <div className="topbar-actions">
        <button type="button">View More</button>
        <button type="button" className="btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
