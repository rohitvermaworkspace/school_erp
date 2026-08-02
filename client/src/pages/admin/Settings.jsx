import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

import AdminLayout from "../../components/layout/AppLayout";
import SchoolSettingsForm from "../../components/settings/SchoolSettingsForm";

function Settings() {
  const [settings, setSettings] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response =
        await api.get(
          "/settings"
        );

      setSettings(
        response.data
      );
    } catch (error) {
      toast.error(
        "Failed to load settings"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (
    formData
  ) => {
    try {
      await api.put(
        "/settings",
        formData
      );

      toast.success(
        "Settings updated successfully"
      );

      fetchSettings();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Update failed"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            Settings
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage school settings
          </p>
        </div>

        {!loading &&
          settings && (
            <SchoolSettingsForm
              settings={
                settings
              }
              onSave={
                handleSave
              }
            />
          )}

      </div>
    </AdminLayout>
  );
}

export default Settings;