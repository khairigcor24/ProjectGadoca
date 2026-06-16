import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { formatMenuPrice, getCustomMenus } from '../lib/menuStore'
import MenuFormModal from '../sections/MenuFormModal'

function Product() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const customMenus = getCustomMenus()

    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        setProducts([...customMenus, ...response.data.products])
      })
      .catch((err) => {
        setError(err.message)
        setProducts(customMenus)
      })
      .finally(() => setLoading(false))
  }, [])

  function handleMenuAdded(newItem) {
    setProducts((prev) => [newItem, ...prev])
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <section className="panel">
        <div className="table-head">
          <h3>Daftar Menu</h3>
          <button type="button" onClick={() => setShowForm(true)}>
            Tambah Menu
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Cari menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        {loading ? (
          <p className="empty-state">Memuat menu…</p>
        ) : filteredProducts.length > 0 ? (
          <div className="menu-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="menu-card">
                {product.isLocal ? <span className="menu-card__badge">Baru</span> : null}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="menu-card__image"
                  loading="lazy"
                />
                <div className="menu-card__body">
                  <p className="menu-card__category">{product.category}</p>
                  <h4 className="menu-card__title">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h4>
                  <div className="menu-card__meta">
                    <span className="menu-card__price">{formatMenuPrice(product)}</span>
                    <span className="menu-card__stock">Stok: {product.stock}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">Menu tidak ditemukan</p>
        )}
      </section>

      <MenuFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onAdded={handleMenuAdded}
      />
    </>
  )
}

export default Product
