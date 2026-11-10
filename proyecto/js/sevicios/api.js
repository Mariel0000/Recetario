const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

class ErrorApi extends Error {
  constructor(tipo, message, status = null) {
    super(message);
    this.name = 'ErrorApi';
    this.tipo = tipo;
    this.status = status;
  }
}

async function peticion(endpoint, params = {}, opciones = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  let response;

  try {
    response = await fetch(url.toString(), { signal: opciones.signal });

    if (!response.ok) {
      throw new ErrorApi('Error de red', `Error en la respuesta de la API (${response.status})`, response.status);
    }

    try {
      return await response.json();
    } catch {
      throw new ErrorApi('servidor', 'Error al analizar la respuesta JSON de la API', response.status);
    }
  } catch (error) {
    if (error instanceof ErrorApi) {
      throw error;
    }

    if (error.name === 'AbortError') {
      throw new ErrorApi('AbortError', 'La solicitud fue abortada');
    }

    throw new ErrorApi('Error de red', 'Error al conectar con la API', response?.status ?? null);
  }
}

const api = {
  buscarPorNombre: (nombre, opciones) => peticion('search.php', { s: nombre }, opciones),
  porId: (id, opciones) => peticion('lookup.php', { i: id }, opciones),
  aleatorio: (opciones) => peticion('random.php', {}, opciones),
  categorias: (opciones) => peticion('categories.php', {}, opciones),
  origenes: (opciones) => peticion('list.php', { a: 'list' }, opciones),
  ingredientes: (opciones) => peticion('list.php', { i: 'list' }, opciones),
  filtrarPorCategoria: (categoria, opciones) => peticion('filter.php', { c: categoria }, opciones),
  filtrarPorOrigen: (origen, opciones) => peticion('filter.php', { a: origen }, opciones),
  filtrarPorIngrediente: (ingrediente, opciones) => peticion('filter.php', { i: ingrediente }, opciones),
};

export default api;
