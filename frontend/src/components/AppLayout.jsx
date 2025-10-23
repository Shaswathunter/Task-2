import { useContext, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

function AppLayout() {
  const { darkMode } = useContext(DarkModeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile toggle

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } min-h-screen`}
    >
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
