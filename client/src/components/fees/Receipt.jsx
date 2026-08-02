function Receipt({ fee, onClose }) {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Receipt</h2>

        <button onClick={onClose} className="text-red-500">
          ✕
        </button>
      </div>

      <div className="space-y-2 text-sm">

        <p><b>Student:</b> {fee?.student?.name}</p>
        <p><b>Month:</b> {fee.month}</p>
        <p><b>Type:</b> {fee.feeType}</p>
        <p><b>Amount:</b> ₹{fee.amount}</p>
        <p><b>Status:</b> {fee.status}</p>

        <p>
          <b>Date:</b>{" "}
          {fee.paymentDate
            ? new Date(fee.paymentDate).toLocaleDateString()
            : "-"}
        </p>

      </div>

      <div className="flex gap-2 mt-4">

        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Print
        </button>

        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-3 py-1 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default Receipt;