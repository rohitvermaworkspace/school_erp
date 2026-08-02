import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TeacherLayout from "../../components/layout/TeacherLayout";

import UserProfile from "../../components/profile/UserProfile";
import ProfileImageUploader from "../../components/profile/ProfileImageUploader";
import TeacherProfileForm from "../../components/profile/TeacherProfileForm";
import ChangePasswordCard from "../../components/profile/ChangePasswordCard";

import api from "../../services/api";

function TeacherProfile() {
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
      const { data } = await api.get(
        "/teachers/me"
      );

      setProfile(data);
      setForm(data);
    } catch (error) {
      toast.error(
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      await api.put(
        "/teachers/profile",
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
        "/teachers/change-password",
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
        "/teachers/profile-image",
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
      <TeacherLayout>
        Loading...
      </TeacherLayout>
    );

  return (
    <TeacherLayout>
      <UserProfile
        title="Teacher Profile"
        profile={profile}
        imageUploader={
          <ProfileImageUploader
            profile={profile}
            role="Teacher"
            onUpload={uploadImage}
          />
        }
        profileForm={
          <TeacherProfileForm
            form={form}
            setForm={setForm}
            onSave={updateProfile}
          />
        }
        passwordCard={
          <ChangePasswordCard
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            onSubmit={changePassword}
          />
        }
      />
    </TeacherLayout>
  );
}

export default TeacherProfile;