import { Outlet, useLocation } from 'react-router-dom'
import Header from '../sections/Header'
import Sidebar from '../sections/Sidebar'

function MainLayout() {
  const location = useLocation()

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Header pathname={location.pathname} />
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
