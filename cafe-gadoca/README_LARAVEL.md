# 🏠 CAFE GADOCA - Laravel Backend Setup

Selamat! Anda sekarang memiliki Laravel backend yang lengkap untuk aplikasi Cafe Gadoca dengan database yang sudah dikonfigurasi penuh.

## 📚 Dokumentasi File

Saya telah membuat 4 file dokumentasi lengkap untuk Anda:

### 1. **SETUP_DATABASE.md** ⚙️
Panduan lengkap untuk setup dan menjalankan Laravel:
- Setup MySQL database
- Konfigurasi environment (.env)
- Menjalankan migrations
- Menjalankan seeders
- Troubleshooting

👉 **Baca file ini terlebih dahulu untuk setup database!**

### 2. **DATABASE_STRUCTURE.md** 📊
Dokumentasi teknis struktur database:
- Schema detail setiap tabel
- Relationships antar tabel
- Diagram relasi
- Sample data
- API response examples
- Validasi input

👉 **Referensi teknis untuk memahami struktur data**

### 3. **REACT_INTEGRATION.md** 🔗
Panduan integrasi React dengan Laravel API:
- Membuat API service module
- Contoh implementasi di React components
- Contoh Create, Read, Update, Delete
- CORS configuration
- Testing dengan Postman
- Custom hooks

👉 **Gunakan ini untuk mengintegrasikan frontend React**

### 4. **README_LARAVEL.md** (File ini) 📋
Overview dan quick reference

---

## 🎯 Quick Start (5 Menit)

### 1. Setup Database
```bash
cd cafe-gadoca

# Pastikan MySQL running, lalu jalankan
php artisan migrate
php artisan db:seed
```

### 2. Jalankan Laravel Server
```bash
php artisan serve
```
Server akan berjalan di `http://localhost:8000`

### 3. Test API
Buka browser atau Postman:
```
GET http://localhost:8000/api/products
GET http://localhost:8000/api/categories
GET http://localhost:8000/api/transactions
```

### 4. Integrasikan dengan React
Lihat file `REACT_INTEGRATION.md` untuk contoh kode

---

## 📂 Struktur File yang Dibuat

```
cafe-gadoca/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           ├── CategoryController.php      (New)
│   │           ├── ProductController.php       (New)
│   │           └── TransactionController.php   (New)
│   └── Models/
│       ├── Category.php                        (New)
│       ├── Product.php                         (New)
│       ├── Transaction.php                     (New)
│       └── User.php                            (Updated)
│
├── database/
│   ├── migrations/
│   │   ├── 2026_06_16_080905_create_categories_table.php      (New)
│   │   ├── 2026_06_16_080903_create_products_table.php        (New)
│   │   └── 2026_06_16_080908_create_transactions_table.php    (New)
│   └── seeders/
│       ├── CategorySeeder.php                  (New)
│       ├── ProductSeeder.php                   (New)
│       ├── TransactionSeeder.php               (New)
│       └── DatabaseSeeder.php                  (Updated)
│
├── routes/
│   ├── api.php                                 (New)
│   └── web.php
│
├── SETUP_DATABASE.md                           (New)
├── DATABASE_STRUCTURE.md                       (New)
├── REACT_INTEGRATION.md                        (New)
└── .env                                        (Updated)
```

---

## 🗄️ Database Tables

| Tabel | Kolom | Fungsi |
|-------|-------|--------|
| **categories** | id, name, description, timestamps | Kategori produk |
| **products** | id, category_id, name, description, price, image, stock, timestamps | Daftar produk cafe |
| **transactions** | id, user_id, product_id, quantity, total_price, status, timestamps | Riwayat pembelian |
| **users** | id, name, email, password, timestamps | Data pelanggan |

---

## 🔌 API Endpoints

Semua endpoint tersedia dengan prefix `/api`:

### Categories
- `GET /api/categories` - List semua kategori
- `POST /api/categories` - Buat kategori baru
- `GET /api/categories/{id}` - Detail kategori
- `PUT /api/categories/{id}` - Update kategori
- `DELETE /api/categories/{id}` - Hapus kategori

### Products
- `GET /api/products` - List semua produk
- `POST /api/products` - Buat produk baru
- `GET /api/products/{id}` - Detail produk
- `PUT /api/products/{id}` - Update produk
- `DELETE /api/products/{id}` - Hapus produk

### Transactions
- `GET /api/transactions` - List semua transaksi
- `POST /api/transactions` - Buat transaksi baru
- `GET /api/transactions/{id}` - Detail transaksi
- `PUT /api/transactions/{id}` - Update transaksi
- `DELETE /api/transactions/{id}` - Hapus transaksi

---

## 📡 Sample Data Included

Saat menjalankan `php artisan db:seed`, akan membuat:

