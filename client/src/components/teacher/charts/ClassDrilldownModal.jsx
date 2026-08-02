import { motion } from "framer-motion";

const ClassDrilldownModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-xl w-[400px]"
      >

        <h2 className="text-xl font-bold mb-4">
          Class Details: {data}
        </h2>

        <div className="space-y-2 text-sm">
          <p>📘 Class: {data}</p>
          <p>👨‍🎓 Students will be loaded here</p>
          <p>📊 Attendance analytics coming next step</p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Close
        </button>

      </motion.div>
    </div>
  );
};

export default ClassDrilldownModal;