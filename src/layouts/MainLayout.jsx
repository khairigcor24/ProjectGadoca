import { Outlet, useLocation } from 'react-router-dom'
import Header from '../sections/Header'
import HeroBanner from '../sections/HeroBanner'
import Sidebar from '../sections/Sidebar'
import Footer from '../sections/Footer'

function MainLayout() {
  const location = useLocation()

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <p className="cafe-strip">
          Pesan sebelum tengah hari untuk pengiriman besok · Gadocaa — dibuat dengan hati, setiap hari
        </p>
        <HeroBanner pathname={location.pathname} />
        <Header pathname={location.pathname} />
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default MainLayout
