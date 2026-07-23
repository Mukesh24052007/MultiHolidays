'use client';

/**
 * AttendanceStats
 *
 * Fetches live attendance percentage data from
 *   GET /api/attendance/user/:userId/percentage
 * and renders the four stat cards (percentage, present, absent, working days).
 *
 * Falls back to skeleton cards while loading and shows an error note on failure.
 */

import { useEffect, useState } from 'react';
import { getMe } from '@/lib/auth';
import { getAttendancePercentage } from '@/lib/attendance';
import type { AttendancePercentageResponse } from '@/lib/attendance';
import StatCard from './StatCard';
import type { AttendanceStat } from '@/types';

type LoadState = 'loading' | 'success' | 'error';

/** Build the four stat cards from the API response. */
function buildStats(data: AttendancePercentageResponse): AttendanceStat[] {
  const pct = data.percentage;
  const { presentDays, absentDays, totalWorkingDays } = data.summary;

  return [
    {
      label: 'Current Percentage',
      value: `${pct.toFixed(1)}%`,
      icon: 'analytics',
      iconColor: pct >= 75 ? 'text-tertiary' : 'text-error',
      note: pct >= 75 ? 'Above the 75% threshold' : 'Below the 75% threshold',
      noteColor: pct >= 75 ? 'text-tertiary' : 'text-error',
      progress: pct,
    },
    {
      label: 'Days Present',
      value: presentDays,
      unit: 'days',
      icon: 'event_available',
      iconColor: 'text-primary',
      note: `Out of ${totalWorkingDays} working days`,
    },
    {
      label: 'Days Absent',
      value: absentDays,
      unit: 'days',
      icon: 'event_busy',
      iconColor: 'text-error',
      note: `Each absence costs −3%`,
      noteColor: absentDays > 0 ? 'text-error' : undefined,
    },
    {
      label: 'Working Days',
      value: totalWorkingDays,
      unit: 'total',
      icon: 'today',
      iconColor: 'text-on-surface-variant',
      note: `${data.attendanceWindow.from} → ${data.attendanceWindow.to}`,
    },
  ];
}

/** Placeholder skeleton cards shown while fetching. */
function SkeletonCards() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between h-[120px] animate-pulse"
        >
          <div className="flex justify-between items-start mb-sm">
            <div className="h-4 w-28 rounded bg-outline-variant/50" />
            <div className="h-5 w-5 rounded-full bg-outline-variant/50" />
          </div>
          <div className="h-8 w-20 rounded bg-outline-variant/50" />
          <div className="h-3 w-24 rounded bg-outline-variant/30 mt-sm" />
        </div>
      ))}
    </>
  );
}

export default function AttendanceStats() {
  const [state, setState]   = useState<LoadState>('loading');
  const [stats, setStats]   = useState<AttendanceStat[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const user = await getMe();
        if (cancelled) return;

        const data = await getAttendancePercentage(user.id);
        if (cancelled) return;

        setStats(buildStats(data));
        setState('success');
      } catch {
        if (!cancelled) setState('error');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  if (state === 'loading') {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
        <SkeletonCards />
      </section>
    );
  }

  if (state === 'error') {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
        {/* Show stat cards with an error note in the first card */}
        <div className="col-span-full text-center text-label-md text-error py-sm">
          Could not load attendance data. Please refresh the page.
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
