import { useState } from 'react'

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Makanan', slug: 'makanan', description: '', status: 'Aktif' },
  { id: 2, name: 'Minuman', slug: 'minuman', description: '', status: 'Aktif' },
  { id: 3, name: 'Paket Combo', slug: 'paket-combo', description: '', status: 'Aktif' },
]

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function CategoryModal({ open, onClose, onSave, editData }) {
  const [name, setName] = useState(editData?.name || '')
  const [slug, setSlug] = useState(editData?.slug || '')
  const [description, setDescription] = useState(editData?.description || '')
  const [status, setStatus] = useState(editData?.status || 'Aktif')
  const [slugTouched, setSlugTouched] = useState(false)

  // Sync state when editData changes
  useState(() => {
    setName(editData?.name || '')
    setSlug(editData?.slug || '')
    setDescription(editData?.description || '')
    setStatus(editData?.status || 'Aktif')
    setSlugTouched(false)
  })

  function handleNameChange(e) {
    const val = e.target.value
    setName(val)
    if (!slugTouched) {
      setSlug(slugify(val))
    }
  }

  function handleSlugChange(e) {
    setSlugTouched(true)
    setSlug(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), slug: slug || slugify(name), description, status })
    onClose()
  }

  if (!open) return null

  return (
    <div className="cat-modal-overlay" onClick={onClose}>
      <div className="cat-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cat-modal__header">
          <h3 className="cat-modal__title">
            {editData ? 'Edit Kategori' : 'Tambah Kategori'}
          </h3>
          <button type="button" className="cat-modal__close" onClick={onClose} aria-label="Tutup">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="cat-modal__form">
          <div className="cat-modal__field">
            <label htmlFor="cat-name">Nama Kategori <span className="cat-required">*</span></label>
            <input
              id="cat-name"
              type="text"
              className="form-input"
              placeholder="Contoh: Minuman"
              value={name}
              onChange={handleNameChange}
              required
              autoFocus
            />
          </div>

          <div className="cat-modal__field">
            <label htmlFor="cat-slug">Slug</label>
            <input
              id="cat-slug"
              type="text"
              className="form-input cat-slug-input"
              placeholder="contoh: minuman"
              value={slug}
              onChange={handleSlugChange}
            />
            <p className="cat-modal__hint">Digunakan sebagai URL identifier. Otomatis dibuat dari nama.</p>
          </div>

          <div className="cat-modal__field">
            <label htmlFor="cat-desc">Deskripsi</label>
            <textarea
              id="cat-desc"
              className="form-input cat-textarea"
              placeholder="Deskripsi kategori (opsional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="cat-modal__field">
            <label htmlFor="cat-status">Status</label>
            <select
              id="cat-status"
              className="form-input cat-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>

          <div className="cat-modal__actions">
            <button type="button" className="cat-btn cat-btn--cancel" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="cat-btn cat-btn--save">
              {editData ? 'Simpan Perubahan' : 'Tambah Kategori'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ConfirmDialog({ open, onClose, onConfirm, categoryName }) {
  if (!open) return null
  return (
    <div className="cat-modal-overlay" onClick={onClose}>
      <div className="cat-modal cat-modal--sm" onClick={(e) => e.stopPropagation()}>
        <div className="cat-modal__header">
          <h3 className="cat-modal__title">Hapus Kategori</h3>
          <button type="button" className="cat-modal__close" onClick={onClose}>✕</button>
        </div>
        <p className="cat-confirm__text">
          Yakin ingin menghapus kategori <strong>"{categoryName}"</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="cat-modal__actions">
          <button type="button" className="cat-btn cat-btn--cancel" onClick={onClose}>
            Batal
          </button>
          <button type="button" className="cat-btn cat-btn--delete" onClick={onConfirm}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

function Categories() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null) // { id, name }
  const [nextId, setNextId] = useState(INITIAL_CATEGORIES.length + 1)

  function handleOpenAdd() {
    setEditData(null)
    setShowModal(true)
  }

  function handleOpenEdit(cat) {
    setEditData(cat)
    setShowModal(true)
  }

  function handleSave(data) {
    if (editData) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editData.id ? { ...c, ...data } : c))
      )
    } else {
      setCategories((prev) => [...prev, { id: nextId, ...data }])
      setNextId((n) => n + 1)
    }
    setEditData(null)
  }

  function handleConfirmDelete() {
    setCategories((prev) => prev.filter((c) => c.id !== confirmDelete.id))
    setConfirmDelete(null)
  }

  return (
    <>
      <div className="cat-page">
        {/* Page header */}
        <div className="cat-page__header">
          <div>
            <h2 className="cat-page__title">Kelola Kategori</h2>
            <p className="cat-page__subtitle">
              Atur kategori untuk pengelompokan menu.
            </p>
          </div>
          <button
            type="button"
            id="btn-tambah-kategori"
            className="cat-btn cat-btn--add"
            onClick={handleOpenAdd}
          >
            <span className="cat-btn__icon">+</span>
            Tambah Kategori
          </button>
        </div>

        {/* Table */}
        <div className="cat-table-wrap">
          <table className="cat-table">
            <thead>
              <tr>
                <th className="cat-th cat-th--no">NO</th>
                <th className="cat-th">NAMA KATEGORI</th>
                <th className="cat-th">SLUG</th>
                <th className="cat-th">DESKRIPSI</th>
                <th className="cat-th">STATUS</th>
                <th className="cat-th cat-th--right">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="cat-empty">
                    Belum ada kategori. Klik "+ Tambah Kategori" untuk mulai.
                  </td>
                </tr>
              ) : (
                categories.map((cat, index) => (
                  <tr key={cat.id} className="cat-row">
                    <td className="cat-td cat-td--no">{index + 1}</td>
                    <td className="cat-td cat-td--name">{cat.name}</td>
                    <td className="cat-td cat-td--slug">{cat.slug}</td>
                    <td className="cat-td cat-td--desc">
                      {cat.description || <span className="cat-dash">—</span>}
                    </td>
                    <td className="cat-td">
                      <span
                        className={`cat-badge ${cat.status === 'Aktif' ? 'cat-badge--aktif' : 'cat-badge--nonaktif'}`}
                      >
                        <span className="cat-badge__dot" />
                        {cat.status}
                      </span>
                    </td>
                    <td className="cat-td cat-td--actions">
                      <button
                        type="button"
                        id={`btn-edit-cat-${cat.id}`}
                        className="cat-action cat-action--edit"
                        onClick={() => handleOpenEdit(cat)}
                        title="Edit kategori"
                      >
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        type="button"
                        id={`btn-hapus-cat-${cat.id}`}
                        className="cat-action cat-action--delete"
                        onClick={() => setConfirmDelete({ id: cat.id, name: cat.name })}
                        title="Hapus kategori"
                      >
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M6 2h8M5 5h10l-1 12H6L5 5Zm4 3v7m2-7v7" />
                        </svg>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryModal
        open={showModal}
        onClose={() => { setShowModal(false); setEditData(null) }}
        onSave={handleSave}
        editData={editData}
      />

      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
        categoryName={confirmDelete?.name}
      />
    </>
  )
}

export default Categories
