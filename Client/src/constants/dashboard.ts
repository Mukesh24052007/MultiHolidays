import type { AttendanceStat, AttendanceRecord, AnnouncementCard } from '@/types';

export const ATTENDANCE_STATS: AttendanceStat[] = [
  {
    label: 'Current Percentage',
    value: '75%',
    icon: 'analytics',
    iconColor: 'text-tertiary',
    note: '+2% from last week',
    noteColor: 'text-tertiary',
    progress: 75,
  },
  {
    label: 'Days Present',
    value: 25,
    unit: 'days',
    icon: 'event_available',
    iconColor: 'text-primary',
    note: 'Target: 32 days',
  },
  {
    label: 'Days Absent',
    value: 4,
    unit: 'days',
    icon: 'event_busy',
    iconColor: 'text-error',
    note: 'Max allowed: 7',
    noteColor: 'text-error',
  },
  {
    label: 'Current Day',
    value: 30,
    unit: 'of Semester',
    icon: 'today',
    iconColor: 'text-on-surface-variant',
    progress: 33.3,
  },
];

export const RECENT_ATTENDANCE: AttendanceRecord[] = [
  { subject: 'Mathematics II', date: 'Yesterday, 09:00 AM', status: 'present' },
  { subject: 'Data Structures', date: 'Oct 22, 11:30 AM', status: 'absent' },
];

export const ANNOUNCEMENTS: AnnouncementCard[] = [
  {
    type: 'text',
    icon: 'info',
    tag: 'Important Note',
    body: 'Mid-term attendance reviews are scheduled for next week. Please ensure all medical leaves are documented.',
    linkLabel: 'Read Policy',
  },
  {
    type: 'image',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALzT6df12VIgU9i4zo_gVk_ZxRQxDHixFbmDUgsMknDCY-boqk6-HbzjdksvCNagrMjadrURfhXId2hXCpDOjpeSS0qQkOlSFjmERZLWOiQ8c9hHw1G4qmyV6cCqgGFkz_vzH8ENBnJj5vFV66hK1wfKuDuBtVkgyX8rzeMfG0LXRLl0D1eKsx0_6o1QZ5r-VtkeXg0jUCSn7J00btXNXR6_ELIw3C4z5kFKrQ6AhBkWVXdUAK9E_uIQ',
    alt: 'University library building',
    category: 'Campus Life',
    title: 'Central Library Annex',
  },
  {
    type: 'image',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1uoDWzhRb4vHDUfYIdR_d_wzZG6xynK8FMoc0QnQgIGaG4xmrRY5sqjlkBs3MXSZ-L-3s709iJ4_mShjYTRbpK_YTaYP0zHIb-O337k_EAm7Bk6_enjYnwRfsVGs0DtdFSuDTodDZvOM5c9Ni-WzOz7TJu0kC-dDk9Jv9dy4OOggJBSKXjIBobBdURxHMAsS8opNHFSKmBTQfUHxccQRBVYJt_dSUImXJwhZRMPgsiSmKy6aQ7ci1NA',
    alt: 'University campus park',
    category: 'Campus Life',
    title: 'Student Commons',
  },
];

export const DASHBOARD_IMAGES = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChngRqIv1cM9JW3fO2dFXyGSa5Wfb1lnLN_PsDs4TfnGAG5NClhzRoP0ZA0kWXYZwSJCDM414wvK5_HfkrbzgohY_Ox413Kc38Z-nDNXlga8z4rfzvHtcpJPcnZ6YLkXt8TcRFcCjSmai37oWKemCSGxc8KiDdqXULkjQV32oyikHOQ60frWcJ8jG7C89zkoxluJQZF4ChKaziUqzLmyiIhV2NPs2Yg0jSWxyxe375YnXhvu0b5IKSuw',
    alt: 'Futuristic classroom environment',
    title: 'College Campus View',
    subtitle: 'Main Auditorium Schedule',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI6lsH0_TWMgY4BDofedZ5srEUt3taYRt6I7xdVsnsXFF05RAm5FjC52lo0iYtbzihIV1aPPH7SJcg6S76zD_F0Yazafp41lZL8GepShdsGL9bWmS15mPfryWNyDjNq5tq1YMUJENIYkmW5j7VD15mfVzIPPjIXjGB0OhPMaxuzRmbyl7jNKiebtZyghc8o24-YbO_T5e3R3W2w-VMh7yy6t8NF9UZus8kY8aPE9W4kVEHFAfERygdMQ',
    alt: 'Student typing on laptop',
    title: 'Study Planner',
    subtitle: 'Manage your daily tasks effectively',
  },
];
