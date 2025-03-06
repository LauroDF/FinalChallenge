import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = testConfig.options.smokeThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/dynamic/users.json'));
  return jsonData.users;  // Aqui, acessa-se a chave 'users' que contém o array
});

export function setup() {
  let responseData = [];

  data.forEach(user => {
    console.log('Criando um usuário', user);
    const res = baseRest.post(ENDPOINTS.USER_ENDPOINT, user);
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

  console.log(`SETUP CRIANDO USER`);
  
  // Aqui retorna um único objeto, mas você pode querer retornar o conjunto completo de dados
  // Retornando todos os dados de resposta (todos os usuários criados)
  return { responseData };
}

export default () => {
  console.log('Função principal');
  // let userIndex = __ITER % data.length;
  // let user = data[userIndex];
  let user = randomItem(data);

  const payload = {
    email: user.email,
    password: user.password
  }
  console.log('Login com usuário', payload)

  const urlRes = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payload);

  baseChecks.checkStatusCode(urlRes, 200);
  baseChecks.checkResponseNotEmpty(urlRes);
  baseChecks.checkResponseTimeRecorded(urlRes);
  baseChecks.checkHeadersExist(urlRes);
  baseChecks.checkValidJsonResponse(urlRes);
  
  sleep(1);
};

export function teardown(responseData) {
  console.log(responseData.responseData)
  const ids = responseData.responseData.map(item => item._id)

  ids.forEach(id => {
    console.log(`Teardown - Deletando usuário com ID: ${id}`);

    const res = baseRest.delete(ENDPOINTS.USER_ENDPOINT + `/${id}`);

    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkResponseNotEmpty(res);
    baseChecks.checkResponseTimeRecorded(res);
    baseChecks.checkHeadersExist(res);
    baseChecks.checkValidJsonResponse(res);
  })
}

// k6 run "C:\Users\lauro\OneDrive\Área de Trabalho\Lauro\Compass UOL\Sprint 8\projeto-ServeRest-k6\tests\teste-faker.js"