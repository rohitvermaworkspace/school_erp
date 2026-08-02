import { useEffect, useState } from "react";
import api from "../../../services/api";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [search, className]);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/students", {
        params: {
          search,
          className,
        },
      });

      setStudents(res.data || []);
    } catch (err) {
      console.error("Student fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Students Management
        </h1>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3">
        <input
          className="border p-2 rounded w-1/3"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="border p-2 rounded w-1/3"
          placeholder="Class (e.g. 10A)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded p-4">
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <table className="w-full border-collapse">

            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Roll No</th>
                <th>Age</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="p-2">{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.className}</td>
                  <td>{s.rollNumber}</td>
                  <td>{s.age}</td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>

    </div>
  );
};

export default StudentsPage;