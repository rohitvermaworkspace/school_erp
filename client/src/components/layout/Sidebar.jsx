import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSchool,
  FaSignOutAlt,
  FaBars,
  FaChevronRight,
  FaChevronDown,
  FaCircle,
} from "react-icons/fa";

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
  const [expandedGroups, setExpandedGroups] = useState({});
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
        {/* HEADER */}
        <div className="px-3 py-3 border-b border-slate-800">
          <div className={`flex items-center ${sidebarOpen ? "justify-between" : "justify-center"}`}>
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
                  <FaSchool className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-white leading-tight">School ERP</h2>
                  <p className="text-[10px] text-slate-400 leading-tight">Administration Panel</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-all duration-300"
            >
              <FaBars className="text-xs" />
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto overflow-x-visible px-2 py-2 hide-scrollbar">
          {menu.map((item, index) => {
            const Icon = item.icon;

            // ---- GROUP (submenu) ITEM ----
            if (item.children) {
              const isChildActive = item.children.some((child) =>
                location.pathname.startsWith(child.path)
              );

              return (
                <div key={index} className="mb-1">
                  {sidebarOpen ? (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedGroups((prev) => ({
                          ...prev,
                          [item.title]: !(prev[item.title] ?? true),
                        }))
                      }
                      className={`relative w-full flex items-center justify-between px-3 py-1.5 rounded-xl transition-all duration-300 ${
                        isChildActive
                          ? "text-white bg-slate-900"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isChildActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "bg-slate-800"}`}>
                          <Icon className="text-sm" />
                        </div>
                        <p className="font-medium text-[13px]">{item.title}</p>
                      </div>
                      <FaChevronDown
                        className={`text-[10px] transition-transform duration-300 ${
                          expandedGroups[item.title] ?? true ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(true)}
                      title={item.title}
                      className={`relative w-full flex items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-300 ${
                        isChildActive
                          ? "text-white bg-slate-900"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isChildActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "bg-slate-800"}`}>
                        <Icon className="text-sm" />
                      </div>
                    </button>
                  )}

                  {(expandedGroups[item.title] ?? true) && sidebarOpen && (
                    <div className="mt-1 ml-6 pl-4 border-l border-slate-800 space-y-0.5">
                      {item.children.map((child, childIndex) => {
                        const ChildIcon = child.icon || FaCircle;
                        return (
                          <NavLink
                            key={childIndex}
                            to={child.path}
                            onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                            className={({ isActive }) =>
                              `relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                                isActive
                                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
                              }`
                            }
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                            <p className="font-medium text-[12.5px]">{child.title}</p>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // ---- FLAT ITEM ----
            return (
              <div key={index} className="group relative">
                <NavLink
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} px-3 py-1.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                      )}

                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isActive ? "bg-white/20" : "bg-slate-800"}`}>
                          <Icon className="text-sm" />
                        </div>
                        {sidebarOpen && (
                          <p className="font-medium text-[13px]">{item.title}</p>
                        )}
                      </div>

                      {sidebarOpen && isActive && (
                        <FaChevronRight className="text-[10px] opacity-80" />
                      )}
                    </>
                  )}
                </NavLink>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="mt-auto p-3 border-t border-slate-800 bg-slate-950">
          {sidebarOpen && (
            <div className="mb-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-[13px] truncate text-white">{user?.name}</p>
                <p className="text-[10px] text-slate-400 capitalize">{user?.role}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-2 flex items-center justify-center gap-2 transition-all duration-300 font-medium text-[13px] text-white"
          >
            <FaSignOutAlt className="text-sm" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;