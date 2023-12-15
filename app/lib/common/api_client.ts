import axios, { Axios, AxiosResponse } from 'axios'

type DataType = Record<string, any> | null;
export default class ApiClient {
    _api: Axios;
    constructor() {
        this._api = axios.create({ baseURL: process.env.HOST })
    }

    async get<D>(url: string, data?: DataType): Promise<D | Error> {
        const request = async () => await this._api.get(url, {
            data: {
                ...data,
                next: { tags: [url] }
            }
        });
        return this.parseApiResponse(request);
    }

    async post<D>(url: string, data: any): Promise<D | Error> {
        const request = async () => await this._api.post(url, data);
        return this.parseApiResponse(request);
    }

    async delete<D>(url: string, data: any): Promise<D | Error> {
        const request = async () => await this._api.delete(url, data);
        return this.parseApiResponse(request);
    }

    async put<D>(url: string, data: any): Promise<D | Error> {
        const request = async () => await this._api.put(url, data);
        return this.parseApiResponse(request);
    }

    async parseApiResponse<D>(callRequest: () => Promise<AxiosResponse<D | Error>>): Promise<D | Error> {
        try {
            const response = await callRequest()
            if (response.status <= 400) {
                return response.data;
            }
            return Error('api error');
        } catch (e) {
            console.error(e)
            return Error('unexpected');
        }

    }

}

