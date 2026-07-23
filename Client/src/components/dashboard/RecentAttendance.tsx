'use client';

/**
 * RecentAttendance
 *
 * Fetches the user's last 5 attendance records from the API and renders them.
 * Replaces the static RECENT_ATTENDANCE placeholder.
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserAttendance } from '@/lib/attendance';
import type { RawAttendanceRecord } from '@/lib/attendance';
import Icon from '@/components/ui/Icon';

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  const today    = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(d, today))     return 'Today';
  if (sameDay(d, yesterday)) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function RecentAttendance() {
  const { user, loading: authLoading } = useAuth();
  const [records, setRecords] = useState<RawAttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    let cancelled = false;

    getUserAttendance(user.id)
      .then(res => {
        if (cancelled) return;
        // Sort descending and take last 5
        const sorted = [...res.records]
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 5);
        setRecords(sorted);
      })
      .catch(() => {/* silently fail — show empty state */})
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [user, authLoading]);

  if (loading) {
    return (
      <section className="space-y-sm mb-xl">
        <h2 className="font-headline-md text-headline-md px-base">Recent Attendance</h2>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-sm flex items-center gap-sm">
              <div className="w-10 h-10 rounded-full bg-outline-variant/30 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-32 rounded bg-outline-variant/30" />
                <div className="h-2.5 w-20 rounded bg-outline-variant/20" />
              </div>
              <div className="h-5 w-14 rounded-full bg-outline-variant/20" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (records.length === 0) {
    return (
      <section className="space-y-sm mb-xl">
        <h2 className="font-headline-md text-headline-md px-base">Recent Attendance</h2>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg text-center">
          <Icon name="event_note" className="text-outline text-[40px] mb-sm" />
          <p className="text-body-md text-on-surface-variant">No attendance records yet.</p>
          <p className="text-label-sm text-outline mt-xs">Mark today&apos;s attendance to get started.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-sm mb-xl">
      <h2 className="font-headline-md text-headline-md px-base">Recent Attendance</h2>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">
        {records.map((record) => {
          const isPresent = record.status === 'present';
          return (
            <div
              key={record._id}
              className="p-sm flex items-center justify-between hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center gap-sm">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isPresent ? 'bg-tertiary-container/10' : 'bg-error-container/10'
                }`}>
                  <Icon
                    name={isPresent ? 'check' : 'close'}
                    className={isPresent ? 'text-tertiary' : 'text-error'}
                  />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">
                    {formatDate(record.date)}
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {new Date(record.date + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <span className={`font-label-sm text-label-sm px-2 py-1 rounded-full ${
                isPresent
                  ? 'text-tertiary bg-tertiary-fixed-dim/20'
                  : 'text-error bg-error-container/20'
              }`}>
                {isPresent ? 'Present' : 'Absent'}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
