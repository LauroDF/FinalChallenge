const { Faker, pt_BR } = require('@faker-js/faker');
const fs = require('fs');

const faker = new Faker({ locale: [pt_BR] });

const quantidade = process.argv[2] || 10;
const usuarios = [];

for (let i = 0; i < quantidade; i++) {
  const usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email({ provider: 'examplo.qa.com.br' }),
      password: faker.internet.password(),
      administrador: "true"
    };
  usuarios.push(usuario);
}

const data = {
  users: usuarios
}

fs.writeFileSync('data/dynamic/users.json', JSON.stringify(data, null, 2));

console.log('Arquivo users.json gerado com sucesso!');

//node data/dynamic/generateUsers.js 10 