function UserProfile({
  title,
  profile,
  imageUploader,
  profileForm,
  passwordCard,
}) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HERO */}

      <div
        className="
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-purple-600
          rounded-3xl
          shadow-xl
          p-8
          text-white
        "
      >
        <div className="flex flex-col lg:flex-row items-center gap-8">

          {imageUploader}

          <div className="flex-1">

            <h2 className="text-4xl font-bold">
              {profile?.name}
            </h2>

            <p className="text-blue-100 mt-2">
              {profile?.email}
            </p>

            <div className="flex gap-3 mt-4">

              <span className="bg-white/20 px-4 py-1 rounded-full">
                {profile?.role}
              </span>

              <span className="bg-green-500 px-4 py-1 rounded-full">
                Active
              </span>

            </div>

            {/* STATS */}

            <div className="grid md:grid-cols-3 gap-4 mt-8">

              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-sm text-blue-100">
                  Account Type
                </p>

                <h3 className="font-semibold">
                  {profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1).toLowerCase() : ''}
                </h3>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-sm text-blue-100">
                  Status
                </p>

                <h3 className="font-semibold">
                  Active
                </h3>
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-sm text-blue-100">
                  Member Since
                </p>

                <h3 className="font-semibold">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "-"}
                </h3>
              </div>

            </div>

          </div>

        </div>
      </div>

      {profileForm}

      {passwordCard}

    </div>
  );
}

export default UserProfile;