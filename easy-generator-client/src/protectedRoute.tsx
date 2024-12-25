import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext.tsx";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAccessToken } = useAuth();
  console.log("isAuthenticated", isAccessToken);
  if (!isAccessToken) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
