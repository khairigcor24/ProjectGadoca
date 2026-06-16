# 📊 STRUKTUR DATABASE - CAFE GADOCA

## Database Schema

### Tabel: `categories`
Menyimpan kategori produk cafe
```sql
CREATE TABLE categories (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

**Relasi:**
- `hasMany` → products

---

### Tabel: `products`
Menyimpan detail produk yang dijual di cafe
```sql
CREATE TABLE products (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  category_id BIGINT UNSIGNED NULLABLE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  stock INT DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
)
```

**Relasi:**
- `belongsTo` → Category
- `hasMany` → Transactions

---

### Tabel: `transactions`
Menyimpan data pembelian/transaksi pelanggan
```sql
CREATE TABLE transactions (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)
```

**Relasi:**
- `belongsTo` → User
- `belongsTo` → Product

---

### Tabel: `users` (sudah ada)
Menyimpan data user/pelanggan
```sql
CREATE TABLE users (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified_at TIMESTAMP,
  password VARCHAR(255) NOT NULL,
  remember_token VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

**Relasi (diperbaharui):**
- `hasMany` → Transactions

---

## 🔗 Relationship Diagram

```
┌──────────────────┐
│   categories     │
├──────────────────┤
│ id (PK)          │
│ name (UNIQUE)    │
│ description      │
└──────────────────┘
        │
        │ 1..n
        │
┌──────────────────┐         ┌──────────────────┐
│    products      │         │     users        │
├──────────────────┤         ├──────────────────┤
│ id (PK)          │         │ id (PK)          │
│ category_id (FK) │────┐    │ name             │
│ name             │    │    │ email (UNIQUE)   │
│ description      │    │    │ password         │
│ price            │    │    └──────────────────┘
│ image            │    │           ▲
│ stock            │    │           │ 1..n
└──────────────────┘    │           │
        ▲               │    ┌──────────────────┐
        │ 1..n          │    │  transactions    │
        │               │    ├──────────────────┤
        │               └────│ id (PK)          │
        │                    │ user_id (FK)     │
        │                    │ product_id (FK)  │
        │                    │ quantity         │
        │                    │ total_price      │
        │                    │ status           │
        │                    └──────────────────┘
        │ many
        │
       (1)
```

---

## 📋 Sample Data

### Categories
| ID | Name | Description |
|---|---|---|
| 1 | Coffee | Espresso, Americano, Latte, Cappuccino, dan kopi favorit lainnya |
| 2 | Tea | Teh panas, teh dingin, dan minuman teh premium |
| 3 | Pastries | Croissant, donut, dan kue-kue lezat lainnya |
| 4 | Sandwiches | Sandwich roti hangat dan makanan ringan lainnya |
| 5 | Desserts | Kue, pudding, dan hidangan penutup lainnya |

### Products (Sample)
| ID | Category | Name | Price | Stock |
|---|---|---|---|---|
| 1 | Coffee | Espresso | Rp 25,000 | 50 |
| 2 | Coffee | Americano | Rp 30,000 | 60 |
| 3 | Coffee | Latte | Rp 40,000 | 80 |
| 4 | Coffee | Cappuccino | Rp 45,000 | 70 |
| 5 | Tea | Green Tea | Rp 20,000 | 40 |
| 6 | Tea | Black Tea | Rp 25,000 | 35 |
| 7 | Pastries | Croissant | Rp 35,000 | 30 |
| 8 | Pastries | Donut | Rp 20,000 | 50 |
| 9 | Sandwiches | Ham Sandwich | Rp 45,000 | 25 |
| 10 | Sandwiches | Chicken Sandwich | Rp 50,000 | 20 |
| 11 | Desserts | Chocolate Cake | Rp 60,000 | 15 |
| 12 | Desserts | Tiramisu | Rp 55,000 | 20 |

---

## 📤 API Response Examples

### GET /api/categories
```json
[
  {
    "id": 1,
    "name": "Coffee",
    "description": "Espresso, Americano, Latte, Cappuccino, dan kopi favorit lainnya",
    "created_at": "2026-06-16T08:09:05.000000Z",
    "updated_at": "2026-06-16T08:09:05.000000Z",
    "products": [
      {
        "id": 1,
        "category_id": 1,
        "name": "Espresso",
        "description": "Kopi espresso murni",
        "price": "25000.00",
        "image": null,
        "stock": 50,
        "created_at": "2026-06-16T08:09:10.000000Z",
        "updated_at": "2026-06-16T08:09:10.000000Z"
      }
    ]
  }
]
```

### GET /api/products
```json
[
  {
    "id": 1,
    "category_id": 1,
    "name": "Espresso",
    "description": "Kopi espresso murni",
    "price": "25000.00",
    "image": null,
    "stock": 50,
    "created_at": "2026-06-16T08:09:10.000000Z",
    "updated_at": "2026-06-16T08:09:10.000000Z",
    "category": {
      "id": 1,
      "name": "Coffee",
      "description": "Espresso, Americano, Latte, Cappuccino, dan kopi favorit lainnya",
      "created_at": "2026-06-16T08:09:05.000000Z",
      "updated_at": "2026-06-16T08:09:05.000000Z"
    }
  }
]
```

### GET /api/transactions
```json
[
  {
    "id": 1,
    "user_id": 1,
    "product_id": 1,
    "quantity": 2,
    "total_price": "50000.00",
    "status": "completed",
    "created_at": "2026-06-16T08:09:15.000000Z",
    "updated_at": "2026-06-16T08:09:15.000000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-06-16T08:09:00.000000Z",
      "updated_at": "2026-06-16T08:09:00.000000Z"
    },
    "product": {
      "id": 1,
      "category_id": 1,
      "name": "Espresso",
      "description": "Kopi espresso murni",
      "price": "25000.00",
      "image": null,
      "stock": 50,
      "created_at": "2026-06-16T08:09:10.000000Z",
      "updated_at": "2026-06-16T08:09:10.000000Z"
    }
  }
]
```

### POST /api/products (Create)
**Request:**
```json
{
  "category_id": 1,
  "name": "Cold Brew",
  "description": "Kopi dingin 12 jam",
  "price": 45000,
  "image": "cold-brew.jpg",
  "stock": 30
}
```

**Response (201 Created):**
```json
{
  "id": 13,
  "category_id": 1,
  "name": "Cold Brew",
  "description": "Kopi dingin 12 jam",
  "price": "45000.00",
  "image": "cold-brew.jpg",
  "stock": 30,
  "created_at": "2026-06-16T10:00:00.000000Z",
  "updated_at": "2026-06-16T10:00:00.000000Z",
  "category": {
    "id": 1,
    "name": "Coffee",
    "description": "Espresso, Americano, Latte, Cappuccino, dan kopi favorit lainnya",
    "created_at": "2026-06-16T08:09:05.000000Z",
    "updated_at": "2026-06-16T08:09:05.000000Z"
  }
}
```

### PUT /api/products/{id} (Update)
**Request:**
```json
{
  "price": 48000,
  "stock": 25
}
```

**Response (200 OK):**
```json
{
  "id": 13,
  "category_id": 1,
  "name": "Cold Brew",
  "description": "Kopi dingin 12 jam",
  "price": "48000.00",
  "image": "cold-brew.jpg",
  "stock": 25,
  "created_at": "2026-06-16T10:00:00.000000Z",
  "updated_at": "2026-06-16T10:30:00.000000Z",
  "category": {
    "id": 1,
    "name": "Coffee",
    "description": "Espresso, Americano, Latte, Cappuccino, dan kopi favorit lainnya",
    "created_at": "2026-06-16T08:09:05.000000Z",
    "updated_at": "2026-06-16T08:09:05.000000Z"
  }
}
```

### DELETE /api/products/{id}
**Response (204 No Content)** - response kosong, status 204

---

## 🔄 Relationship Usage dalam Laravel

### Eager Loading
```php
// Mengambil products beserta categorynya
$products = Product::with('category')->get();

// Mengambil transactions beserta user dan productnya
$transactions = Transaction::with('user', 'product')->get();

// Mengambil categories beserta semua products-nya
$categories = Category::with('products')->get();
```

### Querying Relations
```php
// Ambil semua products dari kategori Coffee
$coffeeProducts = Category::where('name', 'Coffee')->first()->products;

// Ambil transaksi dari user tertentu
$userTransactions = User::find(1)->transactions;

// Filter products dengan harga tertentu
$expensiveProducts = Product::where('price', '>', 50000)->get();
```

---

## ✅ Validasi Input

### POST /api/categories
```json
{
  "name": "required|string|unique|max:255",
  "description": "nullable|string"
}
```

### POST /api/products
```json
{
  "category_id": "nullable|exists:categories,id",
  "name": "required|string|max:255",
  "description": "nullable|string",
  "price": "required|numeric|min:0",
  "image": "nullable|string",
  "stock": "required|integer|min:0"
}
```

### POST /api/transactions
```json
{
  "user_id": "required|exists:users,id",
  "product_id": "required|exists:products,id",
  "quantity": "required|integer|min:1",
  "total_price": "required|numeric|min:0",
  "status": "sometimes|in:pending,completed,cancelled"
}
```

---

## 🎯 Notes

- Semua price stored sebagai DECIMAL(10, 2) untuk precision
- Status transaction bisa: `pending`, `completed`, `cancelled`
- Foreign keys menggunakan CASCADE/SET NULL untuk data integrity
- Timestamps otomatis (created_at, updated_at)
- Relasi di-eager load secara default di Controllers untuk prevent N+1 queries
