import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AppLayout";

import UserProfile from "../../components/profile/UserProfile";
import ProfileImageUploader from "../../components/profile/ProfileImageUploader";
import AdminProfileForm from "../../components/profile/AdminProfileForm";
import ChangePasswordCard from "../../components/profile/ChangePasswordCard";

import api from "../../services/api";

function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({});

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
    const response = await api.get("/users/profile");

    console.log("PROFILE RESPONSE:", response.data.data);

    setProfile(response.data.data);
    setForm(response.data.data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load profile");
  } finally {
    setLoading(false);
  }
};

  const updateProfile = async () => {
    try {
      await api.put(
        "/users/profile",
        form
      );

      toast.success(
        "Profile updated"
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
        "/users/change-password",
        passwordForm
      );

      toast.success(
        "Password changed"
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

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append(
      "image",
      file
    );

    try {
      await api.post(
        "/users/profile-image",
        formData
      );

      toast.success(
        "Image uploaded"
      );

      fetchProfile();
    } catch (error) {
      toast.error(
        "Failed to upload image"
      );
    }
  };

  if (loading)
    return (
      <AdminLayout>
        Loading...
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <UserProfile
        title="Admin Profile"
        profile={profile}
        imageUploader={
          <ProfileImageUploader
            profile={profile}
            role="Admin"
            onUpload={uploadImage}
          />
        }
        profileForm={
          <AdminProfileForm
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
    </AdminLayout>
  );
}

export default Profile;