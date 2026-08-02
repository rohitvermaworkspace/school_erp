function ChangePasswordCard({
  passwordForm,
  setPasswordForm,
  onSubmit,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Change Password
      </h2>

      <div className="space-y-4">

        <input
          type="password"
          className="
            border
            p-3
            rounded-lg
            w-full
          "
          value={
            passwordForm.oldPassword
          }
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              oldPassword:
                e.target.value,
            })
          }
          placeholder="Old Password"
        />

        <input
          type="password"
          className="
            border
            p-3
            rounded-lg
            w-full
          "
          value={
            passwordForm.newPassword
          }
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              newPassword:
                e.target.value,
            })
          }
          placeholder="New Password"
        />

        <button
          onClick={onSubmit}
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Change Password
        </button>

      </div>

    </div>
  );
}

export default ChangePasswordCard;