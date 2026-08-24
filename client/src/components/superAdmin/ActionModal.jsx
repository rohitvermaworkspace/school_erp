import { FaExclamationTriangle } from "react-icons/fa";

// Generic confirmation dialog for activate / deactivate / delete actions.
const tones = {
  danger: {
    header: "from-red-500 to-red-600",
    button: "bg-red-600 hover:bg-red-700",
  },
  success: {
    header: "from-green-500 to-emerald-600",
    button: "bg-green-600 hover:bg-green-700",
  },
  warning: {
    header: "from-amber-500 to-orange-600",
    button: "bg-amber-600 hover:bg-orange-600",
  },
};

function ActionModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  tone = "danger",
  onConfirm,
  onCancel,
  loading,
}) {
  if (!isOpen) return null;

  const style = tones[tone] || tones.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-100 dark:border-slate-800">
        {/* Header */}
        <div className={`bg-gradient-to-r ${style.header} p-6 text-white`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              <FaExclamationTriangle />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {message}
          </p>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className={`px-6 py-3 rounded-xl text-white font-medium transition disabled:opacity-50 ${style.button}`}
            >
              {loading ? "Working..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionModal;
