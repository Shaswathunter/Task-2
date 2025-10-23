import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const { darkMode } = useContext(DarkModeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const bgClass = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const hoverClass = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300";

  return (
    <>
      {/* Mobile Top Nav */}
      <div className={`md:hidden flex justify-between items-center p-4 ${bgClass}`}>
        <h2 className={`text-xl font-bold ${textClass}`}>Menu</h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} className={textClass} /> : <HiMenu size={28} className={textClass} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className={`md:hidden ${bgClass} p-4 space-y-2`}>
          {role === "Manager" && (
            <Link
              to="/dashboard"
              className={`block p-2 rounded ${hoverClass} ${textClass}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/products"
            className={`block p-2 rounded ${hoverClass} ${textClass}`}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden md:flex md:flex-col md:w-64 ${bgClass} min-h-screen p-6 space-y-4`}>
        <h2 className={`text-xl font-bold mb-6 ${textClass}`}>Menu</h2>
        {role === "Manager" && (
          <Link
            to="/dashboard"
            className={`p-2 rounded ${hoverClass} ${textClass}`}
          >
            Dashboard
          </Link>
        )}
        <Link
          to="/products"
          className={`p-2 rounded ${hoverClass} ${textClass}`}
        >
          Products
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
