import api from './axios';
import type { User, UpdateProfilePayload } from '@/types';

interface ProfileResponse {
  success: boolean;
  message?: string;
  user: User;
}

/**
 * GET /api/profile/me
 * Fetches the full profile of the currently authenticated user.
 */
export async function getProfile(): Promise<User> {
  const { data } = await api.get<ProfileResponse>('/profile/me');
  return data.user;
}

/**
 * PUT /api/profile/me
 * Updates allowed profile fields: name, studentId, course, year.
 */
export async function updateProfile(payload: UpdateProfilePayload): Promise<User> {
  const { data } = await api.put<ProfileResponse>('/profile/me', payload);
  return data.user;
}
