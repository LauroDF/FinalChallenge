export const testConfig = {
    environment: {
        hml: {
            url: "http://localhost:3000",
        },
        dev: {
            url: "http://localhost:3333",
        },
        ec2: {
            url: "http://EndereçoIpPúblicoqSeráDisponibilizado:3000",
        }
    },
    options: {
        smokeTest: {
            vus: 1, // Smoke test com poucos usuários
            duration: '10s',
            thresholds: {
                http_req_duration: ['p(95)<1500'], // Requisições devem ser rápidas
                http_req_failed: ['rate<0.05'] // Erros abaixo de 5%
            }
        },
        loadTest: {
            stages: [
                { duration: '1m', target: 30 }, // Aumento gradual para carga normal
                { duration: '3m', target: 50 }, // Sustentação de carga normal
                { duration: '1m', target: 30 }, // Redução gradual
            ],
            thresholds: {
                http_req_duration: ['p(95)<4000'], // 95% das requisições abaixo de 4000ms
                http_req_failed: ['rate<0.05'] // Até 5% de erros permitidos
            }
        },
        stressTest: {
            stages: [
                { duration: '2m', target: 80 }, // Subida para cenário de pico
                { duration: '2m', target: 100 }, // Sustentação em pico
                { duration: '2m', target: 50 }, // Redução gradual
            ],
            thresholds: {
                http_req_duration: ['p(95)<1000'], // Permite até 1s para cenários críticos
                http_req_failed: ['rate<0.10'] // Até 10% de erros permitidos
            }
        },
        spikeTest: {
            stages: [
                { duration: '10s', target: 100 }, // Pico súbito de carga
                { duration: '30s', target: 100 }, // Manutenção do pico
                { duration: '10s', target: 10 }, // Redução abrupta
            ],
            thresholds: {
                http_req_duration: ['p(95)<1200'],
                http_req_failed: ['rate<0.15'] // Até 15% de erro permitido
            }
        },
        enduranceTest: {
            stages: [
                { duration: '5m', target: 50 }, // Carga sustentada por 5 minutos
                { duration: '10m', target: 50 }, // Mantendo a carga
                { duration: '5m', target: 30 }, // Redução gradual
            ],
            thresholds: {
                http_req_duration: ['p(95)<1000'],
                http_req_failed: ['rate<0.05']
            }
        }
    }
};