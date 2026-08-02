import {
  FaUserGraduate,
  FaSchool,
  FaUsers,
  FaMapMarkerAlt,
  FaUniversity,
  FaHistory,
  FaBus,
  FaFileAlt,
  FaStickyNote,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function ReviewStep({ formData }) {
  const Card = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center">
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );

  const Item = ({ label, value }) => (
    <div>
      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white break-words">
        {value || "-"}
      </p>
    </div>
  );

  const StatusBadge = ({ value }) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        value
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      }`}
    >
      {value ? "Yes" : "No"}
    </span>
  );

  const DocumentItem = ({ label, file }) => (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>

      {file ? (
        <div className="flex items-center gap-2 text-green-600">
          <FaCheckCircle />
          <span className="text-sm">{file.name}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-500">
          <FaTimesCircle />
          <span className="text-sm">Not Uploaded</span>
        </div>
      )}
    </div>
  );

  return (
  <div className="space-y-8">
    {/* Header */}
    <div>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
        Review Admission
      </h2>

      <p className="text-slate-500 mt-2">
        Verify all information before completing the student admission.
      </p>
    </div>

    {/* Student Summary */}
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold">
            {formData?.student?.name || "Student Name"}
          </h2>

          <p className="text-blue-100 mt-2">
            Admission No : {formData?.admission?.admissionNo || "-"}
          </p>

          <p className="text-blue-100">
            Session : {formData?.admission?.academicSession || "-"}
          </p>

          <p className="text-blue-100">
            Class :
            {" "}
            {formData?.academic?.className || "-"}
            {" "}
            -
            {" "}
            {formData?.academic?.section || "-"}
          </p>

          <p className="text-blue-100">
            Roll No :
            {" "}
            {formData?.academic?.rollNumber || "-"}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center">
            <FaUserGraduate className="text-5xl" />
          </div>
        </div>
      </div>
    </div>

    {/* Academic */}
    <Card title="Academic Information" icon={<FaSchool />}>
      <Item label="Admission Number" value={formData?.admission?.admissionNo} />
      <Item label="Admission Date" value={formData?.admission?.admissionDate} />
      <Item label="Academic Session" value={formData?.admission?.academicSession} />
      <Item label="Admission Type" value={formData?.admission?.admissionType} />
      <Item label="Joining Class" value={formData?.admission?.joiningClass} />
      <Item label="Joining Section" value={formData?.admission?.joiningSection} />
      <Item label="Current Class" value={formData?.academic?.className} />
      <Item label="Section" value={formData?.academic?.section} />
      <Item label="Roll Number" value={formData?.academic?.rollNumber} />
      <Item label="House" value={formData?.academic?.house} />
      <Item label="Board" value={formData?.academic?.board} />
      <Item label="Stream" value={formData?.academic?.stream} />
    </Card>

    {/* Student */}
    <Card title="Student Information" icon={<FaUserGraduate />}>
      <Item label="Name" value={formData?.student?.name} />
      <Item label="Email" value={formData?.student?.email} />
      <Item label="Phone" value={formData?.student?.phone} />
      <Item label="DOB" value={formData?.student?.dob} />
      <Item label="Gender" value={formData?.student?.gender} />
      <Item label="Blood Group" value={formData?.student?.bloodGroup} />
      <Item label="Religion" value={formData?.student?.religion} />
      <Item label="Category" value={formData?.student?.category} />
      <Item label="Nationality" value={formData?.student?.nationality} />
      <Item label="Aadhaar" value={formData?.student?.aadhaarNumber} />
    </Card>

    {/* Parents */}
    <Card title="Parents Information" icon={<FaUsers />}>
      <Item label="Father Name" value={formData?.family?.father?.name} />
      <Item label="Father Mobile" value={formData?.family?.father?.mobile} />
      <Item label="Father Qualification" value={formData?.family?.father?.qualification} />
      <Item label="Father Occupation" value={formData?.family?.father?.occupation} />

      <Item label="Mother Name" value={formData?.family?.mother?.name} />
      <Item label="Mother Mobile" value={formData?.family?.mother?.mobile} />
      <Item label="Mother Qualification" value={formData?.family?.mother?.qualification} />
      <Item label="Mother Occupation" value={formData?.family?.mother?.occupation} />

      <Item label="Guardian Name" value={formData?.family?.guardian?.name} />
      <Item label="Guardian Mobile" value={formData?.family?.guardian?.mobile} />
      <Item label="Relationship" value={formData?.family?.guardian?.relationship} />
    </Card>

    {/* Address */}
    <Card title="Address Information" icon={<FaMapMarkerAlt />}>
      <Item label="Current Address" value={formData?.address?.current?.addressLine} />
      <Item label="City" value={formData?.address?.current?.city} />
      <Item label="State" value={formData?.address?.current?.state} />
      <Item label="Country" value={formData?.address?.current?.country} />
      <Item label="Pincode" value={formData?.address?.current?.pincode} />

      <Item
        label="Permanent Same As Current"
        value={formData?.address?.isPermanentSameAsCurrent ? "Yes" : "No"}
      />
    </Card>

    {/* Bank */}
    <Card title="Bank Details" icon={<FaUniversity />}>
      <Item label="Account Holder" value={formData?.bank?.accountHolder} />
      <Item label="Bank Name" value={formData?.bank?.bankName} />
      <Item label="Branch" value={formData?.bank?.branchName} />
      <Item label="IFSC" value={formData?.bank?.ifscCode} />

      <Item
        label="Account Number"
        value={
          formData?.bank?.accountNumber
            ? "XXXXXX" + formData.bank.accountNumber.slice(-4)
            : "-"
        }
      />
    </Card>

    {/* Previous School */}
    <Card title="Previous School" icon={<FaHistory />}>
      <Item label="School Name" value={formData?.previousSchool?.schoolName} />
      <Item label="Board" value={formData?.previousSchool?.board} />
      <Item label="Medium" value={formData?.previousSchool?.medium} />
      <Item label="Last Class" value={formData?.previousSchool?.lastClass} />
      <Item label="Session" value={formData?.previousSchool?.lastSession} />
      <Item label="TC Number" value={formData?.previousSchool?.tcNumber} />
    </Card>

    {/* Facilities */}
    <Card title="Facilities" icon={<FaBus />}>
      <div>
        <p className="text-xs uppercase text-slate-500 mb-2">Transport</p>
        <StatusBadge value={formData?.facilities?.transport?.isRequired} />
      </div>

      <div>
        <p className="text-xs uppercase text-slate-500 mb-2">Hostel</p>
        <StatusBadge value={formData?.facilities?.hostel?.isRequired} />
      </div>

      <div>
        <p className="text-xs uppercase text-slate-500 mb-2">RTE Eligible</p>
        <StatusBadge value={formData?.facilities?.rteQuota?.isEligible} />
      </div>
    </Card>

    {/* Documents */}
    <Card title="Uploaded Documents" icon={<FaFileAlt />}>
      <div className="md:col-span-2 xl:col-span-3 space-y-3">
        <DocumentItem
          label="Student Photo"
          file={formData?.documents?.studentPhoto}
        />

        <DocumentItem
          label="Guardian Photo"
          file={formData?.documents?.guardianPhoto}
        />

        <DocumentItem
          label="Birth Certificate"
          file={formData?.documents?.birthCertificate}
        />

        <DocumentItem
          label="Aadhaar Card"
          file={formData?.documents?.aadhaarCard}
        />

        <DocumentItem
          label="Transfer Certificate"
          file={formData?.documents?.transferCertificate}
        />

        <DocumentItem
          label="Previous Marksheet"
          file={formData?.documents?.marksheet}
        />
      </div>
    </Card>

    {/* Notes */}
    <Card title="Notes & Remarks" icon={<FaStickyNote />}>
      <Item label="Future Goal" value={formData?.notes?.futureGoal} />

      <Item label="Remarks" value={formData?.notes?.remarks} />
    </Card>
  </div>
);
}

export default ReviewStep;