import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import gadocaaLogo from '../assets/gadocaa-logo.png'
import { getCartCount } from '../lib/cartStore'
import { isGuest } from '../lib/auth'

const adminMenus = [
  { to: '/dashboard/overview', label: 'Dashboard', icon: 'dashboard', activePrefix: '/dashboard' },
  { to: '/product', label: 'Menu', icon: 'product' },
  { to: '/transactions', label: 'Pesanan', icon: 'transactions' },
  { to: '/cart', label: 'Keranjang', icon: 'cart', badge: true },
  { to: '/analytics', label: 'Analitik', icon: 'analytics' },
  { to: '/user-profile', label: 'Profil', icon: 'profile' },
]

const guestMenus = [
  { to: '/dashboard/overview', label: 'Dashboard', icon: 'dashboard', activePrefix: '/dashboard' },
  { to: '/product', label: 'Menu', icon: 'product' },
  { to: '/cart', label: 'Keranjang', icon: 'cart', badge: true },
]

function MenuIcon({ name }) {
  const icons = {
    dashboard: (
      <path d="M3.75 3.75h7.5v7.5h-7.5zM12.75 3.75h7.5v4.5h-7.5zM12.75 9.75h7.5v10.5h-7.5zM3.75 12.75h7.5v7.5h-7.5z" />
    ),
    product: (
      <path d="M3.75 7.5 12 3.75l8.25 3.75L12 11.25 3.75 7.5Zm0 3.75L12 15l8.25-3.75M3.75 15 12 18.75 20.25 15" />
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
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Update cart count on mount and when navigating
    setCartCount(getCartCount())
    
    // Listen for storage changes
    const handleStorageChange = () => {
      setCartCount(getCartCount())
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [location])

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
        {(isGuest() ? guestMenus : adminMenus).map((menu) => (
          <NavLink
            key={menu.to}
            to={menu.to}
            className={({ isActive }) => {
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
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
