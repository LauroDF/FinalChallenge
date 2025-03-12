import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { getMovies, createMovie, deleteMovie, testConfig, getMovieById } from '../support/utils/apiRequests.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// HTML
export function handleSummary(data) {
    return {
      "GET-ID-movies-loadTest.html": htmlReport(data),
    };
}
export const options = testConfig.options.loadTest;

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/dynamic/movies.json'));
  return jsonData.movies;
});

export function setup() {
  console.log('Setup - Criando um filme antes do teste principal');
  
  let movie = randomItem(data);
  const payload = {
    title: movie.title,
    description: movie.description,
    launchdate: movie.launchdate,
    showtimes: movie.showtimes
  };

  const urlRes = createMovie(payload);
  console.log('POST filme realizado', urlRes.body);

  const moviesRes = getMovies();
  console.log('Listando filmes após criação:', JSON.stringify(moviesRes, null, 2));

  return { moviesRes };
}

export default ({ moviesRes }) => {
  console.log('Executando teste principal');

  if (moviesRes && moviesRes.length > 0) {
    const movieId = moviesRes[0]._id;
    console.log(`GET para filme com ID: ${movieId}`);
    const movieDetails = getMovieById(movieId);
    console.log('GET filme por ID:', JSON.stringify(movieDetails, null, 2));
  }

  sleep(1);
};

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
