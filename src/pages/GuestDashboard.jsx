import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { getGuestOrders, formatOrderTotal } from '../lib/guestOrderStore'
import { getCartCount, getCartTotal } from '../lib/cartStore'
import { formatMenuPrice, getCustomMenus } from '../lib/menuStore'

const FEATURED_MENU_LIMIT = 6
const RECENT_ORDERS_LIMIT = 5

function formatOrderDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function summarizeItems(items) {
  if (!items?.length) return '—'
  const first = items[0]
  if (items.length === 1) return `${first.title} x${first.quantity}`
  return `${first.title} +${items.length - 1} item`
}

function getPaymentMethodLabel(method) {
  const methods = {
    cash: 'Tunai',
    qris: 'QRIS',
    bank: 'Transfer',
  }
  return methods[method] || method || '—'
}

function GuestDashboard() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [featuredMenus, setFeaturedMenus] = useState([])
  const [menuLoading, setMenuLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    setOrders(getGuestOrders())
    setCartCount(getCartCount())
    setCartTotal(getCartTotal())

    const customMenus = getCustomMenus()

    axios
      .get('')
      .then((response) => {
        const apiProducts = Array.isArray(response.data?.products)
          ? response.data.products
          : []
        setFeaturedMenus([...customMenus, ...apiProducts].slice(0, FEATURED_MENU_LIMIT))
      })
      .catch(() => {
        setFeaturedMenus(customMenus.slice(0, FEATURED_MENU_LIMIT))
      })
      .finally(() => setMenuLoading(false))
  }, [])

  const pendingCount = orders.filter((order) => order.status === 'Pending').length
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0)
  const recentOrders = orders.slice(0, RECENT_ORDERS_LIMIT)

  const stats = [
    { label: 'Total Pesanan', value: String(orders.length) },
    { label: 'Menunggu', value: String(pendingCount) },
    { label: 'Total Belanja', value: formatOrderTotal(totalSpent) },
    { label: 'Item Keranjang', value: String(cartCount) },
  ]

  return (
    <div className="page-stack">
      <section
        className="hero-banner"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            padding: '2rem 3rem',
            maxWidth: '560px',
          }}
        >
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
            Selamat datang di Gadocaa
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 'bold',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Pesan kopi & makanan favorit Anda
          </h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate('/product')}
            >
              Lihat Menu
            </button>
            <button
              type="button"
              className="btn-outline"
              style={{ color: 'white', borderColor: 'white' }}
              onClick={() => navigate('/cart')}
            >
              Keranjang{cartCount > 0 ? ` (${cartCount})` : ''}
            </button>
          </div>
          {cartCount > 0 && (
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.9 }}>
              Keranjang aktif: {formatOrderTotal(cartTotal)}
            </p>
          )}
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((item) => (
          <article key={item.label} className="stat-card">
            <p>{item.label}</p>
            <h3>{item.value}</h3>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="table-head">
          <h3>Pesanan Saya</h3>
          {orders.length > RECENT_ORDERS_LIMIT && (
            <span style={{ fontSize: '0.875rem', color: 'var(--cafe-muted)' }}>
              {orders.length} pesanan total
            </span>
          )}
        </div>
        {recentOrders.length === 0 ? (
          <p className="empty-state">
            Belum ada pesanan.{' '}
            <Link to="/product" style={{ color: 'var(--cafe-olive-dark)' }}>
              Mulai belanja
            </Link>
          </p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Total</th>
                  <th>Bayar</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{summarizeItems(order.items)}</td>
                    <td>{formatOrderTotal(order.total)}</td>
                    <td>{getPaymentMethodLabel(order.paymentMethod)}</td>
                    <td>{formatOrderDate(order.createdAt)}</td>
                    <td>
                      <span className={`badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <div className="table-head">
          <h3>Menu Populer</h3>
          <Link to="/product" style={{ fontSize: '0.875rem', color: 'var(--cafe-olive-dark)' }}>
            Lihat semua menu
          </Link>
        </div>
        {menuLoading ? (
          <p className="empty-state">Memuat menu…</p>
        ) : featuredMenus.length === 0 ? (
          <p className="empty-state">Menu belum tersedia.</p>
        ) : (
          <div className="menu-grid">
            {featuredMenus.map((product) => (
              <article key={product.id} className="menu-card">
                {product.isLocal ? <span className="menu-card__badge">Baru</span> : null}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="menu-card__image"
                  loading="lazy"
                />
                <div className="menu-card__body">
                  <p className="menu-card__category">{product.category}</p>
                  <h4 className="menu-card__title">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h4>
                  <div className="menu-card__meta">
                    <span className="menu-card__price">{formatMenuPrice(product)}</span>
                    <span className="menu-card__stock">Stok: {product.stock}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default GuestDashboard
