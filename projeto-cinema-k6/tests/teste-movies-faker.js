import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = testConfig.options.smokeThresholds;

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/dynamic/movies.json'));
  return jsonData.movies;  // Aqui, acessa-se a chave 'movies' que contém o array
});

export function setup() {
  let responseData = [];

  data.forEach(movie => {
    console.log('Criando um filme', movie);
    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, movie);
    console.log('Instância BaseRest:', baseRest);

    baseChecks.checkStatusCode(res, 201);
    baseChecks.checkResponseNotEmpty(res);
    baseChecks.checkResponseTimeRecorded(res);
    baseChecks.checkHeadersExist(res);
    baseChecks.checkValidJsonResponse(res);

    if (res && res.json()) {
      responseData.push(res.json());
    } else {
      console.log('Erro ao obter dados de resposta');
    }
  });

  console.log(`SETUP CRIANDO FILME`);
  
  // Aqui retorna um único objeto, mas você pode querer retornar o conjunto completo de dados
  // Retornando todos os dados de resposta (todos os usuários criados)
  return { responseData };
}

export default () => {
  console.log('Função principal');
  
  // Obtém um filme aleatório
  let movie = randomItem(data);

  const payload = {
    title: movie.title,
    description: movie.description,
    launchdate: movie.launchdate,
    showtimes: movie.showtimes  // Corrigido aqui
  };

  console.log('GET filme realizado', payload);

  const urlRes = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, payload);

  baseChecks.checkStatusCode(urlRes, 200);
  baseChecks.checkResponseNotEmpty(urlRes);
  baseChecks.checkResponseTimeRecorded(urlRes);
  baseChecks.checkHeadersExist(urlRes);
  baseChecks.checkValidJsonResponse(urlRes);
  
  sleep(1);
};

export function teardown(responseData) {
  console.log(responseData.responseData);
  const ids = responseData.responseData
    .filter(item => item._id)  // Filtra itens que têm o campo '_id'
    .map(item => item._id);

  ids.forEach(id => {
    console.log(`Teardown - Deletando filme com ID: ${id}`);

    const res = baseRest.delete(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);

    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkResponseNotEmpty(res);
    baseChecks.checkResponseTimeRecorded(res);
    baseChecks.checkHeadersExist(res);
    baseChecks.checkValidJsonResponse(res);
  });
}

// k6 run "C:\Users\lauro\OneDrive\Área de Trabalho\Lauro\Compass UOL\Sprint 8\projeto-cinema-k6\tests\teste-movies-faker.js"