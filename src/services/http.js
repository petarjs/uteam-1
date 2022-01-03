import axios from 'axios';

const baseURL = 'http://localhost:1337';
const backendClient = axios.create({
  baseURL,
  timeout: 1000,
});

export default backendClient;
