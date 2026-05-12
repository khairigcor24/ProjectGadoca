import { NavLink, Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className="dashboard-nested">
      <nav className="sub-nav" aria-label="Sub dashboard">
        <NavLink to="/dashboard/overview" end>
          Ringkasan
        </NavLink>
        <NavLink to="/dashboard/insights" end>
          Insights
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default DashboardLayout
