import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { DarkModeContext } from "../context/DarkModeContext";
import { toast } from "react-toastify"; // ✅ Import toast
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  // Auto-fill demo credentials
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
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      toast.success("Login successful!"); // ✅ Success toast
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.msg || "Invalid credentials!";
      toast.error(msg); // ✅ Error toast
    } finally {
      setLoading(false);
    }
  };

  // Classes based on dark mode
  const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
  const formBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const inputClass = darkMode
    ? "w-full mb-4 p-3 border rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    : "w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className={`flex flex-col md:flex-row h-screen ${bgClass}`}>
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="flex justify-between w-full max-w-md mb-4 items-center">
          <h1 className="text-4xl font-bold text-indigo-600">Welcome Back</h1>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`${formBgClass} w-full max-w-md p-8 rounded shadow`}
        >
          <h2 className={`text-2xl font-semibold mb-6 ${textClass}`}>
            Login to Your Account
          </h2>

          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password input with show/hide toggle */}
          <div className="relative mb-6">
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
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition duration-200 font-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Get Started"}
          </button>

          <div className="mt-6 flex justify-between gap-4">
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

        <div
          className={`mt-8 p-4 rounded shadow text-center max-w-md ${
            darkMode ? "bg-gray-700 text-white" : "bg-indigo-100 text-indigo-800"
          }`}
        >
          <h3 className="font-bold mb-2">Quick Demo Credentials</h3>
          <p>Click a button above to auto-fill login info.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
