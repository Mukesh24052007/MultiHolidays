import Icon from '@/components/ui/Icon';

const BADGES = [
  { icon: 'verified', label: 'Academic Integrity' },
  { icon: 'schedule', label: 'Real-time Sync' },
  { icon: 'encrypted', label: 'Privacy First' },
] as const;

export default function TrustBadges() {
  return (
    <div className="mt-xl grid grid-cols-3 gap-md opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
      {BADGES.map((badge) => (
        <div key={badge.label} className="flex flex-col items-center text-center space-y-xs">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
            <Icon name={badge.icon} className="text-on-surface-variant" />
          </div>
          <span className="font-label-sm text-label-sm">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
