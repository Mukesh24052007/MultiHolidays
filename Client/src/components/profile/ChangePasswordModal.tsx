'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { changePassword } from '@/lib/profile';

type Props = {
  onClose: () => void;
  onChanged: () => void;
};

export default function ChangePasswordModal({ onClose, onChanged }: Props) {
  const [current, setCurrent]   = useState('');
  const [next, setNext]         = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showCur, setShowCur]   = useState(false);
  const [showNew, setShowNew]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const mismatch  = next && confirm && next !== confirm;
  const tooShort  = next && next.length < 6;
  const canSubmit = current && next && confirm && !mismatch && !tooShort;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    try {
      await changePassword(current, next);
      setSuccess(true);
      setTimeout(() => { onChanged(); }, 1800);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Failed to change password. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-pw-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="lock_reset" filled className="text-primary text-[20px]" />
            </div>
            <h2 id="change-pw-title" className="text-base font-semibold text-gray-900">
              Change Password
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Success state */}
        {success ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Icon name="check_circle" filled className="text-green-500 text-[36px]" />
            </div>
            <p className="text-base font-semibold text-gray-800">Password changed!</p>
            <p className="text-sm text-gray-500">Your password has been updated successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current password */}
            <div>
              <label htmlFor="pw-current" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                <input
                  id="pw-current"
                  type={showCur ? 'text' : 'password'}
                  value={current}
                  onChange={e => setCurrent(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter current password"
                  className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCur(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showCur ? 'Hide' : 'Show'}
                >
                  <Icon name={showCur ? 'visibility_off' : 'visibility'} className="text-[18px]" />
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label htmlFor="pw-new" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Icon name="lock_open" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                <input
                  id="pw-new"
                  type={showNew ? 'text' : 'password'}
                  value={next}
                  onChange={e => setNext(e.target.value)}
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  className={`w-full pl-9 pr-9 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                    tooShort ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showNew ? 'Hide' : 'Show'}
                >
                  <Icon name={showNew ? 'visibility_off' : 'visibility'} className="text-[18px]" />
                </button>
              </div>
              {tooShort && <p className="text-xs text-red-500 mt-1">Password must be at least 6 characters.</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="pw-confirm" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Icon name="lock_open" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
                <input
                  id="pw-confirm"
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Repeat new password"
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                    mismatch ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-primary'
                  }`}
                />
              </div>
              {mismatch && <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <Icon name="error" className="text-red-500 text-[18px] shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Icon name="progress_activity" className="animate-spin text-[16px]" />Saving…</>
                ) : (
                  'Change Password'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
