import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RedirectRoute = ( ) => {
  if (localStorage.getItem("user")) {
    return <Navigate to={"/home"} replace />;
  }

  return <Outlet />;
};
