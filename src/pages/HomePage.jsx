import { API_BASE_URL } from "../api.js";
import { useFetch } from "../hooks/useFetch.js";

export const HomePage = () => {
  const { data, isLoading, error } = useFetch(
    `${API_BASE_URL}/api/articles`,
  );

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8">
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-6 border-b border-slate-700 pb-3 text-2xl font-semibold text-gray-100">
          Artículos publicados
        </h1>

        {isLoading && (
          <p aria-live="polite" className="text-gray-300">
            Cargando artículos...
          </p>
        )}

        {!isLoading && error && (
          <p className="rounded bg-red-900 p-3 text-sm text-white" role="alert">
            {error.message}
          </p>
        )}

        {!isLoading && !error && !Array.isArray(data) && (
          <p className="rounded bg-red-900 p-3 text-sm text-white" role="alert">
            El servidor devolvió una respuesta de artículos con un formato no válido.
          </p>
        )}

        {!isLoading && !error && Array.isArray(data) && data.length === 0 && (
          <p className="text-gray-300">Todavía no hay artículos publicados.</p>
        )}

        {!isLoading && !error && Array.isArray(data) && data.length > 0 && (
          <ul className="space-y-4">
            {data.map((article, index) => (
              <li
                className="rounded border border-slate-700 bg-slate-800 p-5"
                key={article.id ?? `${article.title}-${index}`}
              >
                <h2 className="text-lg font-semibold text-gray-100">
                  {article.title}
                </h2>
                <p className="mt-2 text-gray-300">{article.excerpt}</p>
                <p className="mt-3 text-sm text-violet-300">
                  Autor: {article.author?.username || "Desconocido"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};