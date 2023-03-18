import axios from 'axios';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw 'NEXT_PUBLIC_API_URL env var needs to be defined'
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export default api;
