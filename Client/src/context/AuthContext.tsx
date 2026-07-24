'use client';

/**
 * AuthContext — single source of truth for the authenticated user.
 *
 * Wraps the entire app so any client component can call `useAuth()`
 * instead of independently firing GET /api/auth/me.
 *
 * Provides:
 *  - user        → null while loading, Admin object when authenticated
 *  - loading     → true until the initial /auth/me resolves
 *  - logout()    → calls /api/auth/logout then redirects to /
 *  - refreshUser() → refetch after a profile update
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { getMe, logoutUser } from '@/lib/auth';
import type { Admin } from '@/lib/auth';

interface AuthContextValue {
  user: Admin | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // ignore — clear state regardless
    }
    setUser(null);
    window.location.assign('/');
  }, []);

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
