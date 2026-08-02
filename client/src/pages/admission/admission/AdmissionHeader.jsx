import { FaUserGraduate, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdmissionHeader({ step }) {
    const navigate = useNavigate();
    const TOTAL_STEPS = 10;
    const progress = (step / TOTAL_STEPS) * 100;
  return (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-xl">
    {/* Background Decorations */}
    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
    <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
    
    {/* Main Header Content Container */}
    <div className="relative flex flex-col md:flex-row gap-6 items-start lg:items-center lg:justify-between">
      
      {/* Left Group: Back Button + Text Details */}
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Back Button - Styled for better visibility on dark gradient background */}
        <button
          onClick={() => navigate("/admin/students")}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all shrink-0"
        >
          <FaArrowLeft />
        </button>

        {/* Header Text */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-white text-sm font-medium mb-4">
            🎓 Student Admission Wizard
          </div>

          <h1 className="text-4xl xl:text-5xl font-black text-white">
            New Student Admission
          </h1>

          <p className="text-blue-100 mt-3 max-w-2xl text-lg">
            Complete the admission process by filling all required academic,
            personal, parent and address information.
          </p>
        </div>
      </div>

      {/* Right Group: Icon Badge */}
      <div className="flex justify-center self-center lg:self-auto">
        <div className="w-28 h-28 rounded-3xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center">
          <FaUserGraduate className="text-white text-5xl" />
        </div>
      </div>
    </div>
  </div>
);
}

export default AdmissionHeader;