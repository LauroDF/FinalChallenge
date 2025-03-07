const { Faker, pt_BR } = require('@faker-js/faker');
const fs = require('fs');

const faker = new Faker({ locale: [pt_BR] });

const quantidade = process.argv[2] || 10;
const filmes = [];

for (let i = 0; i < quantidade; i++) {
  const filme = {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    launchdate: faker.date.soon({ days: 60 }).toISOString(),
    showtimes: [
      faker.date.soon({ days: 60 }).toISOString(),
      faker.date.soon({ days: 60 }).toISOString(),
    ]
  };
  filmes.push(filme);
}

const data = { 
  movies: filmes 
}

fs.writeFileSync('data/dynamic/movies.json', JSON.stringify(data, null, 2));

console.log('Arquivo movies.json gerado com sucesso!');

// node data/dynamic/generateMovies.js