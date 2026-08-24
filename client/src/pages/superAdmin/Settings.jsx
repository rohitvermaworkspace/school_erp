import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCog, FaInfoCircle, FaShieldAlt } from "react-icons/fa";

import platformService from "../../services/platformService";
import UserProfile from "../../components/profile/UserProfile";
import ProfileImageUploader from "../../components/profile/ProfileImageUploader";
import AdminProfileForm from "../../components/profile/AdminProfileForm";
import ChangePasswordCard from "../../components/profile/ChangePasswordCard";
import api from "../../services/api";

function SuperAdminSettings() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const [form, setForm] = useState({});

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setProfile(response.data.data || response.data);
      setForm(response.data.data || response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    platformService
      .getPlatformStats()
      .then((res) => setStats(res.data?.totals))
      .catch(() => {});
  }, []);

  const updateProfile = async () => {
    try {
      await api.put("/users/profile", form);
      toast.success("Profile updated");
      fetchProfile();
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const changePassword = async () => {
    try {
      await api.put("/users/change-password", passwordForm);
      toast.success("Password changed");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await api.post("/users/profile-image", formData);
      toast.success("Image uploaded");
      fetchProfile();
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  if (loading) {
    return (
      
        <div className="flex items-center justify-center h-64 text-slate-500">
          Loading...
        </div>
      
    );
  }

  return (
    
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <FaCog className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl xl:text-4xl font-black">Settings</h1>
              <p className="text-slate-300 mt-1">
                Manage your platform administrator account.
              </p>
            </div>
          </div>
        </div>

        {/* Platform overview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card p-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
            <FaShieldAlt className="text-blue-600 dark:text-blue-400" /> Platform Overview
          </h2>
          <p className="text-sm text-slate-500 mb-5 flex items-center gap-1.5">
            <FaInfoCircle className="text-slate-400" />
            Live counts across every school on the platform.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              ["Schools", stats?.schools],
              ["Active", stats?.activeSchools],
              ["Inactive", stats?.inactiveSchools],
              ["School Admins", stats?.schoolAdmins],
              ["Teachers", stats?.teachers],
              ["Students", stats?.students],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 text-center"
              >
                <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                  {value ?? "—"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Account management — same shared profile experience as other roles */}
        <UserProfile
          title="Platform Admin Profile"
          profile={profile}
          imageUploader={
            <ProfileImageUploader
              profile={profile}
              role="Super Admin"
              onUpload={uploadImage}
            />
          }
          profileForm={
            <AdminProfileForm form={form} setForm={setForm} onSave={updateProfile} />
          }
          passwordCard={
            <ChangePasswordCard
              passwordForm={passwordForm}
              setPasswordForm={setPasswordForm}
              onSubmit={changePassword}
            />
          }
        />
      </div>
    
  );
}

export default SuperAdminSettings;
