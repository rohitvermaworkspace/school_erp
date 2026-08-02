function FeesTable({ fees, onPay, onReceipt }) {
  return (
    <table className="w-full">

      <thead className="bg-gray-100">
        <tr>
          <th>Month</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {fees.map((fee) => (
          <tr key={fee._id} className="border-t">

            <td>{fee.month}</td>
            <td>{fee.feeType}</td>
            <td>₹{fee.amount}</td>

            <td className={
              fee.status === "Paid"
                ? "text-green-600"
                : "text-red-500"
            }>
              {fee.status}
            </td>

            <td>
              {fee.status === "Paid" ? (
                <button onClick={() => onReceipt(fee)}>
                  Receipt
                </button>
              ) : (
                <button onClick={() => onPay(fee)}>
                  Pay
                </button>
              )}
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default FeesTable;