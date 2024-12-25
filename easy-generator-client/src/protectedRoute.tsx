import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext.tsx";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAccessToken } = useAuth();
  if (!isAccessToken && !Cookies.get("accessToken")) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
