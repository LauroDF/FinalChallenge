import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../base/functionExporter';

export const options = testConfig.options.smokeThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/dynamic/users.json'));
  return jsonData.users;  // Aqui, acessa-se a chave 'users' que contém o array
});

export function createUser() {
  let responseData = [];

  data.forEach(user => {
    console.log('Criando um usuário', user);
    const res = baseRest.post(ENDPOINTS.USER_ENDPOINT, user);
    console.log('Instância BaseRest:', baseRest);

    baseChecks.checkStatusCode(res, 201);

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
  sleep(1);
}

export function teardown(responseData) {
    console.log(responseData.responseData)
}