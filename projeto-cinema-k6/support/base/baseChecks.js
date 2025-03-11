import { check } from 'k6';

export class BaseChecks {
    checkStatusCode(response, expectedStatus = 200) {
        check(response, {
            'status code check': (r) => r && r.status === expectedStatus,
        });
    }

    checkResponseTimeRecorded(response) {
        check(response, {
            'response time was recorded': (r) => r && typeof r.timings.duration === 'number' && r.timings.duration >= 0,
        });
    }

    checkHeadersExist(response) {
        check(response, {
            'response headers exist': (r) => r && r.headers && Object.keys(r.headers).length > 0,
        });
    }

}
