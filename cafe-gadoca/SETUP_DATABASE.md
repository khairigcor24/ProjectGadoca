# SETUP DATABASE LARAVEL - CAFE GADOCA

Saya telah membuat backend Laravel yang lengkap untuk menyimpan database Cafe Gadoca. Berikut adalah struktur yang telah dibuat:

## 📁 Struktur Database

### Tabel yang Dibuat:
1. **categories** - Kategori produk (Coffee, Tea, Pastries, Sandwiches, Desserts)
2. **products** - Produk dengan harga, stok, dan kategori
3. **transactions** - Transaksi pembelian
4. **users** - User/pelanggan (sudah ada)

## 🗂️ File-File yang Dibuat

### Migrations (Database Schema)
- `database/migrations/2026_06_16_080905_create_categories_table.php`
- `database/migrations/2026_06_16_080903_create_products_table.php`
- `database/migrations/2026_06_16_080908_create_transactions_table.php`

### Models (Eloquent ORM)
- `app/Models/Category.php` - dengan relationship ke products
- `app/Models/Product.php` - dengan relationship ke category dan transactions
- `app/Models/Transaction.php` - dengan relationship ke user dan product
- `app/Models/User.php` - update dengan relationship ke transactions

### Controllers (API Endpoints)
- `app/Http/Controllers/Api/CategoryController.php` - Full CRUD
- `app/Http/Controllers/Api/ProductController.php` - Full CRUD
- `app/Http/Controllers/Api/TransactionController.php` - Full CRUD

### Routes
- `routes/api.php` - Semua API endpoints sudah dikonfigurasi

### Seeders (Sample Data)
- `database/seeders/CategorySeeder.php` - 5 kategori sample
- `database/seeders/ProductSeeder.php` - 12 produk sample
- `database/seeders/TransactionSeeder.php` - 10 transaksi sample
- `database/seeders/DatabaseSeeder.php` - Updated untuk memanggil semua seeders

## 🚀 Cara Setup dan Menjalankan

### Step 1: Setup MySQL Database
Pastikan MySQL sudah running, kemudian buat database baru:

```sql
CREATE DATABASE cafe_gadoca;
```

Atau menggunakan MySQL Client di terminal:
```bash
mysql -u root -p
CREATE DATABASE cafe_gadoca;
EXIT;
```

### Step 2: Konfigurasi Environment (.env)
File `.env` sudah dikonfigurasi dengan:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cafe_gadoca
DB_USERNAME=root
DB_PASSWORD=
```

Jika password MySQL Anda berbeda, ubah `DB_PASSWORD=` sesuai password Anda.

### Step 3: Jalankan Migrations
Navigasi ke folder `cafe-gadoca`:

```bash
cd cafe-gadoca
php artisan migrate
```

### Step 4: Jalankan Seeders (Opsional - untuk sample data)
```bash
php artisan db:seed
```

Ini akan membuat:
- 10 user random + 1 test user
- 5 kategori produk
- 12 produk sample
- 10 transaksi sample

### Step 5: Jalankan Laravel Development Server
```bash
php artisan serve
```

Server akan berjalan di `http://localhost:8000`

## 📡 API Endpoints

Semua endpoints bisa diakses dari React frontend dengan prefix `/api`

### Categories
- `GET /api/categories` - Daftar semua kategori
- `POST /api/categories` - Buat kategori baru
- `GET /api/categories/{id}` - Detail kategori
- `PUT /api/categories/{id}` - Update kategori
- `DELETE /api/categories/{id}` - Hapus kategori

### Products
- `GET /api/products` - Daftar semua produk (dengan kategori)
- `POST /api/products` - Buat produk baru
- `GET /api/products/{id}` - Detail produk
- `PUT /api/products/{id}` - Update produk
- `DELETE /api/products/{id}` - Hapus produk

### Transactions
- `GET /api/transactions` - Daftar semua transaksi (dengan user & product)
- `POST /api/transactions` - Buat transaksi baru
- `GET /api/transactions/{id}` - Detail transaksi
- `PUT /api/transactions/{id}` - Update transaksi
- `DELETE /api/transactions/{id}` - Hapus transaksi

## 📝 Contoh Request API

### Menampilkan semua produk
```
GET http://localhost:8000/api/products
```

### Membuat kategori baru
```
POST http://localhost:8000/api/categories
Content-Type: application/json

{
  "name": "Beverages",
  "description": "Minuman segar"
}
```

### Membuat produk baru
```
POST http://localhost:8000/api/products
Content-Type: application/json

{
  "category_id": 1,
  "name": "Iced Coffee",
  "description": "Kopi dingin segar",
  "price": 35000,
  "stock": 50
}
```

### Membuat transaksi
```
POST http://localhost:8000/api/transactions
Content-Type: application/json

{
  "user_id": 1,
  "product_id": 1,
  "quantity": 2,
  "total_price": 50000,
  "status": "completed"
}
```

## 🔗 Hubungkan React Frontend ke API

Update file React yang mengakses API (contoh: `src/pages/Product.jsx`):

```javascript
// Fetch produk dari API
const fetchProducts = async () => {
  const response = await fetch('http://localhost:8000/api/products');
  const data = await response.json();
  return data;
};

// Buat produk baru
const createProduct = async (productData) => {
  const response = await fetch('http://localhost:8000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  });
  return response.json();
};
```

## 🛠️ Troubleshooting

### Error: "could not find driver"
- Pastikan MySQL sudah running
- Check konfigurasi `.env` sudah benar

### Error: "SQLSTATE[HY000] [2002]"
- MySQL service tidak running
- Jalankan: `mysql.server start` (Mac/Linux) atau buka MySQL dari Services (Windows)

### CORS Issues
Jika mendapat error CORS saat request dari React, update `config/cors.php`:

```php
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
```

Atau install package CORS:
```bash
composer require fruitcake/laravel-cors
```

## ✅ Status Setup

- ✅ Models dibuat dengan relationships
- ✅ Migrations dibuat dengan kolom lengkap
- ✅ Controllers dibuat dengan CRUD methods
- ✅ Routes dikonfigurasi
- ✅ Seeders siap dengan sample data
- ✅ .env sudah dikonfigurasi untuk MySQL
- ⏳ Tinggal menjalankan `php artisan migrate` dan `php artisan db:seed`

---

**Selamat! Database Laravel Anda sudah siap digunakan! 🎉**
