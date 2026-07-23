'use client';

import Icon from '@/components/ui/Icon';
import type { AttendanceStatus } from '@/lib/attendance';

type TodayStatus = AttendanceStatus | 'unmarked' | 'loading';

type Props = {
  status: TodayStatus;
  onOpenPopup: () => void;
};

export default function TodayAttendanceBanner({ status, onOpenPopup }: Props) {
  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4 mb-6 animate-pulse flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-high shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-40 bg-surface-container-high rounded" />
          <div className="h-2.5 w-56 bg-surface-container-high rounded" />
        </div>
      </div>
    );
  }

  // ── Already marked ──────────────────────────────────────────────────────────
  if (status === 'present' || status === 'absent') {
    const isPresent = status === 'present';
    return (
      <div className={`rounded-xl border p-4 mb-6 flex items-center gap-3 transition-all duration-300 ${
        isPresent ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      }`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          isPresent ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <Icon
            name={isPresent ? 'check_circle' : 'cancel'}
            filled
            className="text-white text-[20px]"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${isPresent ? 'text-green-700' : 'text-red-600'}`}>
            Today&apos;s attendance marked
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            You&apos;re recorded as{' '}
            <span className="font-semibold capitalize">{status}</span> for{' '}
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', month: 'short', day: 'numeric',
            })}
          </p>
        </div>
        <span className={`hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
          isPresent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
        }`}>
          <Icon name="done" className="text-[14px]" />
          Done
        </span>
      </div>
    );
  }

  // ── Unmarked — prompt to mark ───────────────────────────────────────────────
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-6 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-400 shrink-0">
        <Icon name="pending_actions" filled className="text-white text-[20px]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-800">Attendance not marked yet</p>
        <p className="text-xs text-amber-700 mt-0.5">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric',
          })}
          {' — '}tap the button to mark now.
        </p>
      </div>
      <button
        onClick={onOpenPopup}
        className="shrink-0 flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all"
      >
        <Icon name="how_to_reg" className="text-[16px]" />
        <span className="hidden sm:inline">Mark now</span>
        <span className="sm:hidden">Mark</span>
      </button>
    </div>
  );
}
