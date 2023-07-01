import axios, { AxiosResponse } from "axios";

import queryString from "query-string";

const VITE_APP_API = "https://dummyjson.com"; //API URL need config in the .env file

const axiosClient = axios.create({
  baseURL: VITE_APP_API,

  headers: {
    "Content-Type": "application/json",
  },

  paramsSerializer: (params) => {
    // for (let key in params) {
    //     params[key] = JSON.stringify(params[key]);
    // }
    const paramString = queryString.stringify(params);

    return paramString;
  },
});

axios.defaults.baseURL = VITE_APP_API;
axiosClient.interceptors.request.use(async (config: any) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error.response?.data;
  }
);

export default axiosClient;
