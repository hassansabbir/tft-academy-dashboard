import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role?: string;
}

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/auth/login" replace />;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(authToken);
    const userRole = decodedToken?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/auth/login" replace />;
  }
};

export default ProtectedRoute;
