function DashboardInsights() {
  return (
    <div className="page-stack">
      <section className="stats-grid">
        <article className="stat-card">
          <p>Retensi</p>
          <h3>68%</h3>
          <span className="positive">+2.4%</span>
        </article>
        <article className="stat-card">
          <p>Churn</p>
          <h3>4.1%</h3>
          <span className="negative">-0.3%</span>
        </article>
        <article className="stat-card">
          <p>LTV rata-rata</p>
          <h3>Rp 1,2jt</h3>
          <span className="positive">+5.1%</span>
        </article>
        <article className="stat-card">
          <p>NPS</p>
          <h3>42</h3>
          <span className="positive">+6</span>
        </article>
      </section>
      <section className="panel">
        <h3>Catatan</h3>
        <p>
          Ini halaman contoh <strong>nested route</strong> di bawah{' '}
          <code>/dashboard/insights</code>, sesuai materi multi layout & nested
          routes.
        </p>
      </section>
    </div>
  )
}

export default DashboardInsights
