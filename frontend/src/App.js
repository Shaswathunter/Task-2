import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Login page
import Dashboard from "./pages/Dashboard";
import Product from "./components/Products.jsx"; // <-- ab components folder se
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* All protected pages */}
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
);

export default App;
