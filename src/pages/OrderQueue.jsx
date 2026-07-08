import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

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

function BellIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  )
}

function OrderQueue() {
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(true)

  // Alert modal untuk pesanan baru
  const [newOrderAlert, setNewOrderAlert] = useState(null)

  useEffect(() => {
    fetchOrders()

    // Subscribe to realtime orders
    const channel = supabase
      .channel('orders_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const newOrder = payload.new
          setQueue((prev) => [newOrder, ...prev])
          
          // Show Modal & Play TTS
          playTTS(newOrder)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchOrders() {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .neq('status', 'DONE') // Hanya ambil yg belum selesai
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setQueue(data)
    }
    setLoading(false)
  }

  function playTTS(order) {
    if ('speechSynthesis' in window) {
      // Hentikan antrian suara sebelumnya jika masih ada
      window.speechSynthesis.cancel()

      const text = `Ada pesanan baru dari meja ${order.table_number}, atas nama ${order.customer_name}.`
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID' // Bahasa Indonesia
      
      utterance.onstart = () => {
        setNewOrderAlert(order)
      }
      utterance.onend = () => {
        setTimeout(() => setNewOrderAlert(null), 1000) // Tunggu sebentar lalu tutup
      }
      utterance.onerror = () => {
        setNewOrderAlert(order)
        setTimeout(() => setNewOrderAlert(null), 4000)
      }
      window.speechSynthesis.speak(utterance)
    } else {
      // Jika browser tidak mendukung TTS, tampilkan modal 4 detik saja
      setNewOrderAlert(order)
      setTimeout(() => setNewOrderAlert(null), 4000)
    }
  }

  async function moveOrder(id, newStatus) {
    // Update local state for immediate feedback
    setQueue((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    )
    
    // Update Supabase
    await supabase.from('orders').update({ status: newStatus }).eq('id', id)
  }

  const newOrders = queue.filter((o) => o.status === 'NEW')
  const preparingOrders = queue.filter((o) => o.status === 'PREPARING')

  return (
    <div className="cat-page" style={{ padding: '0 0 40px' }}>
      <div className="cat-page__header" style={{ marginBottom: '24px', position: 'relative' }}>
        <div>
          <h2 className="cat-page__title" style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>Antrian Pemesanan</h2>
          <p className="cat-page__subtitle" style={{ color: 'var(--cafe-muted)' }}>
            Pantau dan kelola pesanan pelanggan yang sedang aktif.
          </p>
        </div>

        {/* Custom Order Notification Modal */}
        {newOrderAlert && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              background: 'white', borderRadius: '24px', padding: '40px 32px',
              width: '90%', maxWidth: '420px', textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%', background: '#e0f2fe',
                color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <BellIcon size={36} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1e293b', margin: '0 0 12px 0' }}>Pesanan Baru!</h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', margin: '0 0 24px 0', lineHeight: 1.5 }}>
                Orderan masuk dari <strong style={{ color: '#0ea5e9' }}>{newOrderAlert.table_number}</strong><br/>
                atas nama <strong style={{ color: '#1e293b' }}>{newOrderAlert.customer_name}</strong>.
              </p>
              
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span className="tts-dot" style={{ animationDelay: '0s' }}></span>
                  <span className="tts-dot" style={{ animationDelay: '0.2s' }}></span>
                  <span className="tts-dot" style={{ animationDelay: '0.4s' }}></span>
                </div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: '#64748b', margin: 0, textTransform: 'uppercase' }}>
                  Sedang membacakan pesanan...
                </p>
              </div>
            </div>
          </div>
        )}
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .tts-dot {
            width: 10px; height: 10px; border-radius: 50%;
            background-color: #38bdf8;
            animation: pulse 1.4s infinite ease-in-out both;
          }
          @keyframes pulse {
            0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}} />
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
                    <ClockIcon size={14} /> 
                    {new Date(order.created_at || new Date()).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>
                  {order.table_number || order.table}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '13.5px', color: '#475569', lineHeight: '1.6' }}>
                  {order.items.map((item, idx) => {
                    const label = typeof item === 'string' ? item : `${item.quantity}x ${item.title}`
                    return (
                      <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ color: '#0ea5e9' }}>•</span> {label}
                      </li>
                    )
                  })}
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
                    <ClockIcon size={14} /> 
                    {new Date(order.created_at || new Date()).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--cafe-ink)', marginBottom: '8px' }}>
                  {order.table_number || order.table}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '13.5px', color: '#475569', lineHeight: '1.6' }}>
                  {order.items.map((item, idx) => {
                    const label = typeof item === 'string' ? item : `${item.quantity}x ${item.title}`
                    return (
                      <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ color: '#0ea5e9' }}>•</span> {label}
                      </li>
                    )
                  })}
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
