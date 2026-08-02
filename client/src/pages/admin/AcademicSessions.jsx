import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import AdminLayout from "../../components/layout/AppLayout";
import { FaCalendarAlt } from "react-icons/fa";

function AcademicSessions() {
  const [sessions, setSessions] = useState([]);

  const [formData, setFormData] = useState({
    sessionName: "",
    startDate: "",
    endDate: "",
  });

  const fetchSessions = async () => {
    try {
      const res = await api.get("/sessions");

      setSessions(res.data);
    } catch (error) {
      toast.error("Failed to load sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post("/sessions", formData);

      toast.success("Session created");

      setFormData({
        sessionName: "",
        startDate: "",
        endDate: "",
      });

      fetchSessions();
    } catch (error) {
      toast.error("Failed to create session");
    }
  };

  const activateSession = async (id) => {
    try {
      await api.put(`/sessions/${id}/activate`);

      toast.success("Session activated");

      fetchSessions();
    } catch (error) {
      toast.error("Activation failed");
    }
  };

  const deleteSession = async (id) => {
    if (!window.confirm("Delete session?")) return;

    try {
      await api.delete(`/sessions/${id}`);

      toast.success("Session deleted");

      fetchSessions();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
                📅 Session Management
              </div>
              <h1 className="text-4xl font-black text-white leading-tight">
                Academic Sessions
              </h1>
              <p className="text-purple-100 text-lg mt-3">
                Manage academic years and session lifecycle
              </p>
            </div>
          </div>
        </div>

        {/* CREATE SESSION */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border dark:border-slate-800">
          <form onSubmit={handleCreate} className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="2026-2027"
              value={formData.sessionName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sessionName: e.target.value,
                })
              }
              className="px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
              required
            />

            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startDate: e.target.value,
                })
              }
              className="px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
              required
            />

            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endDate: e.target.value,
                })
              }
              className="px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3"
            >
              Create Session
            </button>
          </form>
        </div>

        {/* SESSION TABLE */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Session Records</h2>
                <p className="text-sm text-white/80">View and manage all academic sessions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="p-4 text-left">Session</th>
                <th className="p-4 text-left">Start</th>
                <th className="p-4 text-left">End</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session._id}
                  className="border-b dark:border-slate-800"
                >
                  <td className="p-4 font-semibold">{session.sessionName}</td>

                  <td className="p-4">
                    {new Date(session.startDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(session.endDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        session.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {session.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">
                    {!session.isActive && (
                      <button
                        onClick={() => activateSession(session._id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg"
                      >
                        Activate
                      </button>
                    )}

                    <button
                      onClick={() => deleteSession(session._id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AcademicSessions;