import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ProductDetail() {
  const { id } = useParams()

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
    return <div className="panel">Loading...</div>
  }

  return (
    <section className="panel">
      <h2>{product.title}</h2>

      <img
        src={product.thumbnail}
        alt={product.title}
        width="250"
      />

      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p>{product.description}</p>
    </section>
  )
}

export default ProductDetail