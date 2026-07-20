import axios from 'axios';

/**
 * Pre-configured Axios instance.
 *
 * - baseURL   → NEXT_PUBLIC_API_URL from .env.local (e.g. http://localhost:3000/api)
 * - withCredentials → true  so the httpOnly "token" cookie is sent on every request
 * - Content-Type set to JSON by default
 */
const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "http://localhost:2026/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