- **5 Kategori:**
  - Coffee, Tea, Pastries, Sandwiches, Desserts

- **12 Produk:**
  - Espresso, Americano, Latte, Cappuccino (Coffee)
  - Green Tea, Black Tea (Tea)
  - Croissant, Donut (Pastries)
  - Ham Sandwich, Chicken Sandwich (Sandwiches)
  - Chocolate Cake, Tiramisu (Desserts)

- **10 Users + 1 Test User**

- **10 Transaksi Sample**

---

## ✨ Features

✅ **Full CRUD Operations**
- Create, Read, Update, Delete untuk semua resources

✅ **Database Relationships**
- Categories → Products (1:N)
- Products → Transactions (1:N)
- Users → Transactions (1:N)

✅ **Eager Loading**
- Relationships otomatis di-load untuk prevent N+1 queries

✅ **Validation**
- Input validation di setiap controller

✅ **JSON API Responses**
- Clean, consistent JSON responses

✅ **Sample Data**
- Database seeders untuk testing

✅ **Complete Documentation**
- 4 dokumentasi lengkap untuk setup & integration

---

## 🔒 Environment Configuration

File `.env` sudah dikonfigurasi dengan:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cafe_gadoca
DB_USERNAME=root
DB_PASSWORD=
```

Sesuaikan jika password MySQL Anda berbeda!

---

## 🚀 Next Steps

1. **Setup Database** (5 menit)
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

2. **Run Server** (1 menit)
   ```bash
   php artisan serve
   ```

3. **Test API** (5 menit)
   - Buka Postman atau browser
   - Test endpoints di `http://localhost:8000/api`

4. **Integrate with React** (15-30 menit)
   - Baca `REACT_INTEGRATION.md`
   - Copy API service module ke project React
   - Update components untuk menggunakan API

5. **Test Full Stack** (10 menit)
   - Test create/read/update/delete dari React
   - Verify data muncul di Laravel dan sebaliknya

---

## 🆘 Troubleshooting

### MySQL tidak running
```bash
# Windows
# Buka Services dan cari MySQL, klik Start

# Mac
mysql.server start

# Linux
sudo service mysql start
```

### "could not find driver"
- Check PHP memiliki MySQL extension
- Update `.env` dengan `DB_CONNECTION=mysql`

### CORS Error
- Lihat section CORS di `REACT_INTEGRATION.md`
- Update `config/cors.php` dengan React domain

### Port 8000 sudah terpakai
```bash
php artisan serve --port=8001
```

---

## 📞 API Response Format

Semua response dalam format JSON:

**Success (200 OK):**
```json
{
  "id": 1,
  "name": "Espresso",
  "price": "25000.00",
  ...
}
```

**Created (201):**
```json
{
  "id": 13,
  "name": "New Product",
  ...
}
```

**No Content (204):** (untuk DELETE)
```
[kosong, hanya status code]
```

**Error (4xx/5xx):**
```json
{
  "message": "Error description",
  "errors": {
    "field": ["validation error"]
  }
}
```

---

## 🎓 Learning Resources

- **Laravel Documentation:** https://laravel.com/docs
- **Eloquent ORM:** https://laravel.com/docs/eloquent
- **API Resources:** https://laravel.com/docs/eloquent-resources
- **Migration:** https://laravel.com/docs/migrations

---

## 📝 Checklist

- [ ] MySQL database sudah dibuat
- [ ] `.env` sudah dikonfigurasi
- [ ] Migrations sudah dijalankan (`php artisan migrate`)
- [ ] Seeders sudah dijalankan (`php artisan db:seed`)
- [ ] Laravel server berjalan (`php artisan serve`)
- [ ] API endpoints bisa diakses
- [ ] React integration sudah dilakukan
- [ ] Full stack testing selesai

---

## 💡 Tips

1. **Development Mode**
   - Jika mengubah models/migrations, jalankan `php artisan migrate:fresh --seed` untuk reset database

2. **API Testing**
   - Gunakan Postman atau VS Code REST Client extension
   - Import sample requests dari docs

3. **Error Handling**
   - Check Laravel logs: `storage/logs/laravel.log`

4. **CORS Issues**
   - Development: Allow all origins
   - Production: Specify allowed domains

---

## 🎉 Selesai!

Anda sekarang memiliki:
- ✅ Laravel backend yang lengkap
- ✅ Database schema yang terstruktur
- ✅ API endpoints yang siap digunakan
- ✅ Sample data untuk testing
- ✅ Dokumentasi lengkap

**Silakan lanjutkan dengan integrasi React!**

---

**Last Updated:** 2026-06-16  
**Laravel Version:** 11.x  
**PHP Version:** 8.2+  
**Database:** MySQL 5.7+
