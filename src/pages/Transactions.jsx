import { useEffect, useState } from 'react'
import { getGuestOrders, formatOrderTotal } from '../lib/guestOrderStore'

function getPaymentMethodLabel(method) {
  const methods = {
    cash: '💵 Tunai',
    qris: '📱 QRIS',
    bank: '🏦 Bank',
  }
  return methods[method] || method
}

function Transactions() {
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {
    // Hardcoded transactions
    const defaultTransactions = [
      { id: 'TRX-2026-001', customer: 'Terry Franci', amount: '$980.00', status: 'Delivered' },
      { id: 'TRX-2026-002', customer: 'Alena Franci', amount: '$1,250.00', status: 'Pending' },
      { id: 'TRX-2026-003', customer: 'Jocelyn Kenter', amount: '$320.00', status: 'Delivered' },
      { id: 'TRX-2026-004', customer: 'Brandon Philips', amount: '$120.00', status: 'Canceled' },
    ]

    // Get guest orders from localStorage
    const guestOrders = getGuestOrders()
    const formattedGuestOrders = guestOrders.map((order) => ({
      id: order.id,
      customer: order.name,
      amount: formatOrderTotal(order.total),
      status: order.status,
      paymentMethod: order.paymentMethod || 'Tidak ada',
      phone: order.phone,
      address: order.address,
      items: order.items,
      createdAt: order.createdAt,
    }))

    // Combine and sort by creation date (newest first)
    const combined = [...formattedGuestOrders, ...defaultTransactions]
    setAllTransactions(combined)
  }, [])

  return (
    <section className="panel">
      <div className="table-head">
        <h3>Transaksi</h3>
        <button type="button">Ekspor</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pelanggan</th>
              <th>Jumlah</th>
              <th>Metode Bayar</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allTransactions.map((trx) => (
              <tr key={trx.id}>
                <td>{trx.id}</td>
                <td>{trx.customer}</td>
                <td>{trx.amount}</td>
                <td>{trx.paymentMethod ? getPaymentMethodLabel(trx.paymentMethod) : '—'}</td>
                <td><span className={`badge ${trx.status.toLowerCase()}`}>{trx.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Transactions
