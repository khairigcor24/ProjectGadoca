import { useState } from 'react'
import { addCustomMenu, DEFAULT_MENU_IMAGE, MENU_CATEGORIES } from '../lib/menuStore'

const emptyForm = {
  title: '',
  category: MENU_CATEGORIES[0],
  price: '',
  stock: '',
  description: '',
  thumbnail: '',
}

function MenuFormModal({ open, onClose, onAdded }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  if (!open) return null

  function handleChange(e) {
    const { name, value, type, files } = e.target
    
    if (type === 'file' && files) {
      const file = files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setForm((prev) => ({ ...prev, [name]: event.target.result }))
        }
        reader.readAsDataURL(file)
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.title.trim()) {
      setError('Nama menu wajib diisi.')
      return
    }
    if (!form.price || Number(form.price) <= 0) {
      setError('Harga harus lebih dari 0.')
      return
    }
    if (form.stock === '' || Number(form.stock) < 0) {
      setError('Stok tidak valid.')
      return
    }

    const newItem = addCustomMenu(form)
    setForm(emptyForm)
    onAdded(newItem)
    onClose()
  }

  function handleClose() {
    setForm(emptyForm)
    setError('')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-form-title"
      >
        <div className="modal-card__head">
          <h3 id="menu-form-title">Tambah Menu Baru</h3>
          <button type="button" className="modal-close" onClick={handleClose} aria-label="Tutup">
            ×
          </button>
        </div>

        <form className="menu-form" onSubmit={handleSubmit}>
          <label>
            Nama Menu
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="Contoh: Latte Signature"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <div className="menu-form__row">
            <label>
              Kategori
              <select name="category" className="form-input" value={form.category} onChange={handleChange}>
                {MENU_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Harga (Rp)
              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="45000"
                min="1"
                value={form.price}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Stok
            <input
              type="number"
              name="stock"
              className="form-input"
              placeholder="10"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Deskripsi
            <textarea
              name="description"
              className="form-input form-textarea"
              placeholder="Deskripsi singkat menu..."
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Upload Gambar (opsional)
            <input
              type="file"
              name="thumbnail"
              className="form-input"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          {error ? <p className="login-error">{error}</p> : null}

          <div className="modal-card__actions">
            <button type="button" className="btn-outline" onClick={handleClose}>
              Batal
            </button>
            <button type="submit">Simpan Menu</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuFormModal
