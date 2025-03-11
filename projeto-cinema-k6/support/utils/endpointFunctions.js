import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from './apiRequests.js';

const baseRest = new BaseRest(testConfig.environment.cinema.url);
const baseChecks = new BaseChecks();

// Função para gerar uma string aleatória com letras maiúsculas e minúsculas
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Função GET
export function getMovies() {
  const response = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
  baseChecks.checkStatusCode(response, 200);
  baseChecks.checkResponseTimeRecorded(response);
  baseChecks.checkHeadersExist(response);
  return response.json(); // Retorna os filmes encontrados
}

// Função GET para um filme por ID
export function getMovieById(id) {
  const response = baseRest.get(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`);
  baseChecks.checkStatusCode(response, 200);
  baseChecks.checkResponseTimeRecorded(response);
  baseChecks.checkHeadersExist(response);
  return response.json(); // Retorna o filme encontrado
}

// Função POST
export function createMovie(payload) {
  const response = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, payload);
  baseChecks.checkStatusCode(response, 201);
  baseChecks.checkResponseTimeRecorded(response);
  baseChecks.checkHeadersExist(response);
  return response;
}

// Função PUT para atualizar um filme por ID
export function updateMovieById(id, payload) {
  const response = baseRest.put(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`, payload);
  baseChecks.checkStatusCode(response, 200);
  baseChecks.checkResponseTimeRecorded(response);
  baseChecks.checkHeadersExist(response);
  return response;
}

// Função DELETE
export function deleteMovie(id) {
  const response = baseRest.delete(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`);
  baseChecks.checkStatusCode(response, 200); // ou 204, dependendo da resposta da API
  baseChecks.checkResponseTimeRecorded(response);
  baseChecks.checkHeadersExist(response);
  return response;
}
