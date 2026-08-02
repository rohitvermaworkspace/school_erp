import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar } from "../../context/SidebarContext";

function AppLayout({ children }) {
  const { sidebarOpen, isMobile } = useSidebar();

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div
        className={`
          flex-1
          flex
          flex-col
          min-w-0
          transition-all
          duration-300

          ${
            isMobile
              ? "ml-0"
              : sidebarOpen
              ? "ml-[280px]"
              : "ml-[90px]"
          }
        `}
      >
        <Header />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;