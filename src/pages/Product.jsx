function Product() {
  const products = [
    { name: 'Macbook Pro 13"', stock: 21, category: 'Laptop', price: '$2,399' },
    { name: 'Apple Watch Ultra', stock: 57, category: 'Watch', price: '$879' },
    { name: 'iPhone 15 Pro Max', stock: 34, category: 'Smartphone', price: '$1,869' },
  ]

  return (
    <section className="panel">
      <div className="table-head">
        <h3>Product List</h3>
        <button type="button">Add Product</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Product
