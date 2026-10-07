import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? <Outlet /> : <Navigate replace to="/login" />;
};