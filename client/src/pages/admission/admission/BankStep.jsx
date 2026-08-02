import { FaUniversity } from "react-icons/fa";

function BankStep({ formData, handleChange }) {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-center shadow-lg">
          <FaUniversity className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Bank Details
          </h2>

          <p className="text-slate-500">
            Student / Guardian bank information (Optional)
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Account Holder */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Account Holder Name
            </label>

            <input
              type="text"
              name="bank.accountHolder"
              value={formData.bank.accountHolder}
              onChange={handleChange}
              placeholder="Enter account holder"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Account Number */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Account Number
            </label>

            <input
              type="text"
              name="bank.accountNumber"
              value={formData.bank.accountNumber}
              onChange={handleChange}
              placeholder="XXXXXXXXXXXX"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Bank Name */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Bank Name
            </label>

            <input
              type="text"
              name="bank.bankName"
              value={formData.bank.bankName}
              onChange={handleChange}
              placeholder="State Bank of India"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Branch */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Branch Name
            </label>

            <input
              type="text"
              name="bank.branchName"
              value={formData.bank.branchName}
              onChange={handleChange}
              placeholder="Main Branch"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* IFSC */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              IFSC Code
            </label>

            <input
              type="text"
              name="bank.ifscCode"
              value={formData.bank.ifscCode}
              onChange={handleChange}
              placeholder="SBIN0001234"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 uppercase outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default BankStep;