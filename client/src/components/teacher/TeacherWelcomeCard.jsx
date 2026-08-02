import { useAuth } from "../../context/AuthContext";

const TeacherWelcomeCard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
      <h2 className="text-2xl font-bold">
        Welcome, {user?.name}
      </h2>

      <p className="mt-2 opacity-90">
        Manage attendance, timetable and notices
        efficiently.
      </p>
    </div>
  );
};

export default TeacherWelcomeCard;