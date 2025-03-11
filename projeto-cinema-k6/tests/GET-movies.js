import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { getMovies, createMovie, deleteMovie, testConfig } from '../support/utils/apiRequests.js';

export const options = testConfig.options.smokeTest;

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
  console.log('Setup - Filme criado', urlRes.body);
}

export default () => {
  console.log('Função principal');

  // Função GET
  console.log('Listando filmes após criação');
  const moviesRes = getMovies();
  console.log('Filmes disponíveis:', JSON.stringify(moviesRes, null, 2));

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