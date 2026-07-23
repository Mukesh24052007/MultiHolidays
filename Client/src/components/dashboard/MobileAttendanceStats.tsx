'use client';

/**
 * MobileAttendanceStats
 *
 * Mobile-layout version of the attendance metrics.
 * Fetches live data from GET /api/attendance/user/:userId/percentage
 * and renders the circular progress ring, present/absent tiles.
 */

import { useEffect, useState } from 'react';
import { getMe } from '@/lib/auth';
import { getAttendancePercentage } from '@/lib/attendance';
import type { AttendancePercentageResponse } from '@/lib/attendance';
import Icon from '@/components/ui/Icon';

type LoadState = 'loading' | 'success' | 'error';

/** SVG circle circumference for r=34: 2π×34 ≈ 213.6 */
const CIRCUMFERENCE = 2 * Math.PI * 34;

function pctToOffset(pct: number) {
  return CIRCUMFERENCE * (1 - Math.min(100, Math.max(0, pct)) / 100);
}

export default function MobileAttendanceStats() {
  const [state, setState] = useState<LoadState>('loading');
  const [data, setData]   = useState<AttendancePercentageResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const user = await getMe();
        if (cancelled) return;

        const result = await getAttendancePercentage(user.id);
        if (cancelled) return;

        setData(result);
        setState('success');
      } catch {
        if (!cancelled) setState('error');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  /* ── Loading skeleton ───────────────────────────────────────────── */
  if (state === 'loading') {
    return (
      <div className="grid grid-cols-1 gap-sm animate-pulse">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md h-[100px]" />
        <div className="grid grid-cols-2 gap-sm">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md h-[80px]" />
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md h-[80px]" />
        </div>
      </div>
    );
  }

  /* ── Error state ────────────────────────────────────────────────── */
  if (state === 'error' || !data) {
    return (
      <p className="text-label-md text-error px-base py-sm">
        Could not load attendance data.
      </p>
    );
  }

  const pct         = data.percentage;
  const isHealthy   = pct >= 75;
  const strokeOffset = pctToOffset(pct);

  return (
    <div className="grid grid-cols-1 gap-sm">
      {/* Circular ring card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center justify-between hover:translate-y-[-2px] transition-all duration-200">
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant">Overall Attendance</p>
          <h3 className={`font-headline-xl text-headline-xl mt-xs ${isHealthy ? 'text-tertiary' : 'text-error'}`}>
            {pct.toFixed(1)}%
          </h3>
          <p className={`font-label-sm text-label-sm mt-xs ${isHealthy ? 'text-tertiary' : 'text-error'}`}>
            {isHealthy ? 'Above threshold' : 'Below 75% threshold'}
          </p>
        </div>
        <div className="relative flex items-center justify-center w-20 h-20">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
            <circle
              className="text-surface-container-high"
              cx="40" cy="40"
              fill="transparent"
              r="34"
              stroke="currentColor"
              strokeWidth="8"
            />
            <circle
              className={isHealthy ? 'text-tertiary' : 'text-error'}
              cx="40" cy="40"
              fill="transparent"
              r="34"
              stroke="currentColor"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              strokeWidth="8"
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <Icon
            name={isHealthy ? 'check_circle' : 'warning'}
            filled
            className={`absolute ${isHealthy ? 'text-tertiary' : 'text-error'}`}
          />
        </div>
      </div>

      {/* Present / Absent tiles */}
      <div className="grid grid-cols-2 gap-sm">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
          <Icon name="event_available" className="text-primary mb-xs" />
          <p className="font-label-sm text-label-sm text-on-surface-variant">Days Present</p>
          <p className="font-headline-md text-headline-md">{data.summary.presentDays}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
          <Icon name="event_busy" className="text-error mb-xs" />
          <p className="font-label-sm text-label-sm text-on-surface-variant">Days Absent</p>
          <p className="font-headline-md text-headline-md">{data.summary.absentDays}</p>
        </div>
      </div>
    </div>
  );
}
