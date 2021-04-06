import http from '../services/api';

export default class APIController {
    static async get(route) {
        try {
            const response = await http.get(route);

            return Promise.resolve(response && response.data ? response.data : [])
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
