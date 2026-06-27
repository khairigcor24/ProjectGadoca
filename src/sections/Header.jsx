import { useNavigate } from 'react-router-dom'
import { clearToken, clearGuestToken, isGuest } from '../lib/auth'

const adminPageMeta = {
  '/dashboard/overview': {
    title: 'Ringkasan Penjualan',
    crumb: 'Dashboard / Ringkasan',
    tagline: 'Pantau performa harian kafe Anda.',
  },
  '/dashboard/insights': {
    title: 'Dashboard Insights',
    crumb: 'Dashboard / Insights',
    tagline: 'Analisis mendalam pelanggan dan retensi.',
  },
  '/product': {
    title: 'Kelola Menu',
    crumb: 'Menu / Produk',
    tagline: 'Tambah, edit, dan atur item menu kafe.',
  },
  '/transactions': {
    title: 'Transaksi',
    crumb: 'Pesanan / Transaksi',
    tagline: 'Riwayat pesanan delivery dan pickup.',
  },
  '/analytics': {
    title: 'Analitik',
    crumb: 'Dashboard / Analitik',
    tagline: 'Performa dari semua kanal pemasaran.',
  },
  '/user-profile': {
    title: 'Profil Pengguna',
    crumb: 'Akun / Profil',
    tagline: 'Informasi tim Gadocaa Stylee.',
  },
}

const guestPageMeta = {
  '/dashboard/overview': {
    title: 'Beranda',
    crumb: 'Belanja / Beranda',
    tagline: 'Ringkasan pesanan dan menu pilihan untuk Anda.',
  },
  '/product': {
    title: 'Daftar Menu',
    crumb: 'Belanja / Menu',
    tagline: 'Jelajahi menu favorit kami.',
  },
  '/cart': {
    title: 'Keranjang',
    crumb: 'Belanja / Keranjang',
    tagline: 'Review pesanan sebelum checkout.',
  },
}

function Header({ pathname }) {
  const navigate = useNavigate()
  const userIsGuest = isGuest()
  const pageMeta = userIsGuest ? guestPageMeta : adminPageMeta

  const meta =
    Object.entries(pageMeta).find(([path]) => pathname.startsWith(path))?.[1] ??
    (pathname.startsWith('/product/')
      ? userIsGuest
        ? { title: 'Detail Menu', crumb: 'Belanja / Detail', tagline: 'Lihat detail menu ini.' }
        : { title: 'Detail Produk', crumb: 'Menu / Detail', tagline: 'Informasi lengkap item menu.' }
      : pageMeta[Object.keys(pageMeta)[0]])

  function handleLogout() {
    if (userIsGuest) {
      clearGuestToken()
    } else {
      clearToken()
    }
    navigate('/login', { replace: true })
  }

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">{meta.crumb}</p>
        <h2>{meta.title}</h2>
        <p className="topbar-tagline">{meta.tagline}</p>
      </div>
      <div className="topbar-actions">
        <button type="button" className="btn-primary">
          Lihat Selengkapnya
        </button>
        <button type="button" className="btn-outline" onClick={handleLogout}>
          Keluar
        </button>
      </div>
    </header>
  )
}

export default Header
