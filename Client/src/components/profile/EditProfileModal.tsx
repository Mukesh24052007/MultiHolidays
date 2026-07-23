'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { updateProfile } from '@/lib/profile';
import type { User, UpdateProfilePayload } from '@/types';

type Props = {
  user: User;
  onClose: () => void;
  onSaved: (updated: User) => void;
};

export default function EditProfileModal({ user, onClose, onSaved }: Props) {
  const [name, setName]           = useState(user.name || '');
  const [studentId, setStudentId] = useState(user.studentId || '');
  const [course, setCourse]       = useState(user.course || '');
  const [year, setYear]           = useState<string>(user.year ? String(user.year) : '');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  // Trap focus inside modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: UpdateProfilePayload = {};
    if (name.trim())      payload.name      = name.trim();
    if (studentId.trim()) payload.studentId = studentId.trim();
    if (course.trim())    payload.course    = course.trim();
    if (year)             payload.year      = Number(year);

    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      const updated = await updateProfile(payload);
      onSaved(updated);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Failed to save. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="edit" filled className="text-primary text-[20px]" />
            </div>
            <div>
              <h2 id="edit-profile-title" className="text-base font-semibold text-gray-900">
                Edit Profile
              </h2>
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="ep-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <Icon name="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
              <input
                id="ep-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Email — read-only */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[18px]" />
              <input
                type="email"
                value={user.email}
                readOnly
                disabled
                className="w-full pl-9 pr-3 py-2.5 border border-gray-100 rounded-lg text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Student ID */}
          <div>
            <label htmlFor="ep-sid" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Student ID
            </label>
            <div className="relative">
              <Icon name="badge" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
              <input
                id="ep-sid"
                type="text"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder="e.g. 2021BCA001"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Course */}
          <div>
            <label htmlFor="ep-course" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Course / Department
            </label>
            <div className="relative">
              <Icon name="school" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
              <input
                id="ep-course"
                type="text"
                value={course}
                onChange={e => setCourse(e.target.value)}
                placeholder="e.g. BCA, B.Tech CSE"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Year */}
          <div>
            <label htmlFor="ep-year" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Year of Study
            </label>
            <div className="relative">
              <Icon name="calendar_today" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
              <select
                id="ep-year"
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white"
              >
                <option value="">Select year</option>
                {[1, 2, 3, 4, 5, 6].map(y => (
                  <option key={y} value={y}>
                    {y}{['st', 'nd', 'rd', 'th', 'th', 'th'][y - 1]} Year
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <Icon name="error" className="text-red-500 text-[18px] shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Icon name="progress_activity" className="animate-spin text-[16px]" />
                  Saving…
                </>
              ) : (
                <>
                  <Icon name="check" className="text-[16px]" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
