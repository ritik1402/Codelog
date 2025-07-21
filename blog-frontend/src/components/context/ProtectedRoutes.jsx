import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (loading) return null;

  if (!user || !token) {
    console.log("Unauthorized - redirecting to login...");
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoutes;
