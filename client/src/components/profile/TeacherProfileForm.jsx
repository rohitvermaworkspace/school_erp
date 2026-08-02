function TeacherProfileForm({
  form,
  setForm,
  onSave,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Teacher Information
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          className="border p-3 rounded-lg"
          value={form.name || ""}
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
          placeholder="Teacher Name"
        />

        <input
          className="border p-3 rounded-lg"
          value={form.email || ""}
          disabled
        />

        <input
          className="border p-3 rounded-lg"
          value={form.phone || ""}
          onChange={(e)=>
            setForm({
              ...form,
              phone:e.target.value
            })
          }
          placeholder="Phone"
        />

        <input
          className="border p-3 rounded-lg"
          value={form.subject || ""}
          onChange={(e)=>
            setForm({
              ...form,
              subject:e.target.value
            })
          }
          placeholder="Subject"
        />

      </div>

      <textarea
        rows="3"
        className="border p-3 rounded-lg w-full mt-4"
        value={form.address || ""}
        onChange={(e)=>
          setForm({
            ...form,
            address:e.target.value
          })
        }
        placeholder="Address"
      />

      <button
        onClick={onSave}
        className="
        mt-5
        bg-blue-600
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

export default TeacherProfileForm;