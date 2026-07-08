import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

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

function ChevronDownIcon({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [expandedRow, setExpandedRow] = useState(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions() {
    setLoading(true)
    let query = supabase
      .from('orders')
      .select('*')
      .eq('status', 'DONE')
      .order('created_at', { ascending: false })

    if (startDate) {
      // Supabase TIMESTAMPTZ filter
      query = query.gte('created_at', `${startDate}T00:00:00Z`)
    }
    if (endDate) {
      query = query.lte('created_at', `${endDate}T23:59:59Z`)
    }
    
    const { data, error } = await query
    
    if (!error && data) {
      setTransactions(data)
    }
    setLoading(false)
  }

  function handleReset() {
    setStartDate('')
    setEndDate('')
    fetchTransactionsReset()
  }

  async function fetchTransactionsReset() {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'DONE')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setTransactions(data)
    }
    setLoading(false)
  }

  // Calculate totals
  const totalPesanan = transactions.length
  const totalPendapatan = transactions.reduce((sum, trx) => sum + Number(trx.total_amount), 0)
  const formattedPendapatan = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalPendapatan)

  function toggleRow(id) {
    if (expandedRow === id) {
      setExpandedRow(null)
    } else {
      setExpandedRow(id)
    }
  }

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
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--cafe-ink)', margin: 0 }}>{totalPesanan}</h3>
          </div>
        </div>

        <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MoneyBagIcon size={24} />
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', letterSpacing: '0.05em', marginBottom: '4px', textTransform: 'uppercase' }}>TOTAL PENDAPATAN</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--cafe-ink)', margin: 0 }}>{formattedPendapatan}</h3>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: '24px', padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>DARI TANGGAL</label>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-input" 
            style={{ width: '100%', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0' }} 
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--cafe-muted)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>SAMPAI TANGGAL</label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-input" 
            style={{ width: '100%', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0' }} 
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', flex: '0 0 auto' }}>
          <button onClick={fetchTransactions} className="btn-primary" style={{ background: '#0ea5e9', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.25)', borderRadius: '8px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
            <FilterIcon /> Terapkan
          </button>
          <button onClick={handleReset} className="btn-outline" style={{ background: '#f1f5f9', border: 'none', color: '#475569', borderRadius: '8px', padding: '10px 20px', boxShadow: 'none', cursor: 'pointer' }}>
            Reset
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: '0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Memuat riwayat transaksi...</div>
        ) : (
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
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Tidak ada transaksi ditemukan</td>
                  </tr>
                )}
                {transactions.map((trx) => (
                  <React.Fragment key={trx.id}>
                    <tr style={{ borderBottom: expandedRow === trx.id ? 'none' : '1px solid #f1f5f9' }}>
                      <td style={{ paddingLeft: '24px', color: '#64748b' }}>
                        {new Date(trx.created_at).toLocaleString('id-ID', {
                          day: '2-digit', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td>
                        <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                          {trx.id}
                        </span>
                      </td>
                      <td style={{ color: 'var(--cafe-ink)' }}>{trx.customer_name || '-'}</td>
                      <td style={{ color: '#64748b' }}>{trx.table_number || '-'}</td>
                      <td style={{ fontWeight: 600, color: 'var(--cafe-ink)' }}>
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(trx.total_amount)}
                      </td>
                      <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                        <button 
                          onClick={() => toggleRow(trx.id)}
                          style={{ background: 'transparent', border: 'none', color: '#0ea5e9', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          Lihat 
                          <ChevronDownIcon 
                            size={14} 
                            style={{ 
                              transform: expandedRow === trx.id ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s'
                            }} 
                          />
                        </button>
                      </td>
                    </tr>
                    {expandedRow === trx.id && (
                      <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                        <td colSpan="6" style={{ padding: '16px 24px' }}>
                          <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                            <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cafe-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Daftar Pesanan:</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {trx.items && trx.items.length > 0 ? (
                                trx.items.map((item, idx) => {
                                  const label = typeof item === 'string' ? item : `${item.quantity}x ${item.title}`
                                  const price = typeof item === 'object' && item.price ? ` - Rp ${(item.quantity * item.price).toLocaleString('id-ID')}` : ''
                                  return (
                                    <li key={idx} style={{ padding: '6px 0', borderBottom: idx !== trx.items.length - 1 ? '1px solid #f1f5f9' : 'none', color: 'var(--cafe-ink)', fontSize: '13.5px' }}>
                                      <span style={{ color: '#0ea5e9', marginRight: '8px' }}>•</span> 
                                      {label}
                                      <span style={{ color: '#64748b', fontSize: '12.5px' }}>{price}</span>
                                    </li>
                                  )
                                })
                              ) : (
                                <li style={{ color: '#94a3b8', fontSize: '13px' }}>Tidak ada detail item</li>
                              )}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions
