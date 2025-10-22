import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className={`px-6 py-4 flex justify-between items-center
      ${darkMode ? "bg-gray-800 text-gray-100" : "bg-indigo-600 text-white"}`}>
      
      <div className="flex space-x-6">
        <Link to="/" className="font-bold text-lg">CMS</Link>
       
        
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={toggleDarkMode}
          className={`px-3 py-1 rounded 
            ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <button
          onClick={handleLogout}
          className={`px-3 py-1 rounded 
            ${darkMode ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
