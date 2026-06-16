const heroContent = {
  '/dashboard/overview': {
    eyebrow: 'Selamat datang kembali',
    title: 'Setiap cangkir punya cerita',
    subtitle: 'Pantau penjualan, pesanan, dan pelanggan Gadocaa dari satu tempat.',
  },
  '/dashboard/insights': {
    eyebrow: 'Insights',
    title: 'Memahami pelanggan Anda',
    subtitle: 'Retensi, LTV, dan metrik kunci bisnis kafe Anda.',
  },
  '/product': {
    eyebrow: 'Menu & Produk',
    title: 'Makanan & minuman kami',
    subtitle: 'Kelola katalog menu — roti artisan, kopi spesial, dan hidangan favorit.',
  },
  '/transactions': {
    eyebrow: 'Pesanan',
    title: 'Transaksi & pengiriman',
    subtitle: 'Lacak pesanan delivery dan pickup dengan mudah.',
  },
  '/analytics': {
    eyebrow: 'Analitik',
    title: 'Performa bisnis',
    subtitle: 'Lihat tren kunjungan dan konversi dari semua kanal.',
  },
  '/user-profile': {
    eyebrow: 'Tim',
    title: 'Profil staf',
    subtitle: 'Kelola anggota tim Gadocaa Stylee.',
  },
}

const defaultHero = heroContent['/dashboard/overview']

function HeroBanner({ pathname }) {
  const content =
    Object.entries(heroContent).find(([path]) => pathname.startsWith(path))?.[1] ??
    (pathname.startsWith('/product/')
      ? {
          eyebrow: 'Detail Menu',
          title: 'Produk pilihan',
          subtitle: 'Informasi lengkap item menu Anda.',
        }
      : defaultHero)

  return (
    <section className="hero-banner" aria-label="Hero">
      <div className="hero-banner__overlay" />
      <div className="hero-banner__content">
        <p className="hero-banner__eyebrow">{content.eyebrow}</p>
        <h2 className="hero-banner__title">{content.title}</h2>
        <p className="hero-banner__subtitle">{content.subtitle}</p>
      </div>
    </section>
  )
}

export default HeroBanner
