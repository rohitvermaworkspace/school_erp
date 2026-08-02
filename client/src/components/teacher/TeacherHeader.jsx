import { useAuth } from "../../context/AuthContext"; 
import { FaBars } from "react-icons/fa"; 
import { useSidebar } from "../../context/SidebarContext"; 
import NotificationBell from "../notifications/NotificationBell"; 
import ThemeToggle from "../ui/ThemeToggle";
import { useLocation } from "react-router-dom"; 
import pageConfig from "../../data/pageConfig"; 

function TeacherHeader() { 
  const location = useLocation(); 
  const { setSidebarOpen } = useSidebar(); 
  const { user } = useAuth(); 
  const currentPage = pageConfig[location.pathname]
|| { title: "Teacher Portal", subtitle: "Management System", }; return (
<div className="
   bg-white
   dark:bg-slate-900
   border-b
   border-gray-100
   dark:border-slate-800
   px-6
   py-4
   flex
   items-center
   justify-between">
   {/* LEFT */}
   <div className="
      flex
      items-center
      gap-4">
      {/* MOBILE MENU */}
      <button onClick={()=>
         setSidebarOpen(true)} className=" lg:hidden text-2xl dark:text-white" >
         <FaBars />
      </button>
      <div>
         <h2 className="
            text-2xl
            font-bold
            dark:text-white">
            {currentPage.title}
         </h2>
         <p className="
            text-gray-500
            dark:text-gray-400
            mt-1">
            {currentPage.subtitle}
         </p>
      </div>
   </div>
   {/* RIGHT */}
   <div className="
      flex
      items-center
      gap-5">
      <ThemeToggle />
      <NotificationBell />
      {/* USER */}
      <div className="
         flex
         items-center
         gap-3">
         <div className="
            w-10
            h-10
            rounded-full
            bg-primary
            text-white
            flex
            items-center
            justify-center
            font-semibold">
            {user?.name?.charAt(0)?.toUpperCase()}
         </div>
         <div className="
            hidden
            md:block">
            <h3 className="
               text-sm
               font-semibold
               dark:text-white">
               {user?.name}
            </h3>
            <p className="
               text-xs
               text-gray-500
               dark:text-gray-400
               capitalize">
               {user?.role}
            </p>
         </div>
      </div>
   </div>
</div>
); } export default TeacherHeader;