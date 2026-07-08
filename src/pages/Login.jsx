import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gadocaaLogo from '../assets/gadocaa-logo.png'
import { supabase } from '../lib/supabase'
import { setToken, setGuestToken } from '../lib/auth'

const DEMO_EMAIL = 'gadocaa@gmail.com'
const DEMO_PASSWORD = 'gadocaa123'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard/overview'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single()

      if (error || !user) {
        setError('Login gagal. Periksa email dan password.')
      } else {
        // Set token (bisa pakai user.id sebagai token dummy)
        setToken(`gadocaa-${user.role.toLowerCase()}-token`, user.role)
        
        if (user.role === 'KASIR') {
          navigate('/admin/queue', { replace: true })
        } else {
          navigate(from, { replace: true })
        }
      }
    } catch {
      setError('Terjadi kesalahan jaringan.')
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
      <div 
        className="login-card login-card--cafe"
        style={{
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'slideUpFade 0.6s ease-out forwards'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 24px 56px var(--cafe-warm-shadow)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 20px 48px var(--cafe-warm-shadow)'
        }}
      >
        <header className="login-hero">
          <div 
            className="login-logo-ring"
            style={{ animation: 'float 4s ease-in-out infinite' }}
          >
            <img src={gadocaaLogo} alt="Gadocaa" className="login-logo" width={72} height={72} />
          </div>
          <h1 className="login-title" style={{ transition: 'color 0.3s' }}>Gadocaa</h1>
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
          {error ? <p className="login-error" style={{ animation: 'shake 0.4s ease-in-out' }}>{error}</p> : null}
          <button 
            type="submit" 
            className="login-submit btn-primary" 
            disabled={loading}
            style={{
              transition: 'transform 0.2s, box-shadow 0.2s',
              borderRadius: '99px',
              padding: '12px 24px',
              border: 'none',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={e => {
              if(!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)'
              }
            }}
            onMouseLeave={e => {
              if(!loading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            {loading ? 'Memproses…' : 'Masuk'}
          </button>
        </form>

        <style>{`
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
        `}</style>

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
              borderRadius: '99px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Masuk sebagai Tamu
          </button>
        </div>

        <p className="login-hint">
          Gadocaa (Admin): {DEMO_EMAIL} / {DEMO_PASSWORD}
          <br />
          Gadocaa (Kasir): kasir@gmail.com / kasir123
        </p>
      </div>
    </div>
  )
}

export default Login
