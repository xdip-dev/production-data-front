import axios, { AxiosError, Method } from "axios";

// declare const window: any;

export class HttpClient {
  protected instance = axios.create({
    baseURL: `http://127.0.0.1:8080`,
    headers: {
      "content-type": "application/json",
    },
  });

  constructor() {}

  protected async client<T, R>(method: Method, endpoint: string, data?: T): Promise<R> {
    try {
      const response = await this.instance({
        url: `${endpoint}`,
        method,
        data,
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
