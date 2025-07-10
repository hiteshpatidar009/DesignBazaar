import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedVendorRoute = ({ children }) => {
  const token = sessionStorage.getItem("vendorToken"); // or use "venderToken" if that's your exact key
  if (!token) {
    return <Navigate to="/vender/login" />;
  }
  return children;
};

export default ProtectedVendorRoute;
