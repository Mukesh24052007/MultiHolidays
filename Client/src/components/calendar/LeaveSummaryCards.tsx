import ProgressBar from '@/components/ui/ProgressBar';

interface Props {
  percentage: number;
  presentDays: number;
  totalWorkingDays: number;
  loading?: boolean;
}

export default function LeaveSummaryCards({ percentage, presentDays, totalWorkingDays, loading }: Props) {
  // "Remaining" = working days left in the semester from today onward.
  // We get total and present from the API; remaining is the unmarked/upcoming
  // days which we don't have directly — show days present vs total as a proxy.
  const pct = Math.min(100, Math.max(0, percentage));

  return (
    <section className="grid grid-cols-2 gap-sm">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
        <p className="text-label-sm font-label-sm text-on-secondary-container">Days Present</p>
        <div className="flex items-baseline gap-2 mt-2">
          {loading ? (
            <span className="h-7 w-10 rounded bg-outline-variant/40 animate-pulse inline-block" />
          ) : (
            <>
              <span className="text-headline-md font-headline-md text-on-surface">{presentDays}</span>
              <span className="text-label-sm font-label-sm text-outline">/ {totalWorkingDays} days</span>
            </>
          )}
        </div>
        <div className="mt-4">
          <ProgressBar
            value={totalWorkingDays > 0 ? (presentDays / totalWorkingDays) * 100 : 0}
            colorClass="bg-tertiary"
            height="h-1.5"
          />
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
        <p className="text-label-sm font-label-sm text-on-secondary-container">Attendance</p>
        <div className="flex items-baseline gap-2 mt-2">
          {loading ? (
            <span className="h-7 w-14 rounded bg-outline-variant/40 animate-pulse inline-block" />
          ) : (
            <span className="text-headline-md font-headline-md text-on-surface">{pct.toFixed(1)}%</span>
          )}
        </div>
        <div className="mt-4">
          <ProgressBar value={pct} colorClass={pct >= 75 ? 'bg-primary' : 'bg-error'} height="h-1.5" />
        </div>
      </div>
    </section>
  );
}
