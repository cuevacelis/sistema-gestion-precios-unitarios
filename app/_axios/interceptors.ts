import axios from "axios";

export const instanceAxios = axios.create();
instanceAxios.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.baseURL = process.env.URL_API;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instanceAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
