import { sleep } from 'k6';
import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../base/functionExporter';

export const options = testConfig.options.smokeThresholds;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export function deleteUser(responseData) {
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
    sleep(1);
  })
}