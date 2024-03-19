/* eslint-disable*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://toy-shop-api.onrender.com/api/';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const config: AxiosRequestConfig = {
    method: method,
    url: BASE_URL + url,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  if (data) {
    config.data = JSON.stringify(data);
  }

  return axios(config)
    .then((response) => response.data)
    .catch(error => {
      throw new Error('Network Error');
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

