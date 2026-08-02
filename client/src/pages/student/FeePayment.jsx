import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";

function FeePayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFee();
  }, []);

  const fetchFee = async () => {
    try {
      const res = await api.get(`/fees/${id}`);
      setFee(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      await api.post("/fees/pay", {
        feeId: id,
        paymentMethod: "Cash",
        transactionId: "TXN-" + Date.now(),
      });

      alert("Payment Successful");

      navigate("/student/fees");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!fee) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-xl">

        <h2 className="text-2xl font-bold mb-4">Fee Payment</h2>

        <p>Amount: ₹{fee.amount}</p>
        <p>Type: {fee.feeType}</p>
        <p>Month: {fee.month}</p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

      </div>
    </DashboardLayout>
  );
}

export default FeePayment;