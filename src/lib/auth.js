const TOKEN_KEY = 'gadocaa_token'
const GUEST_TOKEN_KEY = 'gadocaa_guest_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token, role = 'ADMIN') {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem('gadocaa_role', role)
  // Clear guest token when admin logs in
  localStorage.removeItem(GUEST_TOKEN_KEY)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem('gadocaa_role')
}

export function getRole() {
  return localStorage.getItem('gadocaa_role') || 'ADMIN'
}

export function getGuestToken() {
  return localStorage.getItem(GUEST_TOKEN_KEY)
}

export function setGuestToken(token) {
  localStorage.setItem(GUEST_TOKEN_KEY, token)
  // Clear admin token when guest logs in
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem('gadocaa_role')
}

export function clearGuestToken() {
  localStorage.removeItem(GUEST_TOKEN_KEY)
}

export function isGuest() {
  return !!getGuestToken() && !getToken()
}

export function isAuthenticated() {
  return !!getToken() || !!getGuestToken()
}
