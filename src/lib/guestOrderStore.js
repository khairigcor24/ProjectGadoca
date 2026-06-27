const GUEST_ORDERS_KEY = 'gadocaa-guest-orders'

export function getGuestOrders() {
  try {
    const raw = localStorage.getItem(GUEST_ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveGuestOrders(orders) {
  localStorage.setItem(GUEST_ORDERS_KEY, JSON.stringify(orders))
}

export function createGuestOrder(customerInfo, items, total, paymentMethod = 'cash', status = 'Pending') {
  const orders = getGuestOrders()
  
  const newOrder = {
    id: `ORD-${Date.now()}`,
    name: customerInfo.name,
    phone: customerInfo.phone,
    address: customerInfo.address,
    items: items,
    total: total,
    paymentMethod: paymentMethod,
    status: status,
    createdAt: new Date().toISOString(),
  }
  
  orders.unshift(newOrder)
  saveGuestOrders(orders)
  return newOrder
}

export function formatOrderTotal(total) {
  return `Rp ${total.toLocaleString('id-ID')}`
}
