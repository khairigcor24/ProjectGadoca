import { useState } from 'react'
import { PlusIcon } from '../components/Icons'
import { QRCodeSVG } from 'qrcode.react'

function QRIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M6 6h1v1H6zM17 6h1v1h-1zM17 17h1v1h-1zM6 17h1v1H6z" />
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

// Create base URL for cart page
const BASE_URL = window.location.origin + '/cart?table='

const DUMMY_TABLES = [
  { id: 1, name: 'NO 1', url: BASE_URL + 'NO 1', status: 'Aktif' },
  { id: 2, name: 'NO 10', url: BASE_URL + 'NO 10', status: 'Aktif' },
  { id: 3, name: 'NO 5', url: BASE_URL + 'NO 5', status: 'Aktif' },
  { id: 4, name: 'NO 7', url: BASE_URL + 'NO 7', status: 'Aktif' },
  { id: 5, name: 'NO 8', url: BASE_URL + 'NO 8', status: 'Aktif' },
  { id: 6, name: 'NO 9', url: BASE_URL + 'NO 9', status: 'Aktif' },
]

function Tables() {
  const [tables, setTables] = useState(DUMMY_TABLES)
  const [newTableName, setNewTableName] = useState('')
  const [selectedQR, setSelectedQR] = useState(null)

  function handleAddTable(e) {
    e.preventDefault()
    if (!newTableName.trim()) return
    const name = newTableName.trim().toUpperCase()
    setTables((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        url: BASE_URL + name,
        status: 'Aktif',
      },
    ])
    setNewTableName('')
  }

  function handleDeleteTable(id) {
    setTables((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="tables-page">
      <div className="cat-page__header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="cat-page__title" style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>Meja &amp; QR Code</h2>
          <p className="cat-page__subtitle" style={{ color: 'var(--cafe-muted)' }}>
            Kelola meja dan QR code untuk pemesanan pelanggan.
          </p>
        </div>
      </div>

      <div className="tables-layout">
        {/* Left Form */}
        <div className="tables-sidebar panel">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', color: 'var(--cafe-ink)' }}>Tambah Meja Baru</h3>
          <form onSubmit={handleAddTable}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--cafe-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                NOMOR MEJA <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                style={{ width: '100%', borderRadius: '8px' }}
                placeholder="CONTOH: A1, B2, VIP1"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value.toUpperCase())}
                maxLength={10}
                required
              />
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                Maks 10 karakter, otomatis kapital.
              </p>
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', borderRadius: '8px', background: '#0ea5e9', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.25)' }}
            >
              <PlusIcon size={16} /> Tambah Meja
            </button>
          </form>
        </div>

        {/* Right Table */}
        <div className="tables-main panel" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: '24px', background: 'transparent' }}>MEJA</th>
                  <th style={{ background: 'transparent' }}>URL QR</th>
                  <th style={{ background: 'transparent' }}>STATUS</th>
                  <th style={{ textAlign: 'right', paddingRight: '24px', background: 'transparent' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {tables.map((table) => (
                  <tr key={table.id}>
                    <td style={{ paddingLeft: '24px', fontWeight: 600 }}>{table.name}</td>
                    <td style={{ color: '#94a3b8', fontSize: '13.5px' }}>{table.url}</td>
                    <td>
                      <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', background: '#059669', borderRadius: '50%' }} />
                        {table.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn-outline" 
                          style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '6px', gap: '6px' }}
                          onClick={() => setSelectedQR(table)}
                        >
                          <QRIcon /> QR
                        </button>
                        <button 
                          className="btn-outline" 
                          style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '6px', gap: '6px' }}
                          onClick={() => handleDeleteTable(table.id)}
                        >
                          <TrashIcon /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedQR && (
        <div className="cat-modal-overlay" onClick={() => setSelectedQR(null)}>
          <div className="cat-modal cat-modal--sm" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', padding: '32px' }}>
            <div className="cat-modal__header" style={{ borderBottom: 'none', paddingBottom: '0', justifyContent: 'center' }}>
              <h3 className="cat-modal__title" style={{ fontSize: '1.25rem' }}>QR Code - Meja {selectedQR.name}</h3>
              <button type="button" className="cat-modal__close" style={{ position: 'absolute', right: '16px', top: '16px' }} onClick={() => setSelectedQR(null)}>✕</button>
            </div>
            
            <div style={{ margin: '32px 0', display: 'flex', justifyContent: 'center' }}>
              <div style={{ padding: '16px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <QRCodeSVG value={selectedQR.url} size={200} />
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--cafe-muted)', wordBreak: 'break-all', marginBottom: '24px' }}>
              {selectedQR.url}
            </p>

            <button type="button" className="btn-primary" style={{ width: '100%' }} onClick={() => setSelectedQR(null)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tables
