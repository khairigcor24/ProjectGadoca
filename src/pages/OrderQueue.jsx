import { useState } from 'react'

function ClockIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function CheckIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const INITIAL_QUEUE = [
  {
    id: 'ORD-8F92',
    table: 'Meja 5',
    items: ['2x Kopi Susu Aren', '1x Roti Bakar Coklat'],
    time: '14:22',
    status: 'NEW',
  },
  {
    id: 'ORD-7A11',
    table: 'Meja 2',
    items: ['1x Espresso', '1x Cheesecake'],
    time: '14:25',
    status: 'NEW',
  },
  {
    id: 'ORD-6B33',
    table: 'Meja 10',
    items: ['3x Americano Dingin', '2x Kentang Goreng'],
    time: '14:10',
    status: 'PREPARING',
  },
]

function OrderQueue() {
  const [queue, setQueue] = useState(INITIAL_QUEUE)

  function moveOrder(id, newStatus) {
    setQueue((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    )
  }

  const newOrders = queue.filter((o) => o.status === 'NEW')
  const preparingOrders = queue.filter((o) => o.status === 'PREPARING')

  return (
    <div className="cat-page" style={{ padding: '0 0 40px' }}>
      <div className="cat-page__header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="cat-page__title" style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>Antrian Pemesanan</h2>
          <p className="cat-page__subtitle" style={{ color: 'var(--cafe-muted)' }}>
            Pantau dan kelola pesanan pelanggan yang sedang aktif.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Kolom Pesanan Masuk */}
        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cafe-ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pesanan Baru
            </h3>
            <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
              {newOrders.length}
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {newOrders.map((order) => (
              <div key={order.id} className="panel" style={{ padding: '16px', cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                    {order.id}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                    <ClockIcon size={14} /> {order.time}
                  </span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>
                  {order.table}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '13.5px', color: '#475569', lineHeight: '1.6' }}>
                  {order.items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#0ea5e9' }}>•</span> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => moveOrder(order.id, 'PREPARING')}
                  className="btn-primary"
                  style={{ width: '100%', borderRadius: '8px', padding: '10px', background: '#0ea5e9', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.25)', border: 'none' }}
                >
                  Proses Pesanan
                </button>
              </div>
            ))}
            {newOrders.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: '14px' }}>
                Belum ada pesanan baru
              </div>
            )}
          </div>
        </div>

        {/* Kolom Sedang Disiapkan */}
        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cafe-ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Sedang Disiapkan
            </h3>
            <span style={{ background: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
              {preparingOrders.length}
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {preparingOrders.map((order) => (
              <div key={order.id} className="panel" style={{ padding: '16px', cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                    {order.id}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                    <ClockIcon size={14} /> {order.time}
                  </span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>
                  {order.table}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '13.5px', color: '#475569', lineHeight: '1.6' }}>
                  {order.items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#0ea5e9' }}>•</span> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => moveOrder(order.id, 'DONE')}
                  className="btn-primary"
                  style={{ width: '100%', borderRadius: '8px', padding: '10px', background: '#10b981', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)', border: 'none', display: 'flex', justifyContent: 'center', gap: '8px' }}
                >
                  <CheckIcon /> Pesanan Selesai
                </button>
              </div>
            ))}
            {preparingOrders.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: '14px' }}>
                Tidak ada pesanan diproses
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default OrderQueue
