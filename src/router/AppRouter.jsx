
import { Navigate, Route, Routes } from "react-router";
import { Navbar } from "../components/Navbar.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { PrivateRoutes } from "./PrivateRoutes.jsx";
import { PublicRoutes } from "./PublicRoutes.jsx";

const getDefaultRoute = () =>
  localStorage.getItem("isLoggedIn") === "true" ? "/home" : "/login";

export const AppRouter = () => (
  <Routes>
    <Route element={<PublicRoutes />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
    <Route element={<PrivateRoutes />}>
      <Route
        path="/home"
        element={
          <>
            <Navbar />
            <HomePage />
          </>
        }
      />
    </Route>
    <Route path="/" element={<Navigate replace to={getDefaultRoute()} />} />
    <Route path="*" element={<Navigate replace to={getDefaultRoute()} />} />
  </Routes>
);
