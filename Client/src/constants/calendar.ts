import type { CalendarDay } from '@/types';

export const OCTOBER_2024: CalendarDay[] = [
  { day: null, status: 'empty' },
  { day: null, status: 'empty' },
  { day: 1, status: 'present' },
  { day: 2, status: 'present' },
  { day: 3, status: 'absent' },
  { day: 4, status: 'present' },
  { day: 5, status: 'present' },
  { day: 6, status: 'weekend' },
  { day: 7, status: 'weekend' },
  { day: 8, status: 'upcoming' },
  { day: 9, status: 'upcoming' },
  { day: 10, status: 'today' },
  { day: 11, status: 'upcoming' },
  { day: 12, status: 'upcoming' },
  { day: 13, status: 'leave' },
  { day: 14, status: 'leave' },
  { day: 15, status: 'upcoming' },
  { day: 16, status: 'upcoming' },
  { day: 17, status: 'upcoming' },
  { day: 18, status: 'upcoming' },
  { day: 19, status: 'upcoming' },
  { day: 20, status: 'upcoming' },
  { day: 21, status: 'upcoming' },
  { day: 22, status: 'upcoming' },
  { day: 23, status: 'upcoming' },
  { day: 24, status: 'upcoming' },
  { day: 25, status: 'upcoming' },
  { day: 26, status: 'upcoming' },
  { day: 27, status: 'upcoming' },
  { day: 28, status: 'upcoming' },
  { day: 29, status: 'upcoming' },
  { day: 30, status: 'upcoming' },
  { day: 31, status: 'upcoming' },
];

export const CALENDAR_LEGEND = [
  { color: 'bg-tertiary-container border border-tertiary', label: 'Present' },
  { color: 'bg-error-container border border-error', label: 'Absent' },
  { color: 'border-2 border-dashed border-primary bg-primary-container/20', label: 'Recommended Leave' },
  { color: 'bg-surface-container-low border border-outline-variant/30', label: 'Upcoming Class' },
] as const;

export const WEEKDAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const WEEKDAY_HEADERS_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;
