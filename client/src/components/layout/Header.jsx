import { FaBars } from "react-icons/fa";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../notifications/NotificationBell";
import ThemeToggle from "../ui/ThemeToggle";
import { useLocation } from "react-router-dom";
import pageConfig from "../../data/pageConfig";

function Header() {
  const location = useLocation();
  const { user } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const currentPage = pageConfig[location.pathname] || {
    title: "School ERP",
    subtitle: "Management System",
  };
  return (
    <div
  className="
    sticky
    top-0
    z-40

    bg-white/90
    dark:bg-slate-900/90

    backdrop-blur-xl

    border-b
    border-slate-200
    dark:border-slate-800

    px-4
    md:px-6

    h-20

    flex
    items-center
    justify-between
  "
>
  {/* LEFT */}
  <div className="flex items-center gap-4 min-w-0">
    {/* MOBILE SIDEBAR BUTTON */}
    <button
      onClick={() => setSidebarOpen((prev) => !prev)}
      className="
        lg:hidden
        w-10
        h-10
        rounded-xl
        bg-slate-100
        dark:bg-slate-800
        flex
        items-center
        justify-center
        text-slate-700
        dark:text-slate-300
      "
    >
      <FaBars />
    </button>

    {/* PAGE TITLE */}
    <div className="min-w-0 px-4">
      <h2
        className="
          text-xl
          md:text-2xl
          font-bold
          text-slate-800
          dark:text-white

          truncate
        "
      >
        {currentPage.title}
      </h2>

      <p
        className="
          hidden
          sm:block

          text-sm
          text-slate-500
          dark:text-slate-400

          truncate
        "
      >
        {currentPage.subtitle}
      </p>
    </div>
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-3 md:gap-4">
    {/* THEME */}
    <ThemeToggle />

    {/* NOTIFICATIONS */}
    <NotificationBell />

    {/* USER */}
    <div
      className="
        flex
        items-center
        gap-3

        pl-3
        md:pl-4

        border-l
        border-slate-200
        dark:border-slate-700
      "
    >
      {/* AVATAR */}
      <div
        className="
          w-11
          h-11

          rounded-2xl

          bg-gradient-to-r
          from-blue-600
          to-indigo-600

          text-white

          flex
          items-center
          justify-center

          font-bold
          shadow-lg
        "
      >
        {user?.name?.charAt(0)?.toUpperCase()}
      </div>

      {/* USER INFO */}
      <div className="hidden md:block leading-tight">
        <h3
          className="
            text-sm
            font-semibold

            text-slate-800
            dark:text-white

            max-w-[140px]
            truncate
          "
        >
          {user?.name}
        </h3>

        <p
          className="
            text-xs
            text-slate-500
            dark:text-slate-400

            capitalize
          "
        >
          {user?.role}
        </p>
      </div>
    </div>
  </div>
</div>
  );
}

export default Header;
