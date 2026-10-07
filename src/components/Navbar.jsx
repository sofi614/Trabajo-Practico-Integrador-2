import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  API_BASE_URL,
  getHttpErrorMessage,
  readResponseBody,
} from "../api.js";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    let logoutMessage = "";

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const responseData = await readResponseBody(response);

      if (!response.ok) {
        throw new Error(getHttpErrorMessage(response.status, responseData));
      }
    } catch (error) {
      logoutMessage =
        error instanceof Error
          ? `No se pudo cerrar la sesión en el servidor: ${
              error instanceof TypeError
                ? "no se pudo conectar."
                : error.message
            }`
          : "No se pudo cerrar la sesión en el servidor.";
    } finally {
      localStorage.removeItem("isLoggedIn");
      setIsLoggingOut(false);
      navigate("/login", {
        replace: true,
        state: { message: logoutMessage },
      });
    }
  };

  return (
    <header className="border-b border-slate-700 bg-slate-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link className="text-lg font-semibold text-gray-100" to="/home">
          Blog personal
        </Link>
        <button
          className="rounded border border-violet-500 px-4 py-2 text-sm text-gray-100 hover:bg-violet-600 disabled:cursor-wait disabled:opacity-60"
          disabled={isLoggingOut}
          onClick={handleLogout}
          type="button"
        >
          {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </nav>
    </header>
  );
};