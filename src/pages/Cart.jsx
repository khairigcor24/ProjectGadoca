import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatMenuPrice } from '../lib/menuStore'
import { getCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal } from '../lib/cartStore'
import { createGuestOrder } from '../lib/guestOrderStore'
import { PlusIcon, MinusIcon } from '../components/Icons'
import qrisImage from '../assets/qrisgadoca.png'
import { supabase } from '../lib/supabase'

function Cart() {
  const [cart, setCart] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [showQrisPreview, setShowQrisPreview] = useState(false)
  const [qrisCountdown, setQrisCountdown] = useState(120)
  const [qrisExpired, setQrisExpired] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setCart(getCart())
    
    // Otomatis isi nomor meja jika ada di URL QR Code
    const params = new URLSearchParams(window.location.search)
    const tableParam = params.get('table')
    if (tableParam) {
      setCustomerInfo(prev => ({ ...prev, address: tableParam }))
      localStorage.setItem('gadoca_table', tableParam)
    } else {
      const savedTable = localStorage.getItem('gadoca_table')
      if (savedTable) {
        setCustomerInfo(prev => ({ ...prev, address: savedTable }))
      }
    }
  }, [])

  useEffect(() => {
    if (!showQrisPreview || paymentMethod !== 'qris' || qrisExpired) {
      return undefined
    }

    if (qrisCountdown <= 0) {
      setQrisExpired(true)
      return undefined
    }

    const timerId = setInterval(() => {
      setQrisCountdown((prev) => {
        if (prev <= 1) {
          setQrisExpired(true)
          clearInterval(timerId)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [showQrisPreview, paymentMethod, qrisCountdown, qrisExpired])

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    return `${minutes}:${secs}`
  }

  function handleRemoveItem(id) {
    removeFromCart(id)
    setCart(getCart())
  }

  function handleQuantityChange(id, quantity) {
    updateCartQuantity(id, quantity)
    setCart(getCart())
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  async function handleQrisPaymentConfirmed() {
    const total = getCartTotal()
    
    // Simpan ke Supabase
    const { error } = await supabase.from('orders').insert([{
      id: `ORD-${Date.now().toString().slice(-4)}`,
      customer_name: customerInfo.name,
      table_number: customerInfo.address, 
      items: cart,
      total_amount: total,
      status: 'NEW'
    }])

    if (error) {
      alert('Gagal mengirim pesanan: ' + error.message)
      return
    }

    createGuestOrder(customerInfo, cart, total, paymentMethod, 'Delivered')
    setShowQrisPreview(false)
    setOrderSuccess(true)

    setTimeout(() => {
      clearCart()
      setCart([])
      setCustomerInfo({ name: '', phone: '', address: '' })
      setPaymentMethod('cash')
      setQrisExpired(false)
      setQrisCountdown(120)
      setOrderSuccess(false)
      navigate('/transactions')
    }, 1500)
  }

  async function handleCheckout(e) {
    e.preventDefault()

    if (!customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()) {
      alert('Mohon lengkapi semua data.')
      return
    }

    if (cart.length === 0) {
      alert('Keranjang Anda kosong.')
      return
    }

    if (paymentMethod === 'qris') {
      setShowQrisPreview(true)
      setQrisExpired(false)
      setQrisCountdown(120)
      return
    }

    const total = getCartTotal()
    
    // Simpan ke Supabase
    const { error } = await supabase.from('orders').insert([{
      id: `ORD-${Date.now().toString().slice(-4)}`,
      customer_name: customerInfo.name,
      table_number: customerInfo.address, // karena di UI memakai field alamat sbg meja? atau address.
      items: cart,
      total_amount: total,
      status: 'NEW'
    }])

    if (error) {
      alert('Gagal mengirim pesanan: ' + error.message)
      return
    }

    createGuestOrder(customerInfo, cart, total, paymentMethod) // tetep simpan lokal buat history guest


    setOrderSuccess(true)
    setTimeout(() => {
      clearCart()
      setCart([])
      setCustomerInfo({ name: '', phone: '', address: '' })
      setPaymentMethod('cash')
      setOrderSuccess(false)
      navigate('/transactions')
    }, 1500)
  }

  if (orderSuccess) {
    return (
      <section className="panel">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
          <h2>Pesanan Berhasil!</h2>
          <p style={{ color: '#6b7280', marginTop: '1rem' }}>
            Terima kasih telah memesan. Pesanan Anda akan kami proses segera.
          </p>
        </div>
      </section>
    )
  }

  return (
    <div className="page-stack">
      <section className="panel">
        <h2 style={{ marginBottom: '1.5rem' }}>Keranjang Belanja</h2>

        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
            Keranjang Anda kosong. <a href="/product" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Belanja sekarang</a>
          </p>
        ) : (
          <>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '1rem' }}>Produk</th>
                    <th style={{ textAlign: 'center', padding: '1rem' }}>Harga</th>
                    <th style={{ textAlign: 'center', padding: '1rem' }}>Jumlah</th>
                    <th style={{ textAlign: 'right', padding: '1rem' }}>Subtotal</th>
                    <th style={{ textAlign: 'center', padding: '1rem' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div>
                            <p style={{ fontWeight: '500' }}>{item.title}</p>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', padding: '1rem' }}>
                        Rp {item.price.toLocaleString('id-ID')}
                      </td>
                      <td style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            style={{
                              width: '32px',
                              height: '32px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              backgroundColor: '#f9fafb',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#374151',
                            }}
                          >
                            <MinusIcon size={16} />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            min="1"
                            style={{
                              width: '50px',
                              height: '32px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              textAlign: 'center',
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            style={{
                              width: '32px',
                              height: '32px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              backgroundColor: '#f9fafb',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#374151',
                            }}
                          >
                            <PlusIcon size={16} />
                          </button>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', padding: '1rem' }}>
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </td>
                      <td style={{ textAlign: 'center', padding: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                          }}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <form onSubmit={handleCheckout}>
                <h3 style={{ marginBottom: '1rem' }}>Data Pelanggan</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Masukkan nama Anda"
                    required
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="08xx xxxx xxxx"
                    required
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Nomor Meja
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Masukkan nomor meja (misal: Meja 5)"
                    required
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '500' }}>
                    Metode Pembayaran
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { value: 'cash', label: '💵 Tunai (Cash)', description: 'Bayar saat barang tiba' },
                      { value: 'qris', label: '📱 QRIS', description: 'Scan QR code kami' },
                      { value: 'bank', label: '🏦 Transfer Bank', description: 'Transfer ke rekening kami' },
                    ].map((method) => (
                      <label
                        key={method.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          backgroundColor: paymentMethod === method.value ? '#f0fdf4' : '#f9fafb',
                          borderColor: paymentMethod === method.value ? '#10b981' : '#d1d5db',
                          transition: 'all 0.2s',
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={paymentMethod === method.value}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ marginRight: '0.75rem', cursor: 'pointer' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500' }}>{method.label}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{method.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {showQrisPreview && paymentMethod === 'qris' && (
                  <div
                    style={{
                      marginBottom: '1.5rem',
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ margin: 0 }}>QRIS</h4>
                        <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.95rem' }}>
                          Scan QR code berikut dengan aplikasi yang mendukung QRIS untuk membayar.
                        </p>
                      </div>
                      <span style={{ fontWeight: '700', color: qrisExpired ? '#dc2626' : '#10b981' }}>
                        {qrisExpired ? 'Expired' : formatTime(qrisCountdown)}
                      </span>
                    </div>
                    <img
                      src={qrisImage}
                      alt="QRIS"
                      style={{ width: '100%', maxWidth: '320px', borderRadius: '16px', display: 'block', margin: '0 auto' }}
                    />
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                      {qrisExpired
                        ? 'Kode QR sudah kadaluarsa. Silakan tekan Checkout lagi untuk membuat kode baru.'
                        : 'Setelah scan berhasil, selesaikan pembayaran di aplikasi Anda.'}
                    </p>
                    <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                      {qrisExpired ? (
                        <button
                          type="button"
                          onClick={() => {
                            setQrisExpired(false)
                            setQrisCountdown(120)
                            setShowQrisPreview(true)
                          }}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          Buat Ulang QRIS
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleQrisPaymentConfirmed}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          Saya sudah bayar
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                  }}
                >
                  Checkout
                </button>
              </form>

              <div>
                <h3 style={{ marginBottom: '1rem' }}>Ringkasan Pesanan</h3>
                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid #e5e7eb',
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: '500' }}>{item.title}</p>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>x{item.quantity}</p>
                      </div>
                      <p style={{ fontWeight: '500' }}>
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}

                  <div
                    style={{
                      paddingTop: '1rem',
                      borderTop: '2px solid #e5e7eb',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                    }}
                  >
                    <span>Total:</span>
                    <span>Rp {getCartTotal().toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Cart
