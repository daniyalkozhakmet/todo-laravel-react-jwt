import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ( ) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};
