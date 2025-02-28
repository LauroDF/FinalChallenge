import { BaseService } from "./baseService.js";
import http from "k6/http";

export class BaseRest extends BaseService {
    constructor(base_uri) {
        super(base_uri);
        this.token = ''; // Aqui você pode guardar o token para ser utilizado nas requisições
    }

    // Método para setar o token de autenticação
    setAuthToken(token) {
        this.token = token;
    }

    post(endpoint, body, headers = {}, params = {}) {
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers, params);
        return http.post(uri, JSON.stringify(body), options);
    }

    delete(endpoint, headers = {}, params = {}) {
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers, params);
        return http.del(uri, options);
    }

    get(endpoint, headers = {}, params = {}) {
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers, params);
        return http.get(uri, options);
    }

    put(endpoint, body, headers = {}, params = {}) {
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers, params);
        return http.put(uri, JSON.stringify(body), options);
    }        

    buildOptions(headers = {}, params = {}) {
        // Adicionando o token de autenticação, se existir
        let authHeaders = this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
        return {
            headers: Object.assign({'Content-Type': 'application/json'}, authHeaders, headers),
            params: Object.assign({}, params)
        }
    }
}
