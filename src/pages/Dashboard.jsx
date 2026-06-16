function Dashboard() {
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
          <div className="chart-placeholder">
            <span>Area Grafik</span>
          </div>
        </article>

        <article className="panel">
          <h3>Demografi Pelanggan</h3>
          <p>Jumlah pelanggan berdasarkan lokasi</p>
          <ul className="country-list">
            <li><strong>Jakarta</strong><span>2.379 pelanggan (79%)</span></li>
            <li><strong>Bandung</strong><span>589 pelanggan (23%)</span></li>
            <li><strong>Surabaya</strong><span>412 pelanggan (14%)</span></li>
          </ul>
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

export default Dashboard
