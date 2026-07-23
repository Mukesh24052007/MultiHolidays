import Icon from '@/components/ui/Icon';

interface Props {
  percentage: number;
  absentDays: number;
  loading?: boolean;
}

/**
 * Each absence costs −3%, each presence gains +0.5%.
 * Simulate taking N extra absent days and see where the percentage lands.
 */
function computeSafeLeaveDays(currentPct: number): { days: number; projectedPct: number } {
  let days = 0;
  let pct  = currentPct;
  // Keep subtracting absences while we stay safely above 75%
  while (pct - 3 >= 75) {
    pct  -= 3;
    days += 1;
    if (days >= 30) break; // safety cap
  }
  return { days, projectedPct: Math.max(0, pct) };
}

export default function LeavePredictionCard({ percentage, absentDays, loading }: Props) {
  const { days, projectedPct } = computeSafeLeaveDays(percentage);
  const isSafe  = days > 0;
  const isBelow = percentage < 75;

  return (
    <section className="bg-primary-container text-on-primary-container rounded-xl p-md overflow-hidden relative">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="auto_awesome" filled className="text-on-primary-container" />
          <h3 className="text-label-md font-label-md">Leave Prediction</h3>
        </div>

        {loading ? (
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full rounded bg-white/20 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-white/20 animate-pulse" />
          </div>
        ) : isBelow ? (
          <p className="text-body-md mb-4 opacity-90">
            Your attendance is at <span className="font-bold">{percentage.toFixed(1)}%</span> —
            below the 75% threshold. Focus on attending to recover your standing.
          </p>
        ) : isSafe ? (
          <p className="text-body-md mb-4 opacity-90">
            You can safely take <span className="font-bold">{days} more day{days > 1 ? 's' : ''} off</span> while
            staying above 75%. Projected: <span className="font-bold">{projectedPct.toFixed(1)}%</span>.
            You&apos;ve had {absentDays} absent day{absentDays !== 1 ? 's' : ''} so far.
          </p>
        ) : (
          <p className="text-body-md mb-4 opacity-90">
            Any additional absence will drop you below 75%.
            Current: <span className="font-bold">{percentage.toFixed(1)}%</span>.
          </p>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center">
          {loading ? (
            <span className="h-4 w-28 rounded bg-white/20 animate-pulse inline-block" />
          ) : (
            <span className="text-label-sm">
              {isBelow ? 'Attendance critical' : isSafe ? 'Safe to proceed' : 'No leave buffer'}
            </span>
          )}
          <Icon
            name={isBelow ? 'warning' : isSafe ? 'check_circle' : 'info'}
            className={isBelow ? 'text-error-fixed' : 'text-tertiary-fixed'}
          />
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
    </section>
  );
}
