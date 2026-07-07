import { useState } from 'react'

function ReceiptIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 14h.01M8 14h4M16 10h.01M8 10h4M16 6h.01M8 6h4" />
    </svg>
  )
}

function MoneyBagIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  )
}

function FilterIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function ChevronDownIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const DUMMY_TRANSACTIONS = [
  { id: 'ORD-2E8601', date: '30 Jun 2026, 20:54', customer: 'deo', table: 'NO 10', total: 'Rp 22.000' },
  { id: 'ORD-15EF81', date: '30 Jun 2026, 20:54', customer: 'Deo Fahreza', table: 'NO 1', total: 'Rp 17.000' },
  { id: 'ORD-100077', date: '09 Jun 2026, 14:02', customer: 'Deo Fahreza', table: 'NO 1', total: 'Rp 27.000' },
  { id: 'ORD-9544D5', date: '05 Jun 2026, 20:06', customer: 'Arzana', table: 'NO 10', total: 'Rp 4.027.000' },
  { id: 'ORD-EC2E93', date: '05 Jun 2026, 20:01', customer: 'Kita Ngoding', table: 'NO 10', total: 'Rp 47.000' },
]

function Transactions() {
  const [transactions] = useState(DUMMY_TRANSACTIONS)

  return (
    <div className="cat-page" style={{ padding: '0 0 40px' }}>
      <div className="cat-page__header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="cat-page__title" style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>Riwayat Transaksi</h2>
          <p className="cat-page__subtitle" style={{ color: 'var(--cafe-muted)' }}>
            Seluruh daftar pesanan yang telah selesai diproses.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ReceiptIcon size={24} />
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', marginBottom: '4px', textTransform: 'uppercase' }}>TOTAL PESANAN</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--cafe-ink)', margin: 0 }}>16</h3>
          </div>
        </div>

        <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MoneyBagIcon size={24} />
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', marginBottom: '4px', textTransform: 'uppercase' }}>TOTAL PENDAPATAN</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--cafe-ink)', margin: 0 }}>Rp 335.028.000</h3>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: '24px', padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>DARI TANGGAL</label>
          <input type="date" className="form-input" style={{ width: '100%', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0' }} />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>SAMPAI TANGGAL</label>
          <input type="date" className="form-input" style={{ width: '100%', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px', flex: '0 0 auto' }}>
          <button className="btn-primary" style={{ background: '#0ea5e9', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.25)', borderRadius: '8px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FilterIcon /> Terapkan
          </button>
          <button className="btn-outline" style={{ background: '#f1f5f9', border: 'none', color: '#475569', borderRadius: '8px', padding: '10px 20px', boxShadow: 'none' }}>
            Reset
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ padding: '16px 24px', background: 'transparent', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'left' }}>WAKTU SELESAI</th>
                <th style={{ padding: '16px 0', background: 'transparent', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'left' }}>ID PESANAN</th>
                <th style={{ padding: '16px 0', background: 'transparent', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'left' }}>PELANGGAN</th>
                <th style={{ padding: '16px 0', background: 'transparent', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'left' }}>MEJA</th>
                <th style={{ padding: '16px 0', background: 'transparent', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'left' }}>TOTAL</th>
                <th style={{ padding: '16px 24px', background: 'transparent', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'right' }}>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, index) => (
                <tr key={index}>
                  <td style={{ paddingLeft: '24px', color: '#64748b' }}>{trx.date}</td>
                  <td>
                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                      {trx.id}
                    </span>
                  </td>
                  <td style={{ color: 'var(--cafe-ink)' }}>{trx.customer}</td>
                  <td style={{ color: '#64748b' }}>{trx.table}</td>
                  <td style={{ fontWeight: 600, color: 'var(--cafe-ink)' }}>{trx.total}</td>
                  <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#0ea5e9', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      Lihat <ChevronDownIcon size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Transactions
