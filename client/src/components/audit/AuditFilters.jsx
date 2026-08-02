function AuditFilters({
  filters,
  setFilters,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-card">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Search..."
          value={
            filters.search
          }
          onChange={(e) =>
            setFilters({
              ...filters,
              search:
                e.target.value,
            })
          }
          className="
            border
            dark:border-slate-700
            dark:bg-slate-800
            rounded-lg
            p-3
          "
        />

        <select
          value={
            filters.module
          }
          onChange={(e) =>
            setFilters({
              ...filters,
              module:
                e.target.value,
            })
          }
          className="
            border
            dark:border-slate-700
            dark:bg-slate-800
            rounded-lg
            p-3
          "
        >
          <option value="">
            All Modules
          </option>

          <option value="Students">
            Students
          </option>

          <option value="Teachers">
            Teachers
          </option>

          <option value="Classes">
            Classes
          </option>

          <option value="Attendance">
            Attendance
          </option>

          <option value="Subjects">
            Subjects
          </option>

          <option value="Fees">
            Fees
          </option>

          <option value="Timetable">
            Timetable
          </option>

          <option value="Notifications">
            Notifications
          </option>
        </select>

        <select
          value={
            filters.action
          }
          onChange={(e) =>
            setFilters({
              ...filters,
              action:
                e.target.value,
            })
          }
          className="
            border
            dark:border-slate-700
            dark:bg-slate-800
            rounded-lg
            p-3
          "
        >
          <option value="">
            All Actions
          </option>

          <option value="CREATE">
            CREATE
          </option>

          <option value="UPDATE">
            UPDATE
          </option>

          <option value="DELETE">
            DELETE
          </option>

          <option value="LOGIN">
            LOGIN
          </option>
        </select>

      </div>
    </div>
  );
}

export default AuditFilters;