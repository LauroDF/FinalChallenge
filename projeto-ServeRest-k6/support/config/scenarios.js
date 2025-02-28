import { ENDPOINTS } from '../support/base/baseTest.js';

export const testScenarios = {
  discardResponseBodies: true,
  scenarios: {
    createUser: {
      executor: 'constant-vus',
      exec: 'createUser',
      vus: 50,
      duration: '30s',
    },
    getUsers: {
      executor: 'per-vu-iterations',
      exec: 'getUsers',
      vus: 50,
      iterations: 100,
      startTime: '30s',
      maxDuration: '1m',
    },
  },
};

export function createUser() {
    const payload = {
      name: 'Test User',
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    };
  
    console.log('Criando usuário:', payload);
  
    const res = baseRest.post(ENDPOINTS.USER_ENDPOINT, payload);
  
    baseChecks.checkStatusCode(res, 201);
    baseChecks.checkResponseNotEmpty(res);
    baseChecks.checkResponseTimeRecorded(res);
    baseChecks.checkHeadersExist(res);
    baseChecks.checkValidJsonResponse(res);
  }
  
  export function getUsers() {
    const res = baseRest.get(ENDPOINTS.USER_ENDPOINT);
  
    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkResponseNotEmpty(res);
    baseChecks.checkResponseTimeRecorded(res);
    baseChecks.checkHeadersExist(res);
    baseChecks.checkValidJsonResponse(res);
  }
  

export default () => {
    // Rodar os cenários de teste
    createUser();
    getUsers();
};