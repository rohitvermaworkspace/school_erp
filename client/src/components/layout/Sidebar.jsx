import { NavLink, useNavigate } from "react-router-dom";
import { FaSchool, FaSignOutAlt, FaBars, FaChevronRight } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";
import sidebarMenu from "../../data/sidebarMenu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        if (mobile) {
          setSidebarOpen(false);
        } else {
          setSidebarOpen(true);
        }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menu = sidebarMenu.find((m) => m.role === user?.role)?.items || [];
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 flex flex-col bg-slate-950 transition-all duration-300 lg:translate-x-0 ${
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        } ${isMobile ? "w-[280px]" : sidebarOpen ? "w-[280px]" : "w-[90px]"}`}
      >
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}
        <div className="px-4 py-5 border-b border-slate-800">
          <div className={`flex items-center ${sidebarOpen ? "justify-between" : "justify-center"}`}>
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
                  <FaSchool className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="font-bold text-white">School ERP</h2>
                  <p className="text-xs text-slate-400">Administration Panel</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-all duration-300"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* ========================= */}
        {/* NAVIGATION */}
        {/* ========================= */}
        <div className="flex-1 overflow-y-auto overflow-x-visible px-3 py-3 hide-scrollbar">
          {menu.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="group relative">
                <NavLink
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} px-4 py-2 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                      )}

                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive ? "bg-white/20" : "bg-slate-800"}`}>
                          <Icon className="text-lg" />
                        </div>
                        {sidebarOpen && (
                          <div>
                            <p className="font-medium">{item.title}</p>
                          </div>
                        )}
                      </div>

                      {sidebarOpen && isActive && (
                        <FaChevronRight className="text-xs opacity-80" />
                      )}
                    </>
                  )}
                </NavLink>
              </div>
            );
          })}
        </div>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}
        <div className="mt-auto p-4 border-t border-slate-800 bg-slate-950">
          {sidebarOpen && (
            <div className="mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate text-white">{user?.name}</p>
                <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 rounded-2xl py-3 flex items-center justify-center gap-3 transition-all duration-300 font-medium text-white"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;