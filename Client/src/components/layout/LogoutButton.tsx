'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';

type Props = {
  /** 'full' = icon + label side-by-side (sidebar); 'icon' = icon only */
  variant?: 'full' | 'icon';
  className?: string;
};

export default function LogoutButton({ variant = 'full', className = '' }: Props) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;
    setLoading(true);
    await logout();
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        aria-label="Sign out"
        className={`hover:bg-surface-container-low rounded-full p-2 transition-colors active:opacity-80 disabled:opacity-50 ${className}`}
      >
        {loading
          ? <Icon name="progress_activity" className="text-on-surface-variant animate-spin" />
          : <Icon name="logout" className="text-on-surface-variant" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`w-full flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-error hover:bg-error/5 transition-colors duration-200 disabled:opacity-50 ${className}`}
    >
      {loading
        ? <Icon name="progress_activity" className="animate-spin" />
        : <Icon name="logout" />}
      <span>{loading ? 'Signing out…' : 'Sign Out'}</span>
    </button>
  );
}
