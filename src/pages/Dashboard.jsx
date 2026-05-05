function Dashboard() {
  const stats = [
    { label: 'Customers', value: '3,782', trend: '+11.01%', positive: true },
    { label: 'Orders', value: '5,359', trend: '+9.05%', positive: true },
    { label: 'Revenue', value: '$42,890', trend: '+5.32%', positive: true },
    { label: 'Pending', value: '84', trend: '-1.20%', positive: false },
  ]

  const orders = [
    { product: 'Macbook Pro 13"', category: 'Laptop', price: '$2,399.00', status: 'Delivered' },
    { product: 'Apple Watch Ultra', category: 'Watch', price: '$879.00', status: 'Pending' },
    { product: 'iPhone 15 Pro Max', category: 'Smartphone', price: '$1,869.00', status: 'Delivered' },
    { product: 'iPad Pro 3rd Gen', category: 'Electronics', price: '$1,699.00', status: 'Canceled' },
    { product: 'AirPods Pro 2nd Gen', category: 'Accessories', price: '$240.00', status: 'Delivered' },
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
          <h3>Monthly Target</h3>
          <p>Target you've set for each month</p>
          <div className="chart-placeholder">
            <span>Chart Area</span>
          </div>
        </article>

        <article className="panel">
          <h3>Customers Demography</h3>
          <p>Number of customer based on country</p>
          <ul className="country-list">
            <li><strong>USA</strong><span>2,379 Customers (79%)</span></li>
            <li><strong>France</strong><span>589 Customers (23%)</span></li>
            <li><strong>Canada</strong><span>412 Customers (14%)</span></li>
          </ul>
        </article>
      </section>

      <section className="panel">
        <div className="table-head">
          <h3>Recent Orders</h3>
          <button type="button">See all</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Products</th>
                <th>Category</th>
                <th>Price</th>
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
