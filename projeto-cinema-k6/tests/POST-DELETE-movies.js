import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { getMovies, createMovie, deleteMovie, testConfig } from '../support/utils/apiRequests.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// HTML
export function handleSummary(data) {
    return {
      "POST-DELETE-movies-spikeTest.html": htmlReport(data),
    };
}
export const options = testConfig.options.spikeTest;

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/dynamic/movies.json'));
  return jsonData.movies;
});

export default () => {
  console.log('Criando um filme');
  
  let movie = randomItem(data);
  const payload = {
    title: movie.title,
    description: movie.description,
    launchdate: movie.launchdate,
    showtimes: movie.showtimes
  };

  const urlRes = createMovie(payload);
  console.log('Filme criado', urlRes.body);

  sleep(1);
}

export function teardown() {
  console.log('Teardown - Obtendo filmes para deletar');
  const movies = getMovies();

  if (!movies || movies.length === 0) {
    console.log('Nenhum filme encontrado para deletar');
    return;
  }

  movies.forEach(movie => {
    if (movie._id) {
      console.log(`Teardown - Deletando filme com ID: ${movie._id}`);
      const res = deleteMovie(movie._id);
      console.log(`DELETE resposta para filme ID ${movie._id}:`, res.body);
    }
  });
}