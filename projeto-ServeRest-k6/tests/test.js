import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../support/base/baseTest.js';

export const options = testConfig.options.smokeThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/static/user.json'));
  // more operations
  //console.log(jsonData.users[1]);
  return jsonData.users; // must be an array
});
//console.log(data);

const payLoad = {
  "nome": "Senhor Logado",
  "email": "srlogadotest@qa.com.br",
  "password": "teste",
  "administrador": "true"
}

export function setup() {
  console.log('Instância BaseRest:', baseRest);
  const res = baseRest.post(ENDPOINTS.USER_ENDPOINT, payLoad)
  baseChecks.checkStatusCode(res, 201);
  baseChecks.checkResponseNotEmpty(res);
  baseChecks.checkResponseTimeRecorded(res);
  baseChecks.checkHeadersExist(res);
  baseChecks.checkValidJsonResponse(res);
  // check(res,{
  //   'status should be 201': (r) => r.status === 201
  // })
  console.log(`SETUP CRIANDO USER`);
  return {responseData : res.json(), createdUserEmail: payLoad.email};  // Retornando o e-mail do usuário criado
}

export default (data) => {
  // Pegando o usuário criado no setup
  const createdUserEmail = data.createdUserEmail;
  
  console.log(`Tentando fazer login com o usuário criado: ${createdUserEmail}`);
  
  // Alterando para usar o e-mail do usuário criado no 'setup'
  const loginPayload = {
    "email": createdUserEmail,
    "password": "teste"  // A senha utilizada no 'setup'
  };

  const loginRes = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, loginPayload);
  baseChecks.checkStatusCode(loginRes, 200);
  baseChecks.checkResponseNotEmpty(loginRes);
  baseChecks.checkResponseTimeRecorded(loginRes);
  baseChecks.checkHeadersExist(loginRes);
  baseChecks.checkValidJsonResponse(loginRes);
  // check(loginRes, {
  //   'POST /login should return 200': (res) => res.status == 200,
  // });
  console.log(`REALIZANDO LOGIN`);

  // Listagem de usuários
  const listUsersRes = baseRest.get(ENDPOINTS.USER_ENDPOINT);
  baseChecks.checkStatusCode(listUsersRes, 200);
  baseChecks.checkResponseNotEmpty(listUsersRes);
  baseChecks.checkResponseTimeRecorded(listUsersRes);
  baseChecks.checkHeadersExist(listUsersRes);
  baseChecks.checkValidJsonResponse(listUsersRes);
  // check(listUsersRes, {
  //   'GET /usuarios should return 200': (res) => res.status == 200,
  // });

  //console.log(`LISTAGEM DE USUÁRIOS:`);
  //console.log(listUsersRes.json());
  console.log(`LISTAGEM DE USUÁRIOS (100 primeiros):`, listUsersRes.json().usuarios.slice(0, 100));


  // Pegando o primeiro usuário da lista para consulta por ID
  const firstUserId = listUsersRes.json().usuarios[0]._id;
  console.log(`BUSCANDO USUÁRIO COM ID: ${firstUserId}`);

  // Listagem de um usuário específico
  const specificUserRes = baseRest.get(ENDPOINTS.USER_ENDPOINT + `/${firstUserId}`);
  baseChecks.checkStatusCode(specificUserRes, 200);
  baseChecks.checkResponseNotEmpty(specificUserRes);
  baseChecks.checkResponseTimeRecorded(specificUserRes);
  baseChecks.checkHeadersExist(specificUserRes);
  baseChecks.checkValidJsonResponse(specificUserRes);
  // check(specificUserRes, {
  //   'GET /usuarios/{id} should return 200': (res) => res.status == 200,
  // });

  console.log(`DADOS DO USUÁRIO ESPECÍFICO:`);
  console.log(specificUserRes.json());

  // Atualizando o usuário com PUT
  const updatedPayload = {
    "nome": "Senhor Atualizado",
    "email": "srlogadozzz@qa.com.br",
    "password": "novasenha",
    "administrador": "true"
  };
  console.log(firstUserId)
  const updateRes = baseRest.put(ENDPOINTS.USER_ENDPOINT + `/${firstUserId}`, updatedPayload);

  console.log(`Tentando atualizar usuário com ID: ${firstUserId}`);
  console.log(`Resposta do servidor:`, updateRes.body);
  baseChecks.checkStatusCode(updateRes, 200);
  baseChecks.checkResponseNotEmpty(updateRes);
  baseChecks.checkResponseTimeRecorded(updateRes);
  baseChecks.checkHeadersExist(updateRes);
  baseChecks.checkValidJsonResponse(updateRes);
  // check(updateRes, {
  //   'PUT /usuarios/{id} should return 200': (res) => res.status == 200,
  // });

  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};

export function teardown(responseData) {
  //console.log(responseData)
  const userId = responseData.responseData._id
  const res = baseRest.delete(ENDPOINTS.USER_ENDPOINT + `/${userId}`)
  baseChecks.checkStatusCode(res, 200);
  baseChecks.checkResponseNotEmpty(res);
  baseChecks.checkResponseTimeRecorded(res);
  baseChecks.checkHeadersExist(res);
  baseChecks.checkValidJsonResponse(res);
  // check(res,{
  //   'status should be 200': (r) => r.status === 200
  // })
  console.log(`Teardown deletando Usuário com ID ${userId}`)
}