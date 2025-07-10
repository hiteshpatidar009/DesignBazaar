import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = sessionStorage.getItem("adminToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
