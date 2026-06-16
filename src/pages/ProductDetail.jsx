import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { formatMenuPrice, getCustomMenuById, isLocalMenuId } from '../lib/menuStore'

function ProductDetailView({ product }) {
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
