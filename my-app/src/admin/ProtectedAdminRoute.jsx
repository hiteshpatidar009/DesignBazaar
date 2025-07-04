import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = sessionStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return children;
}

export default ProtectedAdminRoute;
