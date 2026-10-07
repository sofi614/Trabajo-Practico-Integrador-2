import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  API_BASE_URL,
  getHttpErrorMessage,
  readResponseBody,
} from "../api.js";
import { useForm } from "../hooks/useForm.js";

const initialValues = { email: "", password: "" };

export const LoginPage = () => {
  const { values, handleInputChange } = useForm(initialValues);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(location.state?.message || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const responseData = await readResponseBody(response);

      if (!response.ok) {
        throw new Error(getHttpErrorMessage(response.status, responseData));
      }

      localStorage.setItem("isLoggedIn", "true");
      navigate("/home", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError instanceof TypeError
            ? "No se pudo conectar con el servidor."
            : requestError.message
          : "No se pudo iniciar sesión. Intentá nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-8">
      <section className="w-full max-w-sm rounded bg-slate-800 p-6">
        <h1 className="mb-5 text-center text-xl font-semibold text-gray-100">
          Iniciar sesión
        </h1>
        {error && (
          <p className="mb-4 rounded bg-red-900 p-2 text-sm text-white" role="alert">
            {error}
          </p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-gray-200" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="email"
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-violet-400 focus:outline-none"
              id="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Tu email"
              required
              type="email"
              value={values.email}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-200" htmlFor="password">
              Contraseña
            </label>
            <input
              autoComplete="current-password"
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-violet-400 focus:outline-none"
              id="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Tu contraseña"
              required
              type="password"
              value={values.password}
            />
          </div>
          <button
            className="w-full rounded bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-500 disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          ¿No tenés cuenta?{" "}
          <Link className="text-violet-300 hover:underline" to="/register">
            Crear una cuenta
          </Link>
        </p>
      </section>
    </main>
  );
};
