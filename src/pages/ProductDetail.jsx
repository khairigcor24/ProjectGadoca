import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { formatMenuPrice, getCustomMenuById, isLocalMenuId } from '../lib/menuStore'
import { addToCart } from '../lib/cartStore'
import { PlusIcon, MinusIcon } from '../components/Icons'

function ProductDetailView({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function handleAddToCart() {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity)
      setMessage('✓ Ditambahkan ke keranjang!')
      setTimeout(() => {
        setMessage('')
      }, 2000)
      setQuantity(1)
    }
  }

  function handleCheckout() {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity)
      navigate('/cart')
    }
  }

  return (
    <section className="panel product-detail">
      <div className="product-detail__image-wrap">
        <img
          src={product.images?.[0] ?? product.thumbnail}
          alt={product.title}
          className="product-detail__image"
        />
      </div>

      <div className="product-detail__info">
        <p className="product-detail__category">{product.category}</p>
        <h2>{product.title}</h2>
        <p className="product-detail__price">{formatMenuPrice(product)}</p>

        <div className="product-detail__meta">
          <p><strong>Merek:</strong> {product.brand ?? '—'}</p>
          <p><strong>Stok:</strong> {product.stock} unit</p>
          {product.rating != null ? (
            <p><strong>Rating:</strong> {product.rating} / 5</p>
          ) : null}
        </div>

        {product.description ? (
          <p className="product-detail__description">{product.description}</p>
        ) : null}

        {/* Order Section */}
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Jumlah
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  backgroundColor: '#f9fafb',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#374151',
                }}
              >
                <MinusIcon size={20} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1
                  setQuantity(Math.min(product.stock, Math.max(1, val)))
                }}
                min="1"
                max={product.stock}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: '1rem',
                }}
              />
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  backgroundColor: '#f9fafb',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#374151',
                }}
              >
                <PlusIcon size={20} />
              </button>
            </div>
          </div>

          {message && (
            <p style={{ color: '#10b981', marginBottom: '1rem', fontWeight: '500' }}>
              {message}
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              Keranjang
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function RemoteProductDetail({ id }) {
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [id])

  if (error) {
    return <div className="panel">Error: {error}</div>
  }

  if (!product) {
    return <div className="panel">Memuat…</div>
  }

  return <ProductDetailView product={product} />
}

function ProductDetailContent({ id }) {
  if (isLocalMenuId(id)) {
    const product = getCustomMenuById(id)
    if (!product) {
      return <div className="panel">Error: Menu tidak ditemukan.</div>
    }
    return <ProductDetailView product={product} />
  }

  return <RemoteProductDetail key={id} id={id} />
}

function ProductDetail() {
  const { id } = useParams()
  return <ProductDetailContent key={id} id={id} />
}

export default ProductDetail
