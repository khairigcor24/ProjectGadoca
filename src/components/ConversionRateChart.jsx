const OVERALL_RATE = 12.7
const PREVIOUS_RATE = 9.6

const CHANNEL_CONVERSION = [
  { name: 'WhatsApp', rate: 18.4, color: 'var(--cafe-terracotta)' },
  { name: 'Instagram', rate: 14.2, color: 'var(--cafe-olive)' },
  { name: 'Google Maps', rate: 11.5, color: 'var(--cafe-olive-dark)' },
  { name: 'GoFood', rate: 9.8, color: '#8a9a7a' },
  { name: 'Walk-in', rate: 8.3, color: '#b8a99a' },
]

function ConversionRateChart() {
  const trend = OVERALL_RATE - PREVIOUS_RATE
  const circumference = 2 * Math.PI * 42
  const dashOffset = circumference - (OVERALL_RATE / 100) * circumference

  return (
    <div className="conversion-chart">
      <div className="conversion-chart__summary">
        <div className="conversion-chart__ring-wrap">
          <svg viewBox="0 0 100 100" className="conversion-chart__ring" aria-hidden="true">
            <circle cx="50" cy="50" r="42" className="conversion-chart__ring-bg" />
            <circle
              cx="50"
              cy="50"
              r="42"
              className="conversion-chart__ring-fill"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
              }}
            />
          </svg>
          <div className="conversion-chart__ring-value">
            <strong>{OVERALL_RATE}%</strong>
            <span>Total</span>
          </div>
        </div>

        <div>
          <h3 className="metric-value">{OVERALL_RATE}%</h3>
          <span className="positive">+{trend.toFixed(1).replace('.', ',')}% dari bulan lalu</span>
          <p className="conversion-chart__hint">
            Dari 3.370 kunjungan, 428 berubah jadi pesanan.
          </p>
        </div>
      </div>

      <div className="conversion-chart__channels">
        <p className="conversion-chart__channels-title">Konversi per kanal</p>
        {CHANNEL_CONVERSION.map((channel) => (
          <div key={channel.name} className="conversion-chart__row">
            <span className="conversion-chart__name">{channel.name}</span>
            <div className="conversion-chart__track">
              <div
                className="conversion-chart__fill"
                style={{
                  width: `${(channel.rate / 20) * 100}%`,
                  background: channel.color,
                }}
              />
            </div>
            <span className="conversion-chart__rate">{channel.rate}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversionRateChart
