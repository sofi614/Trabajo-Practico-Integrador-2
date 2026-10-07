import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { API_BASE_URL, getHttpErrorMessage, readResponseBody } from "../api.js";
import { useForm } from "../hooks/useForm.js";

const initialValues = {
  username: "",
  email: "",
  password: "",
  nombre: "",
  apellido: "",
};

export const RegisterPage = () => {
  const { values, handleInputChange, handleReset } = useForm(initialValues);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          profile: {
            first_name: values.nombre,
            last_name: values.apellido,
          },
        }),
      });
      const responseData = await readResponseBody(response);

      if (!response.ok) {
        throw new Error(getHttpErrorMessage(response.status, responseData));
      }

      handleReset();
      navigate("/login", {
        replace: true,
        state: {
          message: "La cuenta se creó correctamente. Ya podés iniciar sesión.",
        },
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError instanceof TypeError
            ? "No se pudo conectar con el servidor."
            : requestError.message
          : "No se pudo crear la cuenta. Intentá nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-8">
      <section className="w-full max-w-sm rounded bg-slate-800 p-6">
        <h1 className="mb-5 text-center text-xl font-semibold text-gray-100">
          Crear cuenta
        </h1>
        {error && (
          <p
            className="mb-4 rounded bg-red-900 p-2 text-sm text-white"
            role="alert"
          >
            {error}
          </p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-1 block text-sm text-gray-200"
              htmlFor="username"
            >
              Nombre de usuario
            </label>
            <input
              autoComplete="username"
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-violet-400 focus:outline-none"
              id="username"
              name="username"
              onChange={handleInputChange}
              placeholder="Tu usuario"
              required
              value={values.username}
            />
          </div>
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
            <label
              className="mb-1 block text-sm text-gray-200"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              autoComplete="new-password"
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-violet-400 focus:outline-none"
              id="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Elegí una contraseña"
              required
              type="password"
              value={values.password}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                className="mb-1 block text-sm text-gray-200"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                autoComplete="given-name"
                className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-violet-400 focus:outline-none"
                id="nombre"
                name="nombre"
                onChange={handleInputChange}
                placeholder="Tu nombre"
                required
                value={values.nombre}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm text-gray-200"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                autoComplete="family-name"
                className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-violet-400 focus:outline-none"
                id="apellido"
                name="apellido"
                onChange={handleInputChange}
                placeholder="Tu apellido"
                required
                value={values.apellido}
              />
            </div>
          </div>
          <button
            className="w-full rounded bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-500 disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          ¿Ya tenés cuenta?{" "}
          <Link className="text-violet-300 hover:underline" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </section>
    </main>
  );
};
