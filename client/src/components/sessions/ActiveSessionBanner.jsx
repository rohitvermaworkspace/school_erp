function ActiveSessionBanner({ session }) {
  if (!session) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
      <p className="text-sm uppercase tracking-wide opacity-90">
        Current Academic Session
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {session.sessionName}
      </h2>

      <p className="mt-2 opacity-90">
        {new Date(session.startDate).toLocaleDateString()}
        {" → "}
        {new Date(session.endDate).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ActiveSessionBanner;