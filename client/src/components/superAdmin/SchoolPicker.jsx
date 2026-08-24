import { useEffect, useState } from "react";
import platformService from "../../services/platformService";

// Reusable school selector for every platform-level configuration page.
function SchoolPicker({ value, onChange, disabled }) {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    platformService
      .getSchools()
      .then((res) => {
        if (mounted) setSchools(res.data || []);
      })
      .catch(() => {
        if (mounted) setSchools([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || loading}
      className="w-full md:w-72 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
    >
      <option value="">
        {loading ? "Loading schools..." : "Select School"}
      </option>
      {schools.map((school) => (
        <option key={school._id} value={school._id}>
          {school.name} ({school.code})
          {school.status !== "Active" ? " — Inactive" : ""}
        </option>
      ))}
    </select>
  );
}

export default SchoolPicker;
