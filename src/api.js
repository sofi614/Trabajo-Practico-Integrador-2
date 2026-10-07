export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const readResponseBody = async (response) => {
  const responseText = await response.text();

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error("El servidor devolvió una respuesta no válida.");
  }
};

export const getHttpErrorMessage = (status, body) => {
  if (status === 400) {
    if (Array.isArray(body?.errors)) {
      const validationErrors = body.errors
        .map((error) => error.msg || error.message)
        .filter(Boolean);

      if (validationErrors.length > 0) {
        return validationErrors.join(" ");
      }
    }

    return body?.message || "Revisá los datos ingresados.";
  }

  if (status === 401) {
    return body?.message || "Las credenciales son incorrectas o la sesión venció.";
  }

  if (status === 403) {
    return body?.message || "No tenés permisos para realizar esta acción.";
  }

  if (status >= 500) {
    return "Ocurrió un error en el servidor. Intentá nuevamente más tarde.";
  }

  return body?.message || `No se pudo completar la operación (HTTP ${status}).`;
};
