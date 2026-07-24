import axios from 'axios';

/**
 * Pre-configured Axios instance.
 *
 * In production we route all browser auth calls through the Next.js app so the
 * session cookie is set on the frontend domain and available to server-rendered
 * pages such as the dashboard.
 */
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:2026/api');

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
