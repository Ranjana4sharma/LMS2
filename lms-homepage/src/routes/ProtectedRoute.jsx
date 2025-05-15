import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Redirect if role is not authorized
  }

  return <Outlet />; // Render the protected page
};

export default ProtectedRoute;
