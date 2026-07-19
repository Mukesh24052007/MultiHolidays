import Icon from '@/components/ui/Icon';

export default function SystemStatus() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
      <div>
        <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-md">
          System Status
        </h3>
        <div className="p-md bg-secondary-container/20 rounded-lg border border-secondary-container/40">
          <div className="flex items-center gap-sm text-on-secondary-container mb-xs">
            <Icon name="verified" />
            <span className="font-bold">Profile Verified</span>
          </div>
          <p className="text-label-md font-label-md text-on-secondary-fixed-variant">
            All attendance calculations are synchronized with your college portal.
          </p>
        </div>
      </div>
      <div className="mt-md">
        <button className="w-full py-2.5 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-on-surface-variant font-bold text-label-md transition-colors flex items-center justify-center gap-xs">
          <Icon name="download" className="text-[18px]" />
          Download Attendance Report
        </button>
      </div>
    </div>
  );
}
