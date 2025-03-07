const { Faker, pt_BR } = require('@faker-js/faker');
const fs = require('fs');

const faker = new Faker({ locale: [pt_BR] });

// Função para gerar tickets
const quantidade = process.argv[2] || 10;
  const tickets = [];

  for (let i = 0; i < quantidade; i++) {
    const ticket = {
      movieId: faker.string.uuid(),      // ID do filme
      userId: faker.string.uuid(),       // ID do usuário
      seatNumber: faker.number.int(60),  // Número do assento
      price: faker.number.float({ min: 10, max: 100, precision: 0.01 }), // Preço do ticket
      showtime: faker.date.soon({ days: 60 }).toISOString(), // Data e hora do showtime
    };
  tickets.push(ticket);
}

const data = { 
  movies: tickets 
}

fs.writeFileSync('data/dynamic/tickets.json', JSON.stringify(data, null, 2));

console.log('Arquivo tickets.json gerado com sucesso!');

// node data/dynamic/generateTickets.js