import { useState } from 'react'

function UserIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}

function TrashIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}

const INITIAL_USERS = [
  { id: 1, name: 'Admin Manajemen', username: 'admin', role: 'ADMIN' },
  { id: 2, name: 'Kasir Utama', username: 'kasir', role: 'KASIR' },
]

function Cashiers() {
  const [users, setUsers] = useState(INITIAL_USERS)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'KASIR',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSave(e) {
    e.preventDefault()
    if (!formData.name || !formData.username || !formData.password) return
    setUsers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: formData.name,
        username: formData.username,
        role: formData.role,
      },
    ])
    setFormData({ name: '', username: '', password: '', role: 'KASIR' })
  }

  function handleDelete(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div className="tables-page">
      <div className="cat-page__header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="cat-page__title" style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>Manajemen Akun</h2>
          <p className="cat-page__subtitle" style={{ color: 'var(--cafe-muted)' }}>
            Kelola akun akses untuk Admin dan Kasir.
          </p>
        </div>
      </div>

      <div className="tables-layout">
        {/* Left Form */}
        <div className="tables-sidebar panel">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', color: 'var(--cafe-ink)' }}>Tambah Akun Baru</h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: 'var(--cafe-muted)', marginBottom: '8px' }}>
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                className="form-input"
                style={{ width: '100%', borderRadius: '8px', padding: '10px 14px' }}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: 'var(--cafe-muted)', marginBottom: '8px' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form-input"
                style={{ width: '100%', borderRadius: '8px', padding: '10px 14px', background: formData.username ? '#eff6ff' : 'var(--cafe-paper)' }}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: 'var(--cafe-muted)', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-input"
                style={{ width: '100%', borderRadius: '8px', padding: '10px 14px', background: formData.password ? '#eff6ff' : 'var(--cafe-paper)' }}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: 'var(--cafe-muted)', marginBottom: '8px' }}>
                Role Akses
              </label>
              <select
                name="role"
                className="form-input"
                style={{ width: '100%', borderRadius: '8px', padding: '10px 14px' }}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="ADMIN">Admin</option>
                <option value="KASIR">Kasir</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', borderRadius: '8px', marginTop: '8px', background: '#0284c7', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)' }}
            >
              Simpan Akun
            </button>
          </form>
        </div>

        {/* Right Table */}
        <div className="tables-main panel" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: '24px', background: 'transparent' }}>PENGGUNA</th>
                  <th style={{ background: 'transparent' }}>USERNAME</th>
                  <th style={{ background: 'transparent' }}>ROLE</th>
                  <th style={{ textAlign: 'right', paddingRight: '24px', background: 'transparent' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ paddingLeft: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <UserIcon size={18} />
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--cafe-ink)' }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#64748b', fontSize: '14px' }}>{user.username}</td>
                    <td>
                      {user.role === 'ADMIN' ? (
                        <span style={{ background: '#f3e8ff', color: '#9333ea', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>
                          ADMIN
                        </span>
                      ) : (
                        <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>
                          KASIR
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                      <button 
                        style={{ padding: '8px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#fca5a5' }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#fee2e2' }}
                        onClick={() => handleDelete(user.id)}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cashiers
