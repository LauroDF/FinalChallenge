import { check } from 'k6';

export class BaseChecks {
    checkStatusCode(response, expectedStatus = 200) {
        check(response, {
            'status code check': (r) => r && r.status === expectedStatus,
        });
    }

    checkResponseNotEmpty(response) {
        check(response, {
            'response body is not empty': (r) => {
                try {
                    const json = JSON.parse(r.body);
                    return json && Object.keys(json).length > 0;
                } catch (e) {
                    return false;
                }
            },
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

    checkValidJsonResponse(response) {
        check(response, {
            'response contains valid JSON': (r) => {
                return r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json');
            },
        });
    }
}
