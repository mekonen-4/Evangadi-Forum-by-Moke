import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // If they have a token, they shouldn't see Login/Signup.
    // Send them back to Home.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
