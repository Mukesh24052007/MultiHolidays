import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import LogoutButton from '@/components/layout/LogoutButton';

type MobileHeaderProps = {
  /** Optional avatar URL. Falls back to initials when omitted. */
  userAvatar?: string;
  userName?: string;
};

/** Derive up to 2 initials from a name string. */
function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function MobileHeader({ userAvatar, userName }: MobileHeaderProps) {
  const initials = getInitials(userName);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center px-sm border-b border-outline-variant/50">
      <span className="text-headline-md font-headline-md font-bold text-primary">MultiHolidays</span>

      <div className="flex items-center gap-xs">
        {/* Logout icon button */}
        <LogoutButton variant="icon" />

        {/* Avatar — links to profile */}
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors shrink-0"
          aria-label="Go to your profile"
        >
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName ?? 'User avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="w-full h-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold select-none"
            >
              {initials}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
