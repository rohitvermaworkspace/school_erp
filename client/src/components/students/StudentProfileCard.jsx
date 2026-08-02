function StudentProfileCard({ profile }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">

      <h2 className="text-2xl font-bold">
        Welcome, {profile?.name}
      </h2>

      <p className="text-gray-500 mt-1">
        {profile?.email}
      </p>

      <div className="mt-3 text-sm text-gray-400">
        Class: {profile?.className} | Roll: {profile?.rollNumber}
      </div>

    </div>
  );
}

export default StudentProfileCard;