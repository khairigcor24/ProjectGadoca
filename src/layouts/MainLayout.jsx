import { Outlet, useLocation } from 'react-router-dom'

import HeroBanner from '../sections/HeroBanner'
import Sidebar from '../sections/Sidebar'
import Footer from '../sections/Footer'

import { isGuest, getRole } from '../lib/auth'

function UserIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}

function MainLayout() {
  const location = useLocation()
  const guest = isGuest()
  const role = getRole()
  const roleName = role === 'KASIR' ? 'Kasir' : 'Admin Manajemen'
  const roleBadge = role === 'KASIR' ? 'Kasir' : 'Admin'

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        
        {guest ? (
          <>
            <p className="cafe-strip">
              Pesan sebelum tengah hari untuk pengiriman di hari yang sama!
            </p>
            <HeroBanner pathname={location.pathname} />
          </>
        ) : (
          <div style={{ background: 'white', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#0ea5e9' }}>
                <UserIcon size={20} />
              </div>
              <span style={{ fontSize: '14px', color: '#475569' }}>
                Selamat datang, <span style={{ fontWeight: 600, color: 'var(--cafe-ink)' }}>{roleName}</span>
              </span>
            </div>
            <div style={{ background: '#f1f5f9', color: '#94a3b8', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>
              {roleBadge}
            </div>
          </div>
        )}

        <div className="page-content" style={{ flex: 1, padding: guest ? '32px' : '32px 32px 0 32px', background: guest ? 'transparent' : '#f8fafc' }}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
