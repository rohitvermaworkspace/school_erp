import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { FaCopy, FaCheck } from "react-icons/fa";

import AdminLayout from "../../components/layout/AppLayout";
import SchoolSettingsForm from "../../components/settings/SchoolSettingsForm";

function Settings() {
  const [settings, setSettings] = useState(null);
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, schoolRes] = await Promise.all([
        api.get("/settings"),
        api.get("/settings/school-info"),
      ]);
      setSettings(settingsRes.data);
      setSchoolInfo(schoolRes.data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      await api.put("/settings", formData);
      toast.success("Settings updated successfully");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const copySchoolCode = () => {
    navigator.clipboard.writeText(schoolInfo.code);
    setCopied(true);
    toast.success("School code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage school settings</p>
        </div>

        {/* School Code Card */}
        {schoolInfo && (
          <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Your School Code</p>
                <p className="text-3xl font-extrabold mt-1 tracking-wider">{schoolInfo.code}</p>
                <p className="text-indigo-200 text-sm mt-1">{schoolInfo.name}</p>
              </div>
              <button
                onClick={copySchoolCode}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-all"
              >
                {copied ? <FaCheck className="h-4 w-4" /> : <FaCopy className="h-4 w-4" />}
                <span className="text-sm font-medium">{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>
            <p className="text-indigo-200 text-xs mt-3">Share this code with teachers and students so they can log in.</p>
          </div>
        )}

        {!loading && settings && (
          <SchoolSettingsForm settings={settings} onSave={handleSave} />
        )}
      </div>
    </AdminLayout>
  );
}

export default Settings;