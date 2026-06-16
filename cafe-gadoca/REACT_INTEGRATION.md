# 🔗 INTEGRASI REACT + LARAVEL API

Dokumentasi lengkap untuk mengintegrasikan React frontend dengan Laravel API backend.

---

## 📋 Pre-requisites

- Laravel server berjalan di `http://localhost:8000`
- Database sudah di-migrate
- API endpoints tersedia di `http://localhost:8000/api`

---

## 🛠️ Setup React untuk API Calls

### 1. Install Axios (Optional)
```bash
cd ~/path/to/react-app
npm install axios
```

Atau gunakan built-in `fetch` API (recommended untuk modern JavaScript)

### 2. Buat API Service Module

Create file: `src/services/api.js`

```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:8000/api';

// Helper untuk fetch dengan error handling
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// CATEGORIES
export const categoryAPI = {
  getAll: () => fetchAPI('/categories'),
  getById: (id) => fetchAPI(`/categories/${id}`),
  create: (data) => fetchAPI('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/categories/${id}`, {
    method: 'DELETE',
  }),
};

// PRODUCTS
export const productAPI = {
  getAll: () => fetchAPI('/products'),
  getById: (id) => fetchAPI(`/products/${id}`),
  create: (data) => fetchAPI('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// TRANSACTIONS
export const transactionAPI = {
  getAll: () => fetchAPI('/transactions'),
  getById: (id) => fetchAPI(`/transactions/${id}`),
  create: (data) => fetchAPI('/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/transactions/${id}`, {
    method: 'DELETE',
  }),
};
```

---

## 📄 Contoh Implementasi di React Components

### Example 1: Product List Component

```jsx
// src/pages/Product.jsx
import { useEffect, useState } from 'react';
import { productAPI } from '../services/api';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: Rp {parseInt(product.price).toLocaleString('id-ID')}</p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 2: Create Product Form

```jsx
// src/pages/CreateProduct.jsx
import { useState, useEffect } from 'react';
import { productAPI, categoryAPI } from '../services/api';

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories untuk dropdown
    categoryAPI.getAll()
      .then(setCategories)
      .catch(err => console.error('Error:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const data = {
        ...formData,
        category_id: parseInt(formData.category_id) || null,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };
      
      await productAPI.create(data);
      alert('Product created successfully!');
      setFormData({
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
      });
    } catch (err) {
      setError(err.message);
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Product</h1>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Price (Rp):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
```

### Example 3: Transaction Creation

```jsx
// src/pages/Checkout.jsx
import { useState, useEffect } from 'react';
import { transactionAPI, productAPI } from '../services/api';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(1); // Set from auth context
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    productAPI.getAll().then(setProducts).catch(console.error);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product_id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          product: product,
          quantity: 1,
          total_price: product.price,
        },
      ];
    });
  };

  const checkout = async () => {
    try {
      setLoading(true);
      
      // Create transaction untuk setiap item
      for (const item of cartItems) {
        await transactionAPI.create({
          user_id: userId,
          product_id: item.product_id,
          quantity: item.quantity,
          total_price: item.total_price * item.quantity,
          status: 'completed',
        });
      }
      
      alert('Checkout successful!');
      setCartItems([]);
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('Error during checkout: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.total_price * item.quantity),
    0
  );

  return (
    <div>
      <h1>Shopping Cart</h1>
      
      <div className="products-section">
        <h2>Available Products</h2>
        <div className="products-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>Price: Rp {parseInt(product.price).toLocaleString('id-ID')}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <h2>Cart Items ({cartItems.length})</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.product_id} className="cart-item">
                <p>{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Subtotal: Rp{' '}
                  {(item.total_price * item.quantity).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: Rp {totalPrice.toLocaleString('id-ID')}</h3>
              <button
                onClick={checkout}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

### Example 4: Update Product

```jsx
// src/pages/EditProduct.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productAPI.getById(id),
      categoryAPI.getAll(),
    ])
      .then(([prod, cats]) => {
        setProduct(prod);
        setCategories(cats);
        setFormData(prod);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' 
        ? parseFloat(value) 
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.update(id, formData);
      alert('Product updated successfully!');
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit {product.name}</h1>
      
      <select
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
      >
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
      />

      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
      />

      <button type="submit">Update Product</button>
    </form>
  );
}
```

---

## 🔒 CORS Configuration

Jika mendapat error CORS, update di Laravel:

### Option 1: Update `config/cors.php`
```php
'allowed_origins' => [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
],
```

### Option 2: Custom Middleware
```bash
composer require fruitcake/laravel-cors
php artisan vendor:publish --tag="cors"
```

---

## 🧪 Testing dengan Postman/Insomnia

### Import Example:
1. **GET All Products**
   - URL: `http://localhost:8000/api/products`
   - Method: GET

2. **Create Product**
   - URL: `http://localhost:8000/api/products`
   - Method: POST
   - Body (JSON):
   ```json
   {
     "category_id": 1,
     "name": "New Product",
     "description": "Description here",
     "price": 50000,
     "stock": 10
   }
   ```

3. **Update Product**
   - URL: `http://localhost:8000/api/products/1`
   - Method: PUT
   - Body (JSON):
   ```json
   {
     "price": 55000,
     "stock": 8
   }
   ```

4. **Delete Product**
   - URL: `http://localhost:8000/api/products/1`
   - Method: DELETE

---

## 📝 Custom Hooks (Optional)

Create reusable hooks untuk API calls:

```javascript
// src/hooks/useAPI.js
import { useState, useEffect } from 'react';

export function useFetch(fetchFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Usage:
// const { data: products, loading, error } = useFetch(() => productAPI.getAll());
```

---

## ✅ Checklist Integrasi

- [ ] API service file dibuat
- [ ] Fetch calls diimplementasikan
- [ ] CORS dikonfigurasi (jika diperlukan)
- [ ] Components menggunakan API
- [ ] Error handling ditambahkan
- [ ] Loading states ditampilkan
- [ ] Data ditampilkan dengan benar
- [ ] Create/Update/Delete berfungsi
- [ ] Environment variables dikonfigurasi (jika prod)

---

## 🚀 Production Tips

1. **Environment Variables**
   ```
   REACT_APP_API_BASE_URL=https://your-domain.com/api
   ```

2. **Error Handling**
   - Add try-catch di semua API calls
   - Show user-friendly error messages

3. **Loading States**
   - Show spinners/loaders saat loading
   - Disable buttons saat proses

4. **Authentication**
   - Implement JWT tokens
   - Add Authorization headers

---

Selamat! Frontend Anda sudah siap untuk berkomunikasi dengan backend Laravel! 🎉
