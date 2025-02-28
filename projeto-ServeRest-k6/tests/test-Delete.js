import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseRest, BaseChecks, testConfig, createUser, loginUser, deleteUser, createProduct, deleteProduct } from '../support/base/functionExporter.js';
// import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = testConfig.options.smokeThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/dynamic/users.json'));
  return jsonData.users;
});

export function setup() {
  let responseData = [];
  let token = '';

  data.forEach(user => {
    console.log('Criando um usuário', user);
    const res = createUser(baseRest, user);
    baseChecks.checkStatusCode(res, 201);
    baseChecks.checkResponseNotEmpty(res);

    if (res && res.json()) {
      const createdUser = res.json();
      responseData.push(createdUser);

      // Login com o usuário criado
      const loginRes = loginUser(baseRest, { email: user.email, password: user.password });
      baseChecks.checkStatusCode(loginRes, 200);
      token = loginRes.json().authorization;
    } else {
      console.log('Erro ao obter dados de resposta');
    }
  });

  return { responseData, token };
}

export default function (data) {
  const { token } = data;

  console.log('Criando produto');
  const productRes = createProduct(baseRest, token);
  baseChecks.checkStatusCode(productRes, 201);
  baseChecks.checkResponseNotEmpty(productRes);

  sleep(1);
}

export function teardown(data) {
  const { responseData, token } = data;

  responseData.forEach(user => {
    console.log(`Teardown - Deletando produtos do usuário ${user.email}`);
    const deleteProductRes = deleteProduct(baseRest, token);
    baseChecks.checkStatusCode(deleteProductRes, 200);
    baseChecks.checkResponseNotEmpty(deleteProductRes);
  });

  responseData.forEach(user => {
    console.log(`Teardown - Deletando usuário com email: ${user.email}`);
    const deleteUserRes = deleteUser(baseRest, user._id);
    baseChecks.checkStatusCode(deleteUserRes, 200);
    baseChecks.checkResponseNotEmpty(deleteUserRes);
  });
}
