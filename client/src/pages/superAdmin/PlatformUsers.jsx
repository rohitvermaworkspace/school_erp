import SuperAdminLayout from "./SuperAdminLayout";
import { FaUsers } from "react-icons/fa";

const PlatformUsers = () => {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaUsers className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl xl:text-4xl font-black text-white leading-tight">
                Platform Users
              </h1>
              <p className="text-purple-100 text-lg mt-1">
                Manage users across all schools
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-12 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
            <FaUsers className="text-4xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            Platform-wide user management coming soon
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            This feature will allow you to view and manage all users across every school on the platform from a single interface.
          </p>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default PlatformUsers;
