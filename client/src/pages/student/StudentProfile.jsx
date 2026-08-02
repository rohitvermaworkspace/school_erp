import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

import DashboardLayout from "../../components/layout/DashboardLayout";

import UserProfile from "../../components/profile/UserProfile";
import ProfileImageUploader from "../../components/profile/ProfileImageUploader";
import StudentProfileForm from "../../components/profile/StudentProfileForm";
import ChangePasswordCard from "../../components/profile/ChangePasswordCard";

function StudentProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    className: "",
    rollNumber: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    address: "",
  });

  const [passwordForm, setPasswordForm] =
    useState({
      oldPassword: "",
      newPassword: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/students/me");

      setProfile(res.data);
      setForm(res.data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("image", file);

      await api.post(
        "/students/profile-image",
        formData
      );

      toast.success(
        "Profile image updated"
      );

      fetchProfile();
    } catch (error) {
      toast.error(
        "Failed to upload image"
      );
    }
  };

  const updateProfile = async () => {
    try {
      await api.put(
        "/students/profile",
        form
      );

      toast.success(
        "Profile updated successfully"
      );

      fetchProfile();
    } catch (error) {
      toast.error(
        "Failed to update profile"
      );
    }
  };

  const changePassword = async () => {
    try {
      await api.put(
        "/students/change-password",
        passwordForm
      );

      toast.success(
        "Password changed successfully"
      );

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      toast.error(
        "Failed to change password"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <UserProfile
        title="Student Profile"
        profile={profile}
        imageUploader={
          <ProfileImageUploader
            profile={profile}
            role="Student"
            onUpload={
              handleImageUpload
            }
          />
        }
        profileForm={
          <StudentProfileForm
            form={form}
            setForm={setForm}
            onSave={updateProfile}
          />
        }
        passwordCard={
          <ChangePasswordCard
            passwordForm={
              passwordForm
            }
            setPasswordForm={
              setPasswordForm
            }
            onSubmit={
              changePassword
            }
          />
        }
      />
    </DashboardLayout>
  );
}

export default StudentProfile;