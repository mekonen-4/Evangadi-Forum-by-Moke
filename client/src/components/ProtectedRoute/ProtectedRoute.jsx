import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // replace={true} prevents the user from clicking "back" into the protected page
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
