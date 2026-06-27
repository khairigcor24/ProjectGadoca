import MarketingChannelChart from '../components/MarketingChannelChart'
import ConversionRateChart from '../components/ConversionRateChart'

function Analytics() {
  return (
    <section className="content-grid">
      <article className="panel large">
        <h3>Ikhtisar Trafik</h3>
        <p>Performa dari semua kanal pemasaran</p>
        <MarketingChannelChart />
      </article>

      <article className="panel">
        <h3>Tingkat Konversi</h3>
        <p>Konversi keseluruhan bulan ini</p>
        <ConversionRateChart />
      </article>
    </section>
  )
}

export default Analytics
