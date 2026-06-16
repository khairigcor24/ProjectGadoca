import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getToken, getGuestToken, isGuest } from '../lib/auth'

function ProtectedRoute() {
  const location = useLocation()
  const adminToken = getToken()
  const guestToken = getGuestToken()

  // Guest can only access product, cart, and product detail pages
  const guestAllowedPaths = ['/product', '/cart']
  const isGuestAllowed = guestAllowedPaths.some((path) => location.pathname.startsWith(path))

  // Admin or authenticated user
  if (adminToken) {
    return <Outlet />
  }

  // Guest user with limited access
  if (guestToken && isGuestAllowed) {
    return <Outlet />
  }

  // No authentication at all
  if (!adminToken && !guestToken) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Guest trying to access admin pages
  return <Navigate to="/product" replace />
}

export default ProtectedRoute
