import axios, { AxiosInstance, AxiosResponse } from 'axios';

class Axios {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get(path: string, payload = null as any) {
    return this.axios
      .get(path, payload)
      .then((response: AxiosResponse) => response);
  }

  put(path: string, payload = null as any) {
    return this.axios
      .put(path, payload)
      .then((response: AxiosResponse) => response);
  }

  post(path: string, payload = null as any) {
    return this.axios
      .post(path, payload)
      .then((response: AxiosResponse) => response);
  }

  delete(path: string, payload = null as any) {
    return this.axios
      .delete(path, payload)
      .then((response: AxiosResponse) => response);
  }
}

const client = new Axios();

export default client;
