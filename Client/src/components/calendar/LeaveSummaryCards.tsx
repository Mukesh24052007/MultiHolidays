import ProgressBar from '@/components/ui/ProgressBar';

export default function LeaveSummaryCards() {
  return (
    <section className="grid grid-cols-2 gap-sm">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
        <p className="text-label-sm font-label-sm text-on-secondary-container">Remaining</p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-headline-md font-headline-md text-on-surface">12</span>
          <span className="text-label-sm font-label-sm text-outline">days</span>
        </div>
        <div className="mt-4">
          <ProgressBar value={60} colorClass="bg-tertiary" height="h-1.5" />
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
        <p className="text-label-sm font-label-sm text-on-secondary-container">Attendance</p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-headline-md font-headline-md text-on-surface">92%</span>
        </div>
        <div className="mt-4">
          <ProgressBar value={92} colorClass="bg-primary" height="h-1.5" />
        </div>
      </div>
    </section>
  );
}
