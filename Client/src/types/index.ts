export type NavItem = {
  label: string;
  href: string;
  icon: string;
  activeIcon?: string;
};

export type AttendanceStat = {
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
  iconColor: string;
  note?: string;
  noteColor?: string;
  progress?: number;
};

export type AttendanceRecord = {
  subject: string;
  date: string;
  status: 'present' | 'absent';
};

export type AnnouncementCard =
  | { type: 'text'; icon: string; tag: string; body: string; linkLabel: string }
  | { type: 'image'; src: string; alt: string; category: string; title: string };

export type TrustBadge = {
  icon: string;
  label: string;
};

export type ProfileField = {
  icon: string;
  label: string;
  value: string;
  editable?: boolean;
};

export type CalendarDayStatus = 'present' | 'absent' | 'leave' | 'today' | 'weekend' | 'empty' | 'upcoming';

export type CalendarDay = {
  day: number | null;
  status: CalendarDayStatus;
};
