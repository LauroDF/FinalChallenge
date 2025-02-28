import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// HTML
export function handleSummary(data) {
    return {
      "FluxoUsuarios-smokeTest.html": htmlReport(data),
    };
}