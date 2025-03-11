import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { getMovies, createMovie, deleteMovie, testConfig, updateMovieById, getMovieById } from '../support/utils/apiRequests.js';

export const options = testConfig.options.performanceTest;

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/dynamic/movies.json'));
  return jsonData.movies;
});

export default () => {
  console.log('Função principal');
  
  // Escolhe filme aleatório do arquivo movies.json
  let movie = randomItem(data);

  // Função POST
  const payload = {
    title: movie.title,
    description: movie.description,
    launchdate: movie.launchdate,
    showtimes: movie.showtimes
  };

  const urlRes = createMovie(payload);

  console.log('POST filme realizado', urlRes.body);

  // Função GET
  console.log('Listando filmes após criação');
  const moviesRes = getMovies();
  console.log('Filmes disponíveis:', JSON.stringify(moviesRes, null, 2));

  // Função PUT para atualizar um filme por ID
  if (moviesRes.length > 0) {
    const movieToUpdate = moviesRes[0];
    const updatedPayload = { ...movieToUpdate, title: `${movieToUpdate.title} - Updated` };
    const updateRes = updateMovieById(movieToUpdate._id, updatedPayload);
    console.log('PUT filme atualizado', updateRes.body);
  }

  // Função GET para um filme por ID
  if (moviesRes.length > 0) {
    const movieId = moviesRes[0]._id;
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