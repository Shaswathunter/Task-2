import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const { darkMode } = useContext(DarkModeContext);

  const bgClass = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const hoverClass = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300";

  return (
    <div className={`w-64 ${bgClass} min-h-screen p-6 flex flex-col space-y-4`}>
      <h2 className={`text-xl font-bold mb-6 ${textClass}`}>Menu</h2>

      <Link
        to="/dashboard"
        className={`p-2 rounded ${hoverClass} ${textClass} ${role !== "Manager" ? "hidden" : ""}`}
      >
        Dashboard
      </Link>

      <Link
        to="/products"
        className={`p-2 rounded ${hoverClass} ${textClass}`}
      >
        Products
      </Link>

      
    </div>
  );
};

export default Sidebar;
