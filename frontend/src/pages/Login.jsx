import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { DarkModeContext } from "../context/DarkModeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleDemoLogin = (role) => {
    if (role === "Manager") {
      setEmail("manager@a.com");
      setPassword("123456");
    } else if (role === "Store Keeper") {
      setEmail("store@example.com");
      setPassword("123456");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  // Tailwind classes based on dark mode
  const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
  const formBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const inputClass = darkMode
    ? "w-full mb-4 p-3 border rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    : "w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className={`flex flex-col md:flex-row h-screen ${bgClass}`}>
      {/* Left Section: Image / Welcome */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-indigo-600">
        <h1 className="text-5xl font-bold text-white text-center">
          Welcome Back
        </h1>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-3xl font-bold ${textClass}`}>Login</h2>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`${formBgClass} w-full p-6 sm:p-8 rounded-lg shadow-md`}
          >
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`${inputClass} pr-10`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition font-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Get Started"}
            </button>

            {/* Demo Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between gap-3">
              <button
                type="button"
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                onClick={() => handleDemoLogin("Manager")}
              >
                Manager Demo
              </button>
              <button
                type="button"
                className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                onClick={() => handleDemoLogin("Store Keeper")}
              >
                Store Keeper Demo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
