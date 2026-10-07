import { API_BASE_URL } from "../api.js";
import { useFetch } from "../hooks/useFetch.js";

export const HomePage = () => {
  const { data, isLoading, error } = useFetch(
    `${API_BASE_URL}/api/articles`,
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Artículos publicados
      </h1>

      {isLoading && (
        <p aria-live="polite" className="text-gray-600">
          Cargando artículos...
        </p>
      )}

      {!isLoading && error && (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error.message}
        </p>
      )}

      {!isLoading && !error && !Array.isArray(data) && (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700" role="alert">
          El servidor devolvió una respuesta de artículos con un formato no válido.
        </p>
      )}

      {!isLoading && !error && Array.isArray(data) && data.length === 0 && (
        <p className="text-gray-600">Todavía no hay artículos publicados.</p>
      )}

      {!isLoading && !error && Array.isArray(data) && data.length > 0 && (
        <ul className="space-y-4">
          {data.map((article, index) => (
            <li
              className="rounded-lg border border-gray-200 bg-white p-5"
              key={article.id ?? `${article.title}-${index}`}
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {article.title}
              </h2>
              <p className="mt-2 text-gray-700">{article.excerpt}</p>
              <p className="mt-3 text-sm text-gray-500">
                Autor: {article.author?.username || "Desconocido"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};