import axios from 'axios';
import { env } from '@/config';

const { VITE_BACKEND_URL } = env;

export const httpClient = axios.create({
  baseURL: VITE_BACKEND_URL,
});
