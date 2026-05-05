function Transactions() {
  const transactions = [
    { id: 'TRX-2026-001', customer: 'Terry Franci', amount: '$980.00', status: 'Delivered' },
    { id: 'TRX-2026-002', customer: 'Alena Franci', amount: '$1,250.00', status: 'Pending' },
    { id: 'TRX-2026-003', customer: 'Jocelyn Kenter', amount: '$320.00', status: 'Delivered' },
    { id: 'TRX-2026-004', customer: 'Brandon Philips', amount: '$120.00', status: 'Canceled' },
  ]

  return (
    <section className="panel">
      <div className="table-head">
        <h3>Transactions</h3>
        <button type="button">Export</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx.id}>
                <td>{trx.id}</td>
                <td>{trx.customer}</td>
                <td>{trx.amount}</td>
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
