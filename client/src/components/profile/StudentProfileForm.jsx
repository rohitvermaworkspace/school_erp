function StudentProfileForm({
  form,
  setForm,
  onSave,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Student Information
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          className="border p-3 rounded-lg"
          value={form.name || ""}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          placeholder="Student Name"
        />

        <input
          className="border p-3 rounded-lg"
          value={form.email || ""}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          placeholder="Email"
        />

        <input
          className="border p-3 rounded-lg"
          value={form.className || ""}
          onChange={(e) =>
            setForm({
              ...form,
              className:
                e.target.value,
            })
          }
          placeholder="Class"
        />

        <input
          className="border p-3 rounded-lg"
          value={
            form.rollNumber || ""
          }
          onChange={(e) =>
            setForm({
              ...form,
              rollNumber:
                e.target.value,
            })
          }
          placeholder="Roll Number"
        />

      </div>

      {/* Parents Information */}

      <h3 className="text-xl font-semibold mt-8 mb-4">
        Parents Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          className="border p-3 rounded-lg"
          value={
            form.fatherName || ""
          }
          onChange={(e) =>
            setForm({
              ...form,
              fatherName:
                e.target.value,
            })
          }
          placeholder="Father Name"
        />

        <input
          className="border p-3 rounded-lg"
          value={
            form.motherName || ""
          }
          onChange={(e) =>
            setForm({
              ...form,
              motherName:
                e.target.value,
            })
          }
          placeholder="Mother Name"
        />

        <input
          className="border p-3 rounded-lg md:col-span-2"
          value={
            form.guardianPhone ||
            ""
          }
          onChange={(e) =>
            setForm({
              ...form,
              guardianPhone:
                e.target.value,
            })
          }
          placeholder="Guardian Phone"
        />

      </div>

      {/* Address */}

      <h3 className="text-xl font-semibold mt-8 mb-4">
        Address
      </h3>

      <textarea
        rows="4"
        className="
          border
          p-3
          rounded-lg
          w-full
        "
        value={form.address || ""}
        onChange={(e) =>
          setForm({
            ...form,
            address:
              e.target.value,
          })
        }
        placeholder="Address"
      />

      <button
        onClick={onSave}
        className="
          mt-6
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-lg
        "
      >
        Save Profile
      </button>

    </div>
  );
}

export default StudentProfileForm;