import { useState } from "react";

import LogoUpload from "./LogoUpload";

function SchoolSettingsForm({
  settings,
  onSave,
}) {
  const [formData, setFormData] =
    useState({
      schoolName:
        settings.schoolName ||
        "",
      principalName:
        settings.principalName ||
        "",
      email:
        settings.email || "",
      phone:
        settings.phone || "",
      address:
        settings.address ||
        "",
      academicYear:
        settings.academicYear ||
        "",
      logo:
        settings.logo || "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-gray-100 dark:border-slate-800 p-6">

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6"
      >

        <LogoUpload
          logo={
            formData.logo
          }
          onChange={(
            logo
          ) =>
            setFormData({
              ...formData,
              logo,
            })
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium dark:text-white">
              School Name
            </label>

            <input
              type="text"
              name="schoolName"
              value={
                formData.schoolName
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Principal Name
            </label>

            <input
              type="text"
              name="principalName"
              value={
                formData.principalName
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Academic Year
            </label>

            <input
              type="text"
              name="academicYear"
              value={
                formData.academicYear
              }
              onChange={
                handleChange
              }
              placeholder="2026-27"
              className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-white">
            Address
          </label>

          <textarea
            rows="4"
            name="address"
            value={
              formData.address
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Settings
          </button>
        </div>

      </form>
    </div>
  );
}

export default SchoolSettingsForm;