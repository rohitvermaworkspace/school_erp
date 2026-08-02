import {
  FaFileUpload,
  FaCamera,
  FaIdCard,
  FaFileMedical,
  FaSchool,
  FaFileAlt,
} from "react-icons/fa";

function DocumentsStep({ formData, handleFileChange, errors }) {
  const documents = [
    {
      label: "Student Photo",
      name: "studentPhoto",
      icon: <FaCamera />,
    },
    {
      label: "Guardian Photo",
      name: "guardianPhoto",
      icon: <FaCamera />,
    },
    {
      label: "Birth Certificate",
      name: "birthCertificate",
      icon: <FaFileMedical />,
    },
    {
      label: "Aadhaar Card",
      name: "aadhaarCard",
      icon: <FaIdCard />,
    },
    {
      label: "Transfer Certificate",
      name: "transferCertificate",
      icon: <FaSchool />,
    },
    {
      label: "Previous Marksheet",
      name: "marksheet",
      icon: <FaFileAlt />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white flex items-center justify-center shadow-lg">
          <FaFileUpload className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Documents Upload
          </h2>

          <p className="text-slate-500">
            Upload all mandatory student documents
          </p>
        </div>
      </div>

      {/* Upload Cards */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.name}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition ${
                errors?.[doc.name]
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-slate-300 dark:border-slate-700 hover:border-blue-500"
              }`}
            >
              <div className="flex justify-center mb-4 text-3xl text-blue-600">
                {doc.icon}
              </div>

              <h3 className="font-semibold text-slate-700 dark:text-white mb-3">
                {doc.label}

                {(doc.name === "studentPhoto" ||
                  doc.name === "birthCertificate") && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h3>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                name={doc.name}
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-600 dark:text-slate-300
      file:mr-4
      file:px-4
      file:py-2
      file:rounded-xl
      file:border-0
      file:bg-blue-600
      file:text-white
      hover:file:bg-blue-700"
              />

              {errors?.[doc.name] && (
                <p className="mt-2 text-sm text-red-500">{errors[doc.name]}</p>
              )}

              {formData.documents?.[doc.name] && (
                <p className="mt-3 text-xs text-green-600 font-medium break-all">
                  {formData.documents[doc.name].name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocumentsStep;