import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
