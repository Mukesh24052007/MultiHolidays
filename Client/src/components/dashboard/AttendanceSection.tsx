'use client';

/**
 * AttendanceSection — single client boundary owning all shared state.
 *
 * Uses AuthContext so the userId is resolved once across the entire page,
 * rather than firing a separate /auth/me call here.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import AttendancePopup from './AttendancePopup';
import TodayAttendanceBanner from './TodayAttendanceBanner';
import { useAuth } from '@/context/AuthContext';
import { getTodayAttendance } from '@/lib/attendance';
import type { AttendanceStatus } from '@/lib/attendance';
import type { AttendancePopupHandle } from './AttendancePopup';

type TodayStatus = AttendanceStatus | 'unmarked' | 'loading';

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function AttendanceSection() {
  const { user, loading: authLoading } = useAuth();
  const popupRef = useRef<AttendancePopupHandle>(null);
  const [todayStatus, setTodayStatus] = useState<TodayStatus>('loading');

  useEffect(() => {
    if (authLoading || !user) return;
    let cancelled = false;

    (async () => {
      try {
        const status = await getTodayAttendance(user.id, getTodayKey());
        if (cancelled) return;
        setTodayStatus(status);

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
  }, [user, authLoading]);

  const handleMarked = useCallback((status: AttendanceStatus) => {
    setTodayStatus(status);
  }, []);

  return (
    <>
      <TodayAttendanceBanner
        status={todayStatus}
        onOpenPopup={() => popupRef.current?.open()}
      />
      <AttendancePopup
        ref={popupRef}
        userId={user?.id ?? null}
        onMarked={handleMarked}
      />
    </>
  );
}
