function LogoUpload({
  logo,
  onChange,
}) {
  return (
    <div>

      <label className="block mb-3 font-medium dark:text-white">
        School Logo URL
      </label>

      <input
        type="text"
        value={logo}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder="https://..."
        className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
      />

      {logo && (
        <div className="mt-4">

          <img
            src={logo}
            alt="School Logo"
            className="w-24 h-24 rounded-lg border object-cover"
          />

        </div>
      )}

    </div>
  );
}

export default LogoUpload;