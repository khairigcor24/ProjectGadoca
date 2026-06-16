const CART_STORAGE_KEY = 'gadocaa-cart'

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export function addToCart(product, quantity = 1) {
  const cart = getCart()
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category,
      quantity,
    })
  }

  saveCart(cart)
  return cart
}

export function removeFromCart(productId) {
  const cart = getCart()
  const filtered = cart.filter((item) => item.id !== productId)
  saveCart(filtered)
  return filtered
}

export function updateCartQuantity(productId, quantity) {
  const cart = getCart()
  const item = cart.find((item) => item.id === productId)
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId)
    }
    item.quantity = quantity
    saveCart(cart)
  }
  
  return cart
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY)
}

export function getCartTotal() {
  const cart = getCart()
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getCartCount() {
  const cart = getCart()
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
