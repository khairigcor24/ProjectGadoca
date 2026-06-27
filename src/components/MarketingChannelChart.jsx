const PERIODS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun']

const CHANNELS = [
  { name: 'Instagram', color: 'var(--cafe-olive)', values: [820, 945, 1020, 1180, 1310, 1480] },
  { name: 'WhatsApp', color: 'var(--cafe-terracotta)', values: [540, 610, 680, 720, 790, 860] },
  { name: 'Google Maps', color: 'var(--cafe-olive-dark)', values: [420, 455, 490, 520, 560, 595] },
  { name: 'GoFood', color: '#8a9a7a', values: [310, 340, 365, 390, 410, 435] },
]

const CHART = {
  width: 560,
  height: 240,
  padX: 36,
  padY: 28,
}

function scaleY(value, max) {
  const innerHeight = CHART.height - CHART.padY * 2
  return CHART.height - CHART.padY - (value / max) * innerHeight
}

function scaleX(index, count) {
  const innerWidth = CHART.width - CHART.padX * 2
  return CHART.padX + (index / (count - 1)) * innerWidth
}

function buildLine(values, max) {
  return values
    .map((value, index) => {
      const x = scaleX(index, values.length)
      const y = scaleY(value, max)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

function MarketingChannelChart() {
  const allValues = CHANNELS.flatMap((channel) => channel.values)
  const maxValue = Math.max(...allValues) * 1.08
  const yTicks = [0, 500, 1000, 1500]

  return (
    <div className="channel-chart">
      <div className="channel-chart__legend">
        {CHANNELS.map((channel) => (
          <span key={channel.name} className="channel-chart__legend-item">
            <i className="channel-chart__dot" style={{ background: channel.color }} />
            {channel.name}
          </span>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="channel-chart__svg"
        role="img"
        aria-label="Grafik trafik kanal pemasaran Gadocaa"
      >
        {yTicks.map((tick) => {
          const y = scaleY(tick, maxValue)
          return (
            <g key={tick}>
              <line
                x1={CHART.padX}
                y1={y}
                x2={CHART.width - CHART.padX}
                y2={y}
                className="channel-chart__grid"
              />
              <text x={8} y={y + 4} className="channel-chart__tick">
                {tick}
              </text>
            </g>
          )
        })}

        {CHANNELS.map((channel) => (
          <path
            key={channel.name}
            d={buildLine(channel.values, maxValue)}
            className="channel-chart__line"
            style={{ stroke: channel.color }}
          />
        ))}

        {PERIODS.map((period, index) => {
          const x = scaleX(index, PERIODS.length)
          return (
            <text
              key={period}
              x={x}
              y={CHART.height - 8}
              textAnchor="middle"
              className="channel-chart__label"
            >
              {period}
            </text>
          )
        })}
      </svg>

      <p className="channel-chart__footnote">
        Juni 2026: Instagram (+13%) dan WhatsApp (+9%) jadi kanal tumbuh tercepat.
      </p>
    </div>
  )
}

export default MarketingChannelChart
