'use client';

import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import Icon from '@/components/ui/Icon';
import { markAttendance } from '@/lib/attendance';
import type { AttendanceStatus } from '@/lib/attendance';

const STORAGE_KEY = 'attendance_marked_date';

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ─── Public handle ────────────────────────────────────────────────────────────
export interface AttendancePopupHandle {
  open: () => void;
}

type Props = {
  /** Resolved user id from parent — null while auth is still loading */
  userId: string | null;
  /** Called immediately after a successful mark so the banner updates instantly */
  onMarked: (status: AttendanceStatus) => void;
};

// ─────────────────────────────────────────────────────────────────────────────

const AttendancePopup = forwardRef<AttendancePopupHandle, Props>(
  ({ userId, onMarked }, ref) => {
    const [visible, setVisible]     = useState(false);
    const [selected, setSelected]   = useState<AttendanceStatus | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState<string | null>(null);

    const openPopup = useCallback(() => {
      setSelected(null);
      setSubmitted(false);
      setError(null);
      setVisible(true);
    }, []);

    useImperativeHandle(ref, () => ({ open: openPopup }), [openPopup]);

    async function handleSubmit() {
      if (!selected || !userId) return;
      setLoading(true);
      setError(null);

      try {
        await markAttendance({ userId, date: getTodayKey(), status: selected });

        // Persist locally so future mounts skip the API check
        localStorage.setItem(STORAGE_KEY, getTodayKey());

        // Notify parent immediately — banner flips to "marked" right now
        onMarked(selected);

        setSubmitted(true);
      } catch (err: unknown) {
        const message =
          (err as { response?: { data?: { message?: string } } })
            ?.response?.data?.message ?? 'Something went wrong. Please try again.';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    function handleClose() {
      setVisible(false);
      setSelected(null);
      setError(null);
    }

    if (!visible) return null;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="attendance-popup-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      >
        <div className="relative w-full max-w-[420px] min-w-[300px] bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">

          {/* Close */}
          {!submitted && (
            <button
              onClick={handleClose}
              aria-label="Dismiss"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Icon name="close" />
            </button>
          )}

          {/* ── Success state ── */}
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100">
                <Icon name="check_circle" filled className="text-green-600 text-[40px]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Attendance Marked!</h2>
                <p className="text-sm text-gray-500 mt-1">
                  You&apos;re marked as{' '}
                  <span className={selected === 'present' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                    {selected === 'present' ? 'Present' : 'Absent'}
                  </span>{' '}
                  for today.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="mt-2 w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3 mb-6 pr-8">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Icon name="how_to_reg" filled className="text-blue-600 text-[22px]" />
                </div>
                <div>
                  <h2 id="attendance-popup-title" className="text-lg font-semibold text-gray-900 leading-tight">
                    Mark Today&apos;s Attendance
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  onClick={() => { setSelected('present'); setError(null); }}
                  aria-pressed={selected === 'present'}
                  className={`flex flex-col items-center gap-2 py-5 px-3 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
                    selected === 'present'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                    selected === 'present' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'
                  }`}>
                    <Icon name="check_circle" filled className="text-[28px]" />
                  </div>
                  <span className={`text-sm font-semibold ${selected === 'present' ? 'text-green-600' : 'text-gray-700'}`}>
                    Present
                  </span>
                </button>

                <button
                  onClick={() => { setSelected('absent'); setError(null); }}
                  aria-pressed={selected === 'absent'}
                  className={`flex flex-col items-center gap-2 py-5 px-3 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
                    selected === 'absent'
                      ? 'border-red-400 bg-red-50 shadow-md'
                      : 'border-gray-200 bg-gray-50 hover:border-red-300 hover:bg-red-50/50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                    selected === 'absent' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-500'
                  }`}>
                    <Icon name="cancel" filled className="text-[28px]" />
                  </div>
                  <span className={`text-sm font-semibold ${selected === 'absent' ? 'text-red-500' : 'text-gray-700'}`}>
                    Absent
                  </span>
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-2 mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                  <Icon name="error" className="text-red-500 text-[18px] shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!selected || loading}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selected && !loading
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="progress_activity" className="animate-spin text-[18px]" />
                    Saving…
                  </span>
                ) : (
                  'Confirm Attendance'
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                You can only mark attendance once per day.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
);

AttendancePopup.displayName = 'AttendancePopup';
export default AttendancePopup;
