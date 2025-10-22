import { useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

function AppLayout() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "bg-gray-900 text-gray-100 min-h-screen" : "bg-gray-50 text-gray-900 min-h-screen"}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet /> {/* Nested pages render here */}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
