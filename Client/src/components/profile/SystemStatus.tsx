import Icon from '@/components/ui/Icon';

type Props = {
  /** ISO date string from user.createdAt */
  memberSince?: string;
};

export default function SystemStatus({ memberSince }: Props) {
  const joined = memberSince
    ? new Date(memberSince).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between gap-md">
      <div>
        <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-md">
          System Status
        </h3>

        {/* Sync status */}
        <div className="p-md bg-secondary-container/20 rounded-lg border border-secondary-container/40 space-y-sm">
          <div className="flex items-center gap-sm text-on-secondary-container">
            <Icon name="verified" />
            <span className="font-bold text-body-md">Profile Verified</span>
          </div>
          <p className="text-label-md font-label-md text-on-secondary-fixed-variant">
            Attendance calculations are synced with your college portal.
          </p>
        </div>

        {/* Live indicator */}
        <div className="mt-md flex items-center gap-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse shrink-0" />
          <span className="text-body-md font-body-md text-on-surface">Attendance Sync</span>
          <span className="ml-auto text-label-sm font-label-sm text-[#10b981]">Active</span>
        </div>

        {/* Member since */}
        {joined && (
          <div className="mt-sm flex items-center gap-sm text-on-surface-variant">
            <Icon name="history" className="text-[18px]" />
            <span className="text-label-md font-label-md">Member since {joined}</span>
          </div>
        )}
      </div>

      <button className="w-full py-2.5 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-on-surface-variant font-bold text-label-md transition-colors flex items-center justify-center gap-xs">
        <Icon name="download" className="text-[18px]" />
        Download Attendance Report
      </button>
    </div>
  );
}
