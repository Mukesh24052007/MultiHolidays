'use client';

/**
 * AttendanceSection — single client boundary owning all shared state.
 *
 * Owns:
 *  - userId            resolved once from /auth/me
 *  - todayStatus       "loading" | "present" | "absent" | "unmarked"
 *
 * Passes down:
 *  - TodayAttendanceBanner  → reads status, calls onOpenPopup
 *  - AttendancePopup        → reads userId/status, calls onMarked(status) on success
 *
 * When the popup marks attendance it calls onMarked(), which instantly updates
 * todayStatus here — the banner re-renders immediately without any page reload
 * or polling round-trip.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import AttendancePopup from './AttendancePopup';
import TodayAttendanceBanner from './TodayAttendanceBanner';
import { getMe } from '@/lib/auth';
import { getTodayAttendance } from '@/lib/attendance';
import type { AttendanceStatus } from '@/lib/attendance';
import type { AttendancePopupHandle } from './AttendancePopup';

type TodayStatus = AttendanceStatus | 'unmarked' | 'loading';

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function AttendanceSection() {
  const popupRef                    = useRef<AttendancePopupHandle>(null);
  const [userId, setUserId]         = useState<string | null>(null);
  const [todayStatus, setTodayStatus] = useState<TodayStatus>('loading');

  // ── Resolve user + fetch today's status once on mount ──────────────────────
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const user = await getMe();
        if (cancelled) return;
        setUserId(user.id);

        const status = await getTodayAttendance(user.id, getTodayKey());
        if (cancelled) return;
        setTodayStatus(status);

        // Auto-open popup if not yet marked
        if (status === 'unmarked') {
          setTimeout(() => {
            if (!cancelled) popupRef.current?.open();
          }, 600);
        }
      } catch {
        if (!cancelled) setTodayStatus('unmarked');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // ── Called by popup the moment attendance is saved ─────────────────────────
  const handleMarked = useCallback((status: AttendanceStatus) => {
    setTodayStatus(status); // instant banner update — no API re-fetch needed
  }, []);

  return (
    <>
      <TodayAttendanceBanner
        status={todayStatus}
        onOpenPopup={() => popupRef.current?.open()}
      />
      <AttendancePopup
        ref={popupRef}
        userId={userId}
        onMarked={handleMarked}
      />
    </>
  );
}
