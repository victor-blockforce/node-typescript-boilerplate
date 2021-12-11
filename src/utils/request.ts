/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create();
instance.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response) return err.response.data;
    else if (err.request) return err.request;
    return err;
  }
);
export default (config: AxiosRequestConfig): Promise<any> => {
  return instance(config);
};
