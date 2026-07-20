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
  admin: Admin;
}

/**
 * POST /api/auth/login
 *
 * Submits email + password credentials. On success the server sets an
 * httpOnly "token" cookie (7-day expiry) and returns the admin payload.
 * This is a one-time, user-initiated action.
 */
export async function loginUser(email: string, password: string): Promise<Admin> {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  return data.admin;
}

/**
 * GET /api/auth/me
 *
 * Silently re-authenticates the user using the existing httpOnly cookie.
 * Call this on app load: if it resolves the user is still logged in, if it
 * throws (401) redirect them to the login page.
 */
export async function getMe(): Promise<Admin> {
  const { data } = await api.get<AuthResponse>('/auth/me');
  return data.admin;
}

/**
 * POST /api/auth/logout
 *
 * Clears the httpOnly cookie on the server side.
 */
export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}
