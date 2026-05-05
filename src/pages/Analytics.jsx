function Analytics() {
  return (
    <section className="content-grid">
      <article className="panel large">
        <h3>Traffic Overview</h3>
        <p>Performance from all channels</p>
        <div className="chart-placeholder">
          <span>Line Chart</span>
        </div>
      </article>
      <article className="panel">
        <h3>Conversion Rate</h3>
        <p>Overall conversion this month</p>
        <h3 className="metric-value">12.7%</h3>
        <span className="positive">+3.1% from last month</span>
      </article>
    </section>
  )
}

export default Analytics
