import axios from 'axios';

const baseURL = 'http://localhost:1337';
export const backendClient = axios.create(
  {
    baseURL,
    timeout: 6000,
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

export const jwtInterceptor = (jwt) => {
  backendClient.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${jwt}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
