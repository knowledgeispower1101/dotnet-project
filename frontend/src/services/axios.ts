import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5115/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
