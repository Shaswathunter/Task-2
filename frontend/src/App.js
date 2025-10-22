import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Product from "./components/Products.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";

const App = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "bg-gray-900 text-gray-100 min-h-screen" : "bg-gray-50 text-gray-900 min-h-screen"}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected pages */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute rolesAllowed={["Manager"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="products"
              element={
                <ProtectedRoute rolesAllowed={["Manager", "Store Keeper"]}>
                  <Product />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
