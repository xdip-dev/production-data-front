import axios, { AxiosError, Method } from "axios";

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// declare const window: any

export class HttpClient {
	protected instance = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL,
		headers: {
			"content-type": "application/json",
		},
	});

	constructor() {}

	protected async client<T, R>(method: Method, endpoint: string, data?: T, params?: T): Promise<R> {
		try {
			const response = await this.instance({
				url: `${endpoint}`,
				method,
				data,
				params,
			});
			return response.data;
		} catch (error: unknown) {
			if (error && error instanceof AxiosError) {
				throw error.response?.data;
			}
			throw error;
		}
	}
}
