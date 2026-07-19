import Icon from '@/components/ui/Icon';
import ProgressBar from '@/components/ui/ProgressBar';
import type { AttendanceStat } from '@/types';

export default function StatCard({ label, value, unit, icon, iconColor, note, noteColor, progress }: AttendanceStat) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-200 shadow-sm hover:shadow-md">
      <div className="flex justify-between items-start mb-sm">
        <span className="text-label-md font-label-md text-on-surface-variant">{label}</span>
        <Icon name={icon} className={iconColor} />
      </div>
      <div className="flex items-baseline gap-xs">
        <span className="text-headline-xl font-headline-xl text-on-surface">{value}</span>
        {unit && <span className="text-body-md font-body-md text-on-surface-variant">{unit}</span>}
      </div>
      {progress !== undefined && (
        <div className="mt-md">
          <ProgressBar value={progress} colorClass={progress >= 75 ? 'bg-tertiary' : 'bg-primary'} />
        </div>
      )}
      {note && (
        <div className={`mt-md text-label-sm font-label-sm flex items-center gap-1 ${noteColor ?? 'text-on-surface-variant opacity-70'}`}>
          {noteColor === 'text-error' && <Icon name="warning" className="text-[14px]" />}
          {note}
        </div>
      )}
    </div>
  );
}
