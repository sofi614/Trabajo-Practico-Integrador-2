import { useCallback, useEffect, useState } from "react";
import { getHttpErrorMessage, readResponseBody } from "../api.js";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (signal) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          signal,
        });
        const responseData = await readResponseBody(response);

        if (!response.ok) {
          throw new Error(getHttpErrorMessage(response.status, responseData));
        }

        setData(responseData);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(
            fetchError instanceof TypeError
              ? new Error("No se pudo conectar con el servidor.")
              : fetchError instanceof Error
                ? fetchError
                : new Error("No se pudo conectar con el servidor."),
          );
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [url],
  );

  useEffect(() => {
    const controller = new AbortController();

    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        fetchData(controller.signal);
      }
    });

    return () => controller.abort();
  }, [fetchData]);

  return { data, isLoading, error };
};