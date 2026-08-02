import React from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout";

export const NoticeCard = () => {
  return (
    <DashboardLayout>
        <div className="p-6">
            <h1 className="text-2xl font-bold">Notices & Timetable</h1>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow">
                <p>Notices and timetable details will be displayed here.</p>
            </div>
        </div>
    </DashboardLayout>
  )
}