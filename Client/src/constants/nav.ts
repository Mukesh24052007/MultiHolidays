import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard', activeIcon: 'dashboard' },
  { label: 'Leave Calendar', href: '/leave-calendar', icon: 'calendar_month', activeIcon: 'calendar_month' },
  { label: 'Profile', href: '/profile', icon: 'person', activeIcon: 'person' },
];

export const NAV_FOOTER_ITEMS: NavItem[] = [
  { label: 'Settings', href: '#', icon: 'settings' },
  { label: 'Help', href: '#', icon: 'help' },
];
