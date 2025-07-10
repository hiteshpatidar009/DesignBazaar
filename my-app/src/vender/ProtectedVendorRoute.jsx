import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedVendorRoute = ({ children }) => {
  const session = sessionStorage.getItem("vsessionauth");

  if (!session) {
    return <Navigate to="/vender/login" />;
  }

  return children;
};

export default ProtectedVendorRoute;
