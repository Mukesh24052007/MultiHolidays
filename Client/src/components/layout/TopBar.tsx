import Link from 'next/link';
import Icon from '@/components/ui/Icon';

type TopBarProps = {
  title: string;
  userName: string;
  /** Optional avatar URL. When omitted, initials are shown instead. */
  userAvatar?: string;
};

/** Derive up to 2 initials from a display name or "Hello, Name" string. */
function getInitials(name: string): string {
  // Strip leading "Hello, " if present
  const cleaned = name.replace(/^hello,\s*/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TopBar({ title, userName, userAvatar }: TopBarProps) {
  const initials = getInitials(userName);

  return (
    <header className="fixed top-0 right-0 left-[280px] h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-lg z-40">
      <h2 className="text-headline-md font-headline-md text-on-surface">{title}</h2>

      <div className="flex items-center gap-md">
        {/* Notification bell */}
        <button
          className="hover:bg-surface-container-low rounded-full p-2 transition-opacity active:opacity-80"
          aria-label="Notifications"
        >
          <Icon name="notifications" className="text-on-surface-variant" />
        </button>

        {/* Avatar chip — links to profile */}
        <Link
          href="/profile"
          className="flex items-center gap-sm bg-surface-container rounded-full pl-base pr-md py-base border border-outline-variant hover:bg-surface-container-high transition-colors"
          aria-label="Go to your profile"
        >
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold select-none"
            >
              {initials}
            </span>
          )}
          <span className="font-label-md text-label-md text-on-surface">{userName}</span>
        </Link>
      </div>
    </header>
  );
}
