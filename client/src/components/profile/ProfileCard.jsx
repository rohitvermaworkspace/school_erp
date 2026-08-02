import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaEdit,
  FaLock,
} from "react-icons/fa";

function ProfileCard({
  profile,
  onEdit,
  onChangePassword,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-gray-100 dark:border-slate-800 p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
            {profile.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              {profile.name}
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              {profile.email}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <FaEdit className="inline mr-2" />
            Edit Profile
          </button>

          <button
            onClick={
              onChangePassword
            }
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            <FaLock className="inline mr-2" />
            Change Password
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaUser />
            <span className="font-medium dark:text-white">
              Name
            </span>
          </div>

          <p className="dark:text-gray-300">
            {profile.name}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaEnvelope />
            <span className="font-medium dark:text-white">
              Email
            </span>
          </div>

          <p className="dark:text-gray-300">
            {profile.email}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaUserShield />
            <span className="font-medium dark:text-white">
              Role
            </span>
          </div>

          <p className="capitalize dark:text-gray-300">
            {profile.role}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ProfileCard;