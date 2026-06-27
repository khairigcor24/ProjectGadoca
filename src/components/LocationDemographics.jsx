const PEKANBARU_LOCATIONS = [
  { name: 'Rumbai', customers: 1512, percent: 40 },
  { name: 'Harapan Raya', customers: 945, percent: 25 },
  { name: 'Kulim', customers: 757, percent: 20 },
  { name: 'Hangtuah', customers: 568, percent: 15 },
]

const BAR_COLORS = [
  'var(--cafe-olive)',
  'var(--cafe-terracotta)',
  'var(--cafe-olive-dark)',
  '#8a9a7a',
]

function LocationDemographics() {
  const totalCustomers = PEKANBARU_LOCATIONS.reduce((sum, item) => sum + item.customers, 0)

  return (
    <div className="location-demo">
      <div className="location-demo__chart" role="img" aria-label="Grafik demografi pelanggan Pekanbaru">
        {PEKANBARU_LOCATIONS.map((item, index) => (
          <div key={item.name} className="location-demo__bar-row">
            <span className="location-demo__bar-label">{item.name}</span>
            <div className="location-demo__bar-track">
              <div
                className="location-demo__bar-fill"
                style={{
                  width: `${item.percent}%`,
                  background: BAR_COLORS[index],
                }}
              />
            </div>
            <span className="location-demo__bar-value">{item.percent}%</span>
          </div>
        ))}
      </div>

      <ul className="country-list">
        {PEKANBARU_LOCATIONS.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>
            <span>
              {item.customers.toLocaleString('id-ID')} pelanggan ({item.percent}%)
            </span>
          </li>
        ))}
      </ul>

      <p className="location-demo__total">
        Total {totalCustomers.toLocaleString('id-ID')} pelanggan di Pekanbaru
      </p>
    </div>
  )
}

export default LocationDemographics
