import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
/*import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// HTML
export function handleSummary(data) {
    return {
      "teste-fluxoClean-tickets-ticketsPerformanceTest.html": htmlReport(data),
    };
}*/
export const options = testConfig.options.smokeTest;

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregar dados de tickets
const data = new SharedArray('Tickets', function () {
  const jsonData = JSON.parse(open('../data/dynamic/tickets.json')); // Usando o arquivo de tickets
  return jsonData.movies; // Supondo que tickets.json tenha uma lista de filmes
});

export default () => {
  console.log('Função principal');
  
  // Selecionando um ticket aleatório
  let ticket = randomItem(data); // Escolhe um ticket aleatório da lista

  // Garantir que o preço seja menor ou igual a 60
  const price = ticket.price > 60 ? 60 : ticket.price; // Ajusta o preço caso seja maior que 60

  // Montando o payload para a requisição POST
  const payload = {
    movieId: ticket.movieId,
    userId: ticket.userId,
    seatNumber: ticket.seatNumber,
    price: price, // Preço ajustado
    showtime: ticket.showtime
  };

  // Enviando a requisição POST para criar o ticket
  const urlRes = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, payload, { headers: { 'Content-Type': 'application/json' } });

  console.log('POST ticket realizado, resposta:', urlRes.body);

  // Realizando as validações
  baseChecks.checkStatusCode(urlRes, 201); // Verificando o status code
  baseChecks.checkResponseTimeRecorded(urlRes); // Verificando o tempo de resposta
  baseChecks.checkHeadersExist(urlRes); // Verificando os headers

  // Requisição GET para listar os tickets
  const getRes = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT); // Supondo que a lista de tickets esteja na endpoint de TICKETS
  console.log('GET tickets realizado, resposta:', getRes.body);

  baseChecks.checkStatusCode(getRes, 200);
  baseChecks.checkResponseTimeRecorded(getRes);
  baseChecks.checkHeadersExist(getRes);

  sleep(1); // Atraso de 1 segundo entre as requisições
};

/*
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = testConfig.options.smokeThresholds;

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('Tickets', function () {
  const jsonData = JSON.parse(open('../data/dynamic/tickets.json')); // Usando o arquivo de tickets
  return jsonData.movies; // Supondo que tickets.json tenha uma lista de filmes
});

let createdTicketId; // Variável global para armazenar o ID do ticket criado

// Função para criar um ticket
function createTicket(ticketData) {
  const payload = JSON.stringify(ticketData); // Preparando os dados do ticket no formato JSON

  const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, payload, { headers: { 'Content-Type': 'application/json' } });
  baseChecks.checkStatusCode(res, 201); // Verificando se a criação foi bem-sucedida
  baseChecks.checkResponseTimeRecorded(res);
  baseChecks.checkHeadersExist(res);

  createdTicketId = res.json()._id; // Armazenando o ID do ticket criado na variável global
  console.log(`Ticket criado com ID: ${createdTicketId}`);
}

// Função para deletar o ticket criado
function deleteTicket(ticketId) {
  const res = baseRest.delete(`${ENDPOINTS.TICKETS_ENDPOINT}/${ticketId}`); // Deletando o ticket usando o ID
  baseChecks.checkStatusCode(res, 200); // Verificando se o delete foi bem-sucedido
  baseChecks.checkResponseTimeRecorded(res);
  baseChecks.checkHeadersExist(res);

  console.log(`Ticket com ID ${ticketId} deletado com sucesso.`);
}

export default () => {
  console.log('Função principal');
  
  let movie = randomItem(data);

  const payload = {
    title: movie.title,
    description: movie.description,
    launchdate: movie.launchdate,
    showtimes: movie.showtimes
  };

  // Criando um ticket com POST
  const postRes = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, payload);
  console.log('POST ticket realizado, resposta:', postRes.body);

  baseChecks.checkStatusCode(postRes, 201);
  baseChecks.checkResponseTimeRecorded(postRes);
  baseChecks.checkHeadersExist(postRes);

  // Requisição GET para listar os tickets
  const getRes = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT); // Supondo que a lista de tickets esteja na endpoint de TICKETS
  console.log('GET tickets realizado, resposta:', getRes.body);

  baseChecks.checkStatusCode(getRes, 200);
  baseChecks.checkResponseTimeRecorded(getRes);
  baseChecks.checkHeadersExist(getRes);
  
  sleep(1);
};

// Teardown - deleta o ticket criado após o teste
export function teardown() {
  if (createdTicketId) {
    deleteTicket(createdTicketId); // Deletando o ticket usando o ID armazenado
  } else {
    console.log("Nenhum ticket foi criado, portanto, não há nada para deletar.");
  }
}
*/