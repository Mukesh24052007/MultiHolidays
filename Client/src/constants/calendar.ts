import type { CalendarDay } from '@/types';

// ─── Semester range ────────────────────────────────────────────────────────────
// Attendance tracked : 15 Jul 2026 → 20 Nov 2026
//
// Holiday rules (no attendance — blocked):
//   • Every Sunday
//   • 1st Saturday of each month
//   • 3rd Saturday of each month
//   • Any date before 15 Jul 2026 or after 20 Nov 2026

export const SEMESTER_START = '2026-07-15';
export const SEMESTER_END   = '2026-11-20';

const START_DATE = new Date(2026, 6, 15);  // 15 Jul 2026
const END_DATE   = new Date(2026, 10, 20); // 20 Nov 2026

/** Returns today's date at midnight (local) — computed fresh each call so the
 *  calendar always reflects the real current date. */
function getToday(): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

/** Returns today as "YYYY-MM-DD" using local time. */
export function getTodayIso(): string {
  const t = getToday();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}

/**
 * Returns true for days with no attendance obligation:
 *   - Every Sunday (dow === 0)
 *   - 1st Saturday of the month  (ceil(day/7) === 1)
 *   - 3rd Saturday of the month  (ceil(day/7) === 3)
 */
export function isHolidayDow(dow: number, dayOfMonth: number): boolean {
  if (dow === 0) return true;
  if (dow === 6) {
    const occ = Math.ceil(dayOfMonth / 7);
    return occ === 1 || occ === 3;
  }
  return false;
}

/**
 * Build a CalendarDay[] for a given month.
 *
 * @param overrides  Map of "YYYY-MM-DD" → status to inject live API data.
 *                   Only affects non-holiday working days inside the semester.
 */
function buildMonth(
  year: number,
  month: number,
  daysInMonth: number,
  overrides: Map<string, CalendarDay['status']> = new Map(),
): CalendarDay[] {
  const firstDow = new Date(year, month - 1, 1).getDay();
  const today    = getToday(); // fresh each call — always the real current date
  const days: CalendarDay[] = [];

  for (let e = 0; e < firstDow; e++) {
    days.push({ day: null, status: 'empty' });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date    = new Date(year, month - 1, d);
    const dow     = date.getDay();
    const isoKey  = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    let status: CalendarDay['status'];

    if (isHolidayDow(dow, d) || date < START_DATE || date > END_DATE) {
      status = 'holiday';
    } else if (date.getTime() === today.getTime()) {
      // Today — show API status if already marked, otherwise "today"
      status = overrides.get(isoKey) ?? 'today';
    } else if (date > today) {
      status = 'upcoming';
    } else {
      // Past working day inside semester — use API data if available
      status = overrides.get(isoKey) ?? 'unmarked';
    }

    days.push({ day: d, status });
  }

  return days;
}

// ─── Static base months (no API data — used as fallback / SSR) ───────────────
export const JULY_2026:      CalendarDay[] = buildMonth(2026, 7,  31);
export const AUGUST_2026:    CalendarDay[] = buildMonth(2026, 8,  31);
export const SEPTEMBER_2026: CalendarDay[] = buildMonth(2026, 9,  30);
export const OCTOBER_2026:   CalendarDay[] = buildMonth(2026, 10, 31);
export const NOVEMBER_2026:  CalendarDay[] = buildMonth(2026, 11, 30);

// Backward-compat alias
export const OCTOBER_2024 = OCTOBER_2026;

// ─── Navigation list ──────────────────────────────────────────────────────────
export const SEMESTER_MONTHS: Array<{ label: string; year: number; month: number; days: CalendarDay[] }> = [
  { label: 'July 2026',      year: 2026, month: 7,  days: JULY_2026 },
  { label: 'August 2026',    year: 2026, month: 8,  days: AUGUST_2026 },
  { label: 'September 2026', year: 2026, month: 9,  days: SEPTEMBER_2026 },
  { label: 'October 2026',   year: 2026, month: 10, days: OCTOBER_2026 },
  { label: 'November 2026',  year: 2026, month: 11, days: NOVEMBER_2026 },
];

/**
 * Merge live API records into a fresh copy of the semester months.
 * Call this once after fetching GET /api/attendance/user/:userId.
 *
 * @param records  Array of { date: "YYYY-MM-DD", status: "present"|"absent" }
 * @returns        New SEMESTER_MONTHS array with statuses replaced by real data.
 */
export function buildMonthsFromRecords(
  records: Array<{ date: string; status: 'present' | 'absent' }>,
): typeof SEMESTER_MONTHS {
  // Build a fast lookup: "YYYY-MM-DD" → status
  const overrides = new Map<string, CalendarDay['status']>();
  for (const r of records) {
    overrides.set(r.date, r.status);
  }

  const daysPerMonth: Record<number, number> = {
    7: 31, 8: 31, 9: 30, 10: 31, 11: 30,
  };

  return SEMESTER_MONTHS.map(m => ({
    ...m,
    days: buildMonth(m.year, m.month, daysPerMonth[m.month], overrides),
  }));
}

// ─── UI constants ─────────────────────────────────────────────────────────────
export const CALENDAR_LEGEND = [
  { color: 'bg-tertiary-container border border-tertiary',                   label: 'Present'  },
  { color: 'bg-error-container border border-error',                         label: 'Absent'   },
  { color: 'bg-amber-100 border border-amber-400',                           label: 'Unmarked' },
  { color: 'border-2 border-dashed border-primary bg-primary-container/20',  label: 'Recommended Leave' },
  { color: 'bg-surface-container-low border border-outline-variant/30',      label: 'Upcoming' },
  { color: 'bg-[repeating-linear-gradient(45deg,#f3f4f6,#f3f4f6_3px,#e5e7eb_3px,#e5e7eb_6px)] border border-gray-300', label: 'Holiday' },
] as const;

export const WEEKDAY_HEADERS       = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const WEEKDAY_HEADERS_SHORT = ['S',   'M',   'T',   'W',   'T',   'F',   'S'  ] as const;
