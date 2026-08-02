import React from "react";
import { FaPrint } from "react-icons/fa";
import {
  FaUserGraduate,
  FaSchool,
  FaCalendarAlt,
  FaLayerGroup,
  FaBook,
  FaHome,
  FaBus,
  FaBed,
  FaIdCard,
} from "react-icons/fa";

const InfoCard = ({ label, value }) => (
  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
    <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
      {label}
    </p>
    <p className="text-sm font-semibold text-slate-800 dark:text-white break-words">
      {value || "-"}
    </p>
  </div>
);

function ViewStudentDrawer({ isOpen, student, onClose, onEdit }) {
  if (!student) return null;

  const academic = student.academic || {};
  const admission = student.admission || {};
  const personal = student.personal || {};
  const contact = student.contact || {};
  const parents = student.parents || {};
  const address = student.address || {};
  const bank = student.bank || {};
  const previousSchool = student.previousSchool || {};

  const handlePrint = (e) => {
    // 1. Prevent form submission or bubbling issues if nested inside other components
    if (e && e.preventDefault) e.preventDefault();

    const element = document.getElementById("student-profile-print");
    if (!element) {
      console.error("Print target element not found");
      return;
    }

    const printContents = element.innerHTML;
    
    // 2. Explicitly target 'about:blank' to clear strict browser popup filters
    const printWindow = window.open("about:blank", "_blank");
    
    if (!printWindow) {
      alert("Popup blocker is preventing the print tab from opening. Please allow popups for this site.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Student Profile</title>
          <style>body{font-family:Arial,sans-serif;padding:30px;color:#222;}h2,h3{margin-bottom:10px;}.bg-white{margin-bottom:20px;border:1px solid #ddd;border-radius:10px;padding:20px;}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}p{margin:4px 0;}</style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // 3. Graceful print fallback execution
    setTimeout(() => {
      try {
        printWindow.print();
        printWindow.close();
      } catch (err) {
        console.error("Print dialog execution failed:", err);
      }
    }, 250); // Small delay to guarantee browser rendering completes
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full lg:w-[700px] bg-slate-100 dark:bg-slate-950 z-[9999] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b dark:border-slate-800 px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Student Profile
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Complete academic and personal profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6">
          <div id="student-profile-print" className="space-y-6">
            
            {/* HERO CARD */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 shadow-xl">
              <div className="absolute right-0 top-0 w-52 h-52 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="relative flex flex-col md:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                  {student.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 text-white">
                  <h2 className="text-3xl font-black">{student.name}</h2>
                  <p className="text-blue-100 mt-2">
                    Admission No :
                    <span className="font-semibold ml-2">
                      {student.admission?.admissionNo || student.rollNumber}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-3 mt-5">
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                      {academic.className || student.academic?.className}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                      Section {academic.section || "A"}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-green-500 text-sm font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACADEMIC DETAILS */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800">
              <div className="px-6 py-5 border-b dark:border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                  <FaSchool className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    Academic Information
                  </h3>
                  <p className="text-sm text-slate-500">
                    Admission and school details
                  </p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Academic Session" value={admission.academicSession} />
                <InfoCard label="Admission Number" value={admission.admissionNo} />
                <InfoCard label="Admission Date" value={student.admission?.admissionDate} />
                <InfoCard label="Class" value={student.academic?.className} />
                <InfoCard label="Section" value={student.academic?.section} />
                <InfoCard label="Medium" value={admission.medium} />
                <InfoCard label="House" value={academic.house} />
                <InfoCard label="Transport" value={academic.facilities?.transport?.isRequired} />
                <InfoCard label="Hostel" value={student.facilities?.hostel?.isRequired} />
                <InfoCard label="RTE" value={academic.rte} />
              </div>
            </div>

            {/* STUDENT DETAILS */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                Student Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Full Name" value={student.name || "-"} />
                <InfoCard label="Gender" value={student.personal?.gender || "-"} />
                <InfoCard
                  label="Date of Birth"
                  value={student.personal?.dob ? new Date(student.personal.dob).toLocaleDateString() : "-"}
                />
                <InfoCard label="Age" value={student?.age || "-"} />
                <InfoCard label="Aadhaar Number" value={student.personal?.aadhaarNumber || "-"} />
                <InfoCard label="PEN Number" value={student.academic?.penNumber || "-"} />
                <InfoCard label="APAAR ID" value={student.academic?.apaarId || "-"} />
                <InfoCard label="Religion" value={student.personal?.religion || "-"} />
                <InfoCard label="Category" value={student.personal?.category || "-"} />
                <InfoCard label="Caste" value={student.personal?.caste || "-"} />
                <InfoCard label="Nationality" value={student.personal?.nationality || "-"} />
                <InfoCard label="Blood Group" value={student.personal?.bloodGroup || "-"} />
                <InfoCard label="Disability" value={student.personal?.disability || "No"} />
                <InfoCard label="Height" value={student.personal?.height ? `${student.personal.height} cm` : "-"} />
                <InfoCard label="Weight" value={student.personal?.weight ? `${student.personal.weight} kg` : "-"} />
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Email Address" value={student.email || "-"} />
                <InfoCard label="Mobile Number" value={student.guardianPhone || "-"} />
                <InfoCard label="Alternate Number" value={student.contact?.alternateMobile || "-"} />
                <InfoCard label="Emergency Contact" value={student.contact?.emergencyContact || "-"} />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                Address
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <InfoCard label="Permanent Address" value={student.address?.current?.addressLine || "-"} />
                <InfoCard label="Local Address" value={student.address?.localAddress || "-"} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <InfoCard label="Village / City" value={student.address?.current?.city || "-"} />
                <InfoCard label="District" value={student.address?.current?.district || "-"} />
                <InfoCard label="State" value={student.address?.current?.state || "-"} />
                <InfoCard label="PIN Code" value={student.address?.current?.pincode || "-"} />
              </div>
            </div>

            {/* PARENTS & GUARDIAN */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                Parents & Guardian Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Father Name" value={student.family?.father?.name || "Not Available"} />
                <InfoCard label="Father Mobile" value={student.family?.father?.mobile || "Not Available"} />
                <InfoCard label="Father Occupation" value={student.family?.father?.occupation || "Not Available"} />
                <InfoCard label="Father Qualification" value={student.family?.father?.qualification || "Not Available"} />
                <InfoCard label="Mother Name" value={student.family?.mother?.name || "Not Available"} />
                <InfoCard label="Mother Mobile" value={student.family?.mother?.mobile || "Not Available"} />
                <InfoCard label="Mother Occupation" value={student.family?.mother?.occupation || "Not Available"} />
                <InfoCard label="Mother Qualification" value={student.family?.mother?.qualification || "Not Available"} />
                <InfoCard label="Guardian Name" value={student.family?.guardian?.name || "Not Available"} />
                <InfoCard label="Guardian Mobile" value={student.parents?.guardianMobile || "Not Available"} />
                <InfoCard label="Guardian Relation" value={student.parents?.guardianRelation || "Not Available"} />
                <InfoCard label="WhatsApp" value={student.parents?.guardianWhatsapp || "Not Available"} />
              </div>
            </div>

            {/* BANK DETAILS */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                Bank Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Account Number" value={student.bank?.accountNumber || "Not Available"} />
                <InfoCard label="Account Holder" value={student.bank?.accountHolder || "Not Available"} />
                <InfoCard label="Bank Name" value={student.bank?.bankName || "Not Available"} />
                <InfoCard label="Branch" value={student.bank?.branchName || "Not Available"} />
                <InfoCard label="IFSC Code" value={student.bank?.ifscCode || "Not Available"} />
              </div>
            </div>

            {/* TRANSPORT / HOSTEL */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                School Facilities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard label="Transport" value={student.facilities?.transport?.isRequired ? "YES" : "NO"} />
                <InfoCard label="Hostel" value={student.facilities?.hostel?.isRequired ? "YES" : "NO"} />
                <InfoCard label="RTE" value={student.facilities?.rteQuota?.isEligible ? "YES" : "NO"} />
                <InfoCard label="Scholarship" value={student.facilities?.scholarship || "No"} />
              </div>
            </div>

            {/* PREVIOUS SCHOOL */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                Previous Academic Record
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Previous School" value={student.previousSchool?.schoolName || "Not Available"} />
                <InfoCard label="Previous Class" value={student.previousSchool?.className || "Not Available"} />
                <InfoCard label="Session" value={student.previousSchool?.session || "Not Available"} />
                <InfoCard label="Percentage / Grade" value={student.previousSchool?.result || "Not Available"} />
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard label="Student Aadhaar" value={student.documents?.aadhaar ? "Uploaded" : "Not Uploaded"} />
                <InfoCard label="Birth Certificate" value={student.documents?.birthCertificate ? "Uploaded" : "Not Uploaded"} />
                <InfoCard label="Transfer Certificate" value={student.documents?.tc ? "Uploaded" : "Not Uploaded"} />
                <InfoCard label="Passport Photo" value={student.documents?.photo ? "Uploaded" : "Not Uploaded"} />
              </div>
            </div>

            {/* ERP STATISTICS */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5">
              <h3 className="text-lg font-semibold mb-5 dark:text-white">
                Student Analytics
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-green-50 dark:bg-green-500/10 p-5 text-center">
                  <h4 className="text-3xl font-black text-green-600">92%</h4>
                  <p className="text-sm text-slate-500 mt-2">Attendance</p>
                </div>
                <div className="rounded-2xl bg-blue-50 dark:bg-blue-500/10 p-5 text-center">
                  <h4 className="text-3xl font-black text-blue-600">8.7</h4>
                  <p className="text-sm text-slate-500 mt-2">CGPA</p>
                </div>
                <div className="rounded-2xl bg-orange-50 dark:bg-orange-500/10 p-5 text-center">
                  <h4 className="text-3xl font-black text-orange-600">₹12,000</h4>
                  <p className="text-sm text-slate-500 mt-2">Pending Fees</p>
                </div>
                <div className="rounded-2xl bg-purple-50 dark:bg-purple-500/10 p-5 text-center">
                  <h4 className="text-3xl font-black text-purple-600">15</h4>
                  <p className="text-sm text-slate-500 mt-2">Achievements</p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="shrink-0 border-t dark:border-slate-800 bg-white dark:bg-slate-900 p-5 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onEdit?.(student)}
                className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Edit Student
              </button>
              <button
                onClick={(e) => handlePrint(e)}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
              >
                Print Profile
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ViewStudentDrawer;