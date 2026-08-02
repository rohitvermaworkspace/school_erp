import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";

function FeesPage() {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await api.get("/fees");
      setFees(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">

        <h2 className="text-xl font-bold mb-4">
          Fees Management (Admin)
        </h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border-collapse">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Month</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {fees.map((f) => (
                <tr key={f._id} className="border-t">
                  <td className="p-3">{f.student?.name}</td>
                  <td className="p-3">{f.student?.className}</td>
                  <td className="p-3">{f.feeType}</td>
                  <td className="p-3">₹{f.amount}</td>
                  <td className="p-3">{f.month}</td>
                  <td className="p-3">
                    <span className={f.status === "Paid" ? "text-green-600" : "text-red-500"}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default FeesPage;