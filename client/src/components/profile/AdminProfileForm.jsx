function AdminProfileForm({
  form,
  setForm,
  onSave,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Admin Information
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Full Name
          </label>

          <input
            className="
              w-full
              border
              p-3
              rounded-lg
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
            value={form.name || ""}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="Admin Name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Email Address
          </label>

          <input
            className="
              w-full
              border
              p-3
              rounded-lg
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
            value={form.email || ""}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            placeholder="Email"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Role
          </label>

          <input
            disabled
            value={form.role || "admin"}
            className="
              w-full
              border
              p-3
              rounded-lg
              bg-gray-100
              text-gray-500
              cursor-not-allowed
            "
          />
        </div>

      </div>

      <div className="mt-6">
        <button
          onClick={onSave}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            font-medium
            transition
          "
        >
          Save Profile
        </button>
      </div>

    </div>
  );
}

export default AdminProfileForm;