import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// rolesAllowed optional prop: ["Manager", "Store Keeper"]
const ProtectedRoute = ({ children, rolesAllowed }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2️⃣ Role check if rolesAllowed provided
  if (rolesAllowed && !rolesAllowed.includes(role)) {
    return <Navigate to="/products" replace />;
  }

  // 3️⃣ Render children if allowed
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
