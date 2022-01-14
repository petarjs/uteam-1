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
