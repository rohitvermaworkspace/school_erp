function ProfileImageUploader({
  profile,
  role,
  onUpload,
}) {
  const imageUrl =
    profile?.profileImage
      ? `http://localhost:8000/uploads/${profile.profileImage}`
      : `https://ui-avatars.com/api/?name=${profile?.name || role}&size=200`;

  return (
    <div className="relative">

      <img
        src={imageUrl}
        alt="Profile"
        className="
          w-32
          h-32
          rounded-full
          object-cover
          border-4
          border-white
          shadow-2xl
        "
      />

      <label
        className="
          absolute
          bottom-0
          right-0
          bg-white
          text-slate-700
          rounded-full
          p-2
          cursor-pointer
          shadow-lg
          hover:scale-105
          transition
        "
      >
        📷

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onUpload}
        />
      </label>

    </div>
  );
}

export default ProfileImageUploader;