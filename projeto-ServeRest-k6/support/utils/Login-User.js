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

export function loginUser() {
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
}