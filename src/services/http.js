import axios from 'axios';

let baseURL;
if (process.env.API_URL) {
  baseURL = process.env.API_URL;
} else {
  baseURL = process.env.REACT_APP_LOCAL_API_URL;
}

export const backendClient = axios.create(
  {
    baseURL,
    timeout: 66000,
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
