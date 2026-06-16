const STORAGE_KEY = 'gadocaa-menu'

export const DEFAULT_MENU_IMAGE =
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80'

export const MENU_CATEGORIES = ['Kopi', 'Pastry', 'Minuman', 'Roti', 'Makanan', 'Snack']

export function getCustomMenus() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCustomMenus(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addCustomMenu(data) {
  const items = getCustomMenus()
  const thumbnail = data.thumbnail?.trim() || DEFAULT_MENU_IMAGE

  const newItem = {
    id: `local-${Date.now()}`,
    title: data.title.trim(),
    category: data.category,
    price: Number(data.price),
    stock: Number(data.stock),
    description: data.description?.trim() || '',
    thumbnail,
    images: [thumbnail],
    brand: 'Gadocaa',
    rating: null,
    isLocal: true,
  }

  items.unshift(newItem)
  saveCustomMenus(items)
  return newItem
}

export function getCustomMenuById(id) {
  return getCustomMenus().find((item) => String(item.id) === String(id)) ?? null
}

export function isLocalMenuId(id) {
  return String(id).startsWith('local-')
}

export function formatMenuPrice(product) {
  const value = Number(product.price)
  if (product.isLocal) {
    return `Rp ${value.toLocaleString('id-ID')}`
  }
  return `$${value}`
}
