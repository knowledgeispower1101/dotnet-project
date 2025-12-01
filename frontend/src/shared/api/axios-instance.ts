import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;

const axiosClient = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosClient };
