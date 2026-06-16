function Analytics() {
  return (
    <section className="content-grid">
      <article className="panel large">
        <h3>Ikhtisar Trafik</h3>
        <p>Performa dari semua kanal</p>
        <div className="chart-placeholder">
          <span>Grafik Garis</span>
        </div>
      </article>
      <article className="panel">
        <h3>Tingkat Konversi</h3>
        <p>Konversi keseluruhan bulan ini</p>
        <h3 className="metric-value">12.7%</h3>
        <span className="positive">+3,1% dari bulan lalu</span>
      </article>
    </section>
  )
}

export default Analytics
