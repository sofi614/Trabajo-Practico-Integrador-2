import { Navigate, Outlet } from "react-router";

export const PublicRoutes = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? <Navigate replace to="/home" /> : <Outlet />;
};