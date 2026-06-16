import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gadocaaLogo from '../assets/gadocaa-logo.png'
import { setToken, setGuestToken } from '../lib/auth'

const LOGIN_URL = 'https://reqres.in/api/login'
const DEMO_EMAIL = 'gadocaa@gmail.com'
const DEMO_PASSWORD = 'gadocaa123'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard/overview'

  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setToken('gadocaa-demo-token')
        navigate(from, { replace: true })
        return
      }

      const { data } = await axios.post(LOGIN_URL, { email, password })
      if (data?.token) {
        setToken(data.token)
        navigate(from, { replace: true })
      }
    } catch {
      setError('Login gagal. Periksa email dan password.')
    } finally {
      setLoading(false)
    }
  }

  function handleGuestLogin() {
    setGuestToken('guest-' + Date.now())
    navigate('/product', { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-card login-card--cafe">
        <header className="login-hero">
          <div className="login-logo-ring">
            <img src={gadocaaLogo} alt="Gadocaa" className="login-logo" width={72} height={72} />
          </div>
          <h1 className="login-title">Gadocaa</h1>
          <p className="login-tagline">Gadocaa Stylee</p>
          <p className="login-welcome">Selamat datang kembali · masuk ke ruang admin Anda</p>
          <span className="login-divider" aria-hidden="true" />
        </header>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="login-error">{error}</p> : null}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Memproses…' : 'Masuk'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>atau</p>
          <button
            type="button"
            onClick={handleGuestLogin}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#059669')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#10b981')}
          >
            Masuk sebagai Tamu
          </button>
        </div>

        <p className="login-hint">
          Gadocaa: {DEMO_EMAIL} / {DEMO_PASSWORD}
          <br />
          ReqRes (Axios): eve.holt@reqres.in / cityslicka
        </p>
      </div>
    </div>
  )
}

export default Login
