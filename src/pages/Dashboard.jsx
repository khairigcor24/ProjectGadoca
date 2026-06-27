import { useNavigate } from 'react-router-dom'
import { isGuest } from '../lib/auth'
import GuestDashboard from './GuestDashboard'
import MonthlySalesChart from '../components/MonthlySalesChart'
import LocationDemographics from '../components/LocationDemographics'

function AdminDashboard() {
  const navigate = useNavigate()

  const heroButtonStyle = {
    padding: '0.75rem 2rem',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  }

  function handleHeroButtonHover(e, active) {
    e.currentTarget.style.backgroundColor = active ? 'white' : 'transparent'
    e.currentTarget.style.color = active ? '#000' : 'white'
  }

  const stats = [
    { label: 'Pelanggan', value: '3.782', trend: '+11,01%', positive: true },
    { label: 'Pesanan', value: '5.359', trend: '+9,05%', positive: true },
    { label: 'Pendapatan', value: 'Rp 42,8jt', trend: '+5,32%', positive: true },
    { label: 'Menunggu', value: '84', trend: '-1,20%', positive: false },
  ]

  const orders = [
    { product: 'Latte Signature', category: 'Kopi', price: 'Rp 45.000', status: 'Delivered' },
    { product: 'Croissant Butter', category: 'Pastry', price: 'Rp 32.000', status: 'Pending' },
    { product: 'Cold Brew Oat', category: 'Kopi', price: 'Rp 48.000', status: 'Delivered' },
    { product: 'Matcha Latte', category: 'Minuman', price: 'Rp 52.000', status: 'Canceled' },
    { product: 'Banana Bread', category: 'Roti', price: 'Rp 28.000', status: 'Delivered' },
  ]

  return (
    <div className="page-stack">
      <section 
        className="hero-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}
      >
        {/* Overlay untuk kontras */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        />
        
        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            paddingLeft: '4rem',
            paddingRight: '4rem',
            maxWidth: '600px',
          }}
        >
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
            Cafe & Restaurant Est. 2035
          </p>
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              lineHeight: 1.2,
              marginBottom: '2rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Your Go-to Spot for Delicious Eats & Coffee
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              style={heroButtonStyle}
              onClick={() => navigate('/product')}
              onMouseEnter={(e) => handleHeroButtonHover(e, true)}
              onMouseLeave={(e) => handleHeroButtonHover(e, false)}
            >
              Order Online
            </button>
            <button
              type="button"
              style={heroButtonStyle}
              onClick={() => navigate('/product')}
              onMouseEnter={(e) => handleHeroButtonHover(e, true)}
              onMouseLeave={(e) => handleHeroButtonHover(e, false)}
            >
              Our Menu
            </button>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((item) => (
          <article key={item.label} className="stat-card">
            <p>{item.label}</p>
            <h3>{item.value}</h3>
            <span className={item.positive ? 'positive' : 'negative'}>{item.trend}</span>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel large">
          <h3>Target Bulanan</h3>
          <p>Target penjualan yang Anda tetapkan setiap bulan</p>
          <MonthlySalesChart />
        </article>

        <article className="panel">
          <h3>Demografi Pelanggan</h3>
          <p>Jumlah pelanggan berdasarkan wilayah Pekanbaru</p>
          <LocationDemographics />
        </article>
      </section>

      <section className="panel">
        <div className="table-head">
          <h3>Pesanan Terbaru</h3>
          <button type="button">Lihat semua</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.product}>
                  <td>{order.product}</td>
                  <td>{order.category}</td>
                  <td>{order.price}</td>
                  <td>
                    <span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Dashboard() {
  if (isGuest()) {
    return <GuestDashboard />
  }

  return <AdminDashboard />
}

export default Dashboard
