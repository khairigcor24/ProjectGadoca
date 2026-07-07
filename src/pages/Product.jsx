import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { formatMenuPrice } from '../lib/menuStore'
import { isGuest } from '../lib/auth'
import MenuFormModal from '../sections/MenuFormModal'
import { supabase } from '../lib/supabase'

const DRINK_CATEGORIES = ['Kopi', 'Minuman']
const FOOD_CATEGORIES = ['Pastry', 'Roti', 'Makanan', 'Snack']

function isDrink(product) {
  return DRINK_CATEGORIES.includes(product.category)
}

function isFood(product) {
  return FOOD_CATEGORIES.includes(product.category)
}

function Product() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      setError(error.message)
      setProducts([])
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  function handleMenuAdded(newItem) {
    setProducts((prev) => [newItem, ...prev])
  }

  function handleMenuUpdated(updatedItem) {
    setProducts((prev) =>
      prev.map((product) => (product.id === updatedItem.id ? updatedItem : product))
    )
  }

  function handleOpenAddForm() {
    setEditingItem(null)
    setShowForm(true)
  }

  function handleEditMenu(product) {
    setEditingItem(product)
    setShowForm(true)
  }

  function handleCloseForm() {
    setShowForm(false)
    setEditingItem(null)
  }

  async function handleDeleteMenu(id) {
    if (window.confirm('Yakin ingin menghapus menu ini?')) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) {
        alert('Gagal menghapus: ' + error.message)
      } else {
        setProducts((prev) => prev.filter((product) => product.id !== id))
      }
    }
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  const drinks = filteredProducts.filter(isDrink)
  const foods = filteredProducts.filter(isFood)

  const renderMenuCard = (product) => (
    <article key={product.id} className="menu-card">
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
        {!isGuest() && (
          <div className="menu-card__actions">
            <button
              type="button"
              className="menu-card__edit"
              onClick={() => handleEditMenu(product)}
              aria-label="Edit menu"
            >
              Edit
            </button>
            <button
              type="button"
              className="menu-card__delete"
              onClick={() => handleDeleteMenu(product.id)}
              aria-label="Hapus menu"
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    </article>
  )

  return (
    <>
      <section className="panel">
        <div className="table-head">
          <h3>Daftar Menu</h3>
          {!isGuest() && (
            <button type="button" onClick={handleOpenAddForm}>
              Tambah Menu
            </button>
          )}
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
        ) : isGuest() && filteredProducts.length > 0 ? (
          <>
            {/* Minuman Section */}
            {drinks.length > 0 && (
              <>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  🍵 Minuman
                </h3>
                <div className="menu-grid" style={{ marginBottom: '2rem' }}>
                  {drinks.map(renderMenuCard)}
                </div>
              </>
            )}

            {/* Makanan Section */}
            {foods.length > 0 && (
              <>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  🍽️ Makanan
                </h3>
                <div className="menu-grid">
                  {foods.map(renderMenuCard)}
                </div>
              </>
            )}
          </>
        ) : filteredProducts.length > 0 ? (
          <div className="menu-grid">
            {filteredProducts.map(renderMenuCard)}
          </div>
        ) : (
          <p className="empty-state">Menu tidak ditemukan</p>
        )}
      </section>

      <MenuFormModal
        open={showForm && !isGuest()}
        onClose={handleCloseForm}
        onAdded={handleMenuAdded}
        editItem={editingItem}
        onUpdated={handleMenuUpdated}
      />
    </>
  )
}

export default Product
