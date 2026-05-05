const pageMeta = {
  '/dashboard': { title: 'Monthly Sales Overview', crumb: 'Dashboard / eCommerce' },
  '/product': { title: 'Product Management', crumb: 'E-commerce / Products' },
  '/transactions': { title: 'Transactions', crumb: 'E-commerce / Transactions' },
  '/analytics': { title: 'Analytics Overview', crumb: 'Dashboard / Analytics' },
  '/user-profile': { title: 'User Profile', crumb: 'Account / Profile' },
}

function Header({ pathname }) {
  const meta = pageMeta[pathname] || pageMeta['/dashboard']

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">{meta.crumb}</p>
        <h2>{meta.title}</h2>
      </div>
      <button type="button">View More</button>
    </header>
  )
}

export default Header
