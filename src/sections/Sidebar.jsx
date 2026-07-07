import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import gadocaaLogo from '../assets/gadocaa-logo.png'
import { getCartCount } from '../lib/cartStore'
import { isGuest, clearToken, clearGuestToken, getRole } from '../lib/auth'

const adminMenus = [
  { groupLabel: 'UTAMA' },
  { to: '/admin/dashboard/overview', label: 'Dashboard', icon: 'dashboard', activePrefix: '/admin/dashboard' },

  { groupLabel: 'MANAJEMEN' },
  { to: '/admin/categories', label: 'Kelola Kategori', icon: 'category', activePrefix: '/admin/categories' },
  { to: '/product', label: 'Kelola Menu', icon: 'product', activePrefix: '/product' },
  { to: '/admin/tables', label: 'Meja & QR Code', icon: 'table', activePrefix: '/admin/tables' },
  { to: '/admin/cashiers', label: 'Manajemen Kasir', icon: 'profile', activePrefix: '/admin/cashiers' },

  { groupLabel: 'TRANSAKSI' },
  { to: '/admin/transactions', label: 'Riwayat Transaksi', icon: 'transactions', activePrefix: '/admin/transactions' },
]

const kasirMenus = [
  { groupLabel: 'KASIR' },
  { to: '/admin/queue', label: 'Antrian Pemesanan', icon: 'dashboard', activePrefix: '/admin/queue' },
  { to: '/admin/transactions', label: 'Riwayat Transaksi', icon: 'transactions', activePrefix: '/admin/transactions' },
]

const guestMenus = [
  { to: '/product', label: 'Menu', icon: 'product', activePrefix: '/product' },
  { to: '/cart', label: 'Keranjang', icon: 'cart', badge: true, activePrefix: '/cart' },
]

function MenuIcon({ name }) {
  const icons = {
    dashboard: (
      <path d="M3.75 3.75h7.5v7.5h-7.5zM12.75 3.75h7.5v4.5h-7.5zM12.75 9.75h7.5v10.5h-7.5zM3.75 12.75h7.5v7.5h-7.5z" />
    ),
    product: (
      <path d="M3.75 7.5 12 3.75l8.25 3.75L12 11.25 3.75 7.5Zm0 3.75L12 15l8.25-3.75M3.75 15 12 18.75 20.25 15" />
    ),
    category: (
      <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.595.33a18.095 18.095 0 005.223-5.223c.542-.815.369-1.896-.33-2.595L9.568 3z" />
    ),
    table: (
      <path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-7.5M3.375 4.5h17.25m-17.25 0A1.125 1.125 0 012.25 5.625M3.375 4.5h1.5A1.125 1.125 0 006 5.625m0 0v7.5m0-7.5h9m0 0A1.125 1.125 0 0116.5 5.625M15 4.5h1.5c.621 0 1.125.504 1.125 1.125m0 0v7.5m0 0a1.125 1.125 0 01-1.125 1.125M18.375 13.5H6m12.375 0h-1.5c-.621 0-1.125.504-1.125 1.125M6 13.5a1.125 1.125 0 011.125 1.125M6 13.5H4.875m0 0A1.125 1.125 0 013.75 14.625M7.125 14.625v4.875m9.75-4.875v4.875" />
    ),
    transactions: (
      <path d="M3.75 8.25h12m0 0L13.5 6m2.25 2.25L13.5 10.5M20.25 15.75h-12m0 0 2.25-2.25M8.25 15.75 10.5 18" />
    ),
    cart: (
      <path d="M6.75 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm10.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm2.25-6.75h-15L3.75 3.75h18l-1.5 7.5Z" />
    ),
    analytics: (
      <path d="M3.75 18.75h16.5M6.75 15v-3.75m4.5 3.75V8.25m4.5 6.75V6m4.5 9v-4.5" />
    ),
    profile: (
      <path d="M12 12a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Zm-6 7.5a6 6 0 1 1 12 0H6Z" />
    ),
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(getCartCount())
    const handleStorageChange = () => setCartCount(getCartCount())
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [location])

  const menus = isGuest() ? guestMenus : (getRole() === 'KASIR' ? kasirMenus : adminMenus)

  function handleLogout() {
    if (isGuest()) {
      clearGuestToken()
    } else {
      clearToken()
    }
    navigate('/login', { replace: true })
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src={gadocaaLogo} alt="Gadocaa logo" className="brand-logo" />
        <h1>Gadocaa</h1>
      </div>
      <div>
        <p className="sidebar-subtitle">Gadocaa Stylee</p>
      </div>

      <nav>
        {menus.map((menu, index) =>
          menu.groupLabel ? (
            <p
              key={`group-${index}`}
              style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                color: '#6b7280',
                marginTop: '1.25rem',
                marginBottom: '0.4rem',
                marginLeft: '1rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {menu.groupLabel}
            </p>
          ) : (
            <NavLink
              key={menu.to}
              to={menu.to}
              className={({ isActive }) => {
                if (menu.to === '/' && !menu.activePrefix) {
                  return location.pathname === '/' ? 'active' : ''
                }
                const active = menu.activePrefix
                  ? location.pathname.startsWith(menu.activePrefix)
                  : isActive
                return active ? 'active' : ''
              }}
              style={{ position: 'relative' }}
            >
              <span className="nav-icon">
                <MenuIcon name={menu.icon} />
              </span>
              <span>{menu.label}</span>
              {menu.badge && cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </NavLink>
          )
        )}
      </nav>

      <div style={{ marginTop: 'auto', paddingBottom: '16px' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            padding: '12px 14px',
            background: '#ffffff',
            border: '1px solid #fca5a5',
            color: '#ef4444',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '99px',
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.15)',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.25)'
            e.currentTarget.style.background = '#fef2f2'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(239, 68, 68, 0.15)'
            e.currentTarget.style.background = '#ffffff'
          }}
        >
          <span className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </span>
          Keluar
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
