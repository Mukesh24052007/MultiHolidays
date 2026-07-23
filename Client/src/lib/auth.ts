import api from './axios';

export interface Admin {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  // Server returns the payload under "user" (not "admin")
  user: Admin;
}

/**
 * POST /api/auth/login
 *
 * Submits email + password credentials. On success the server sets an
 * httpOnly "token" cookie (7-day expiry) and returns the user payload.
 */
export async function loginUser(email: string, password: string): Promise<Admin> {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  return data.user;
}

/**
 * GET /api/auth/me
 *
 * Silently re-authenticates using the existing httpOnly cookie.
 * Throws an AxiosError (401) if the session has expired.
 */
export async function getMe(): Promise<Admin> {
  const { data } = await api.get<AuthResponse>('/auth/me');
  return data.user;
}

/**
 * POST /api/auth/logout
 *
 * Clears the httpOnly cookie on the server side.
 */
export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}
