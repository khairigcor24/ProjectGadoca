const MONTHLY_DATA = [
  { month: 'Jan', actual: 28.4, target: 35 },
  { month: 'Feb', actual: 31.2, target: 35 },
  { month: 'Mar', actual: 34.8, target: 38 },
  { month: 'Apr', actual: 36.5, target: 38 },
  { month: 'Mei', actual: 39.1, target: 40 },
  { month: 'Jun', actual: 42.8, target: 45 },
]

const CHART = {
  width: 560,
  height: 220,
  padX: 36,
  padY: 24,
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

function buildArea(values, max) {
  const line = values
    .map((value, index) => {
      const x = scaleX(index, values.length)
      const y = scaleY(value, max)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const lastX = scaleX(values.length - 1, values.length)
  const firstX = scaleX(0, values.length)
  const baseY = CHART.height - CHART.padY

  return `${line} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`
}

function MonthlySalesChart() {
  const actualValues = MONTHLY_DATA.map((item) => item.actual)
  const targetValues = MONTHLY_DATA.map((item) => item.target)
  const maxValue = Math.max(...actualValues, ...targetValues) * 1.1
  const yTicks = [0, 15, 30, 45]

  return (
    <div className="sales-chart">
      <div className="sales-chart__legend">
        <span className="sales-chart__legend-item">
          <i className="sales-chart__dot sales-chart__dot--actual" />
          Penjualan (jt)
        </span>
        <span className="sales-chart__legend-item">
          <i className="sales-chart__dot sales-chart__dot--target" />
          Target (jt)
        </span>
      </div>

      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="sales-chart__svg"
        role="img"
        aria-label="Grafik target penjualan bulanan Gadocaa"
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
                className="sales-chart__grid"
              />
              <text x={8} y={y + 4} className="sales-chart__tick">
                {tick}
              </text>
            </g>
          )
        })}

        <path d={buildArea(actualValues, maxValue)} className="sales-chart__area" />
        <path d={buildLine(targetValues, maxValue)} className="sales-chart__line sales-chart__line--target" />
        <path d={buildLine(actualValues, maxValue)} className="sales-chart__line sales-chart__line--actual" />

        {MONTHLY_DATA.map((item, index) => {
          const x = scaleX(index, MONTHLY_DATA.length)
          const y = scaleY(item.actual, maxValue)
          return (
            <g key={item.month}>
              <circle cx={x} cy={y} r="4.5" className="sales-chart__point" />
              <text x={x} y={CHART.height - 6} textAnchor="middle" className="sales-chart__label">
                {item.month}
              </text>
            </g>
          )
        })}
      </svg>

      <p className="sales-chart__footnote">
        Juni 2026: Rp 42,8 jt tercapai dari target Rp 45 jt (95%)
      </p>
    </div>
  )
}

export default MonthlySalesChart
