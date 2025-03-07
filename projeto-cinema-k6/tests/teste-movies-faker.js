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
  return jsonData.movies;
});

export default () => {
  console.log('Função principal');
  
  let movie = randomItem(data);

  const payload = {
    title: movie.title,
    description: movie.description,
    launchdate: movie.launchdate,
    showtimes: movie.showtimes
  };

  const urlRes = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, payload);

  console.log('POST filme realizado, resposta:', urlRes.body);

  baseChecks.checkStatusCode(urlRes, 200);
  baseChecks.checkResponseNotEmpty(urlRes);
  baseChecks.checkResponseTimeRecorded(urlRes);
  baseChecks.checkHeadersExist(urlRes);
  
  sleep(1);
};

export function teardown() {
  console.log('Teardown - Obtendo filmes para deletar');
  const getRes = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);

  console.log('GET filmes retornados:', getRes.body);

  baseChecks.checkStatusCode(getRes, 200);
  baseChecks.checkResponseNotEmpty(getRes);
  baseChecks.checkResponseTimeRecorded(getRes);
  baseChecks.checkHeadersExist(getRes);

  const movies = getRes.json();

  if (!movies || movies.length === 0) {
    console.log('Nenhum filme encontrado para deletar');
    return;
  }

  const ids = movies.filter(item => item._id).map(item => item._id);

  ids.forEach(id => {
    console.log(`Teardown - Deletando filme com ID: ${id}`);
    const res = baseRest.delete(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`);

    console.log(`DELETE resposta para filme ID ${id}:`, res.body);

    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkResponseNotEmpty(res);
    baseChecks.checkResponseTimeRecorded(res);
    baseChecks.checkHeadersExist(res);
  });
}
