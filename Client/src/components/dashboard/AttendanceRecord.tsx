import Icon from '@/components/ui/Icon';
import type { AttendanceRecord } from '@/types';

type Props = {
  records: AttendanceRecord[];
};

export default function AttendanceRecordList({ records }: Props) {
  return (
    <section className="space-y-sm mb-xl">
      <h2 className="font-headline-md text-headline-md px-base">Recent Attendance</h2>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">
        {records.map((record, i) => {
          const isPresent = record.status === 'present';
          return (
            <div
              key={i}
              className="p-sm flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-sm">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isPresent ? 'bg-tertiary-container/10' : 'bg-error-container/10'
                  }`}
                >
                  <Icon name={isPresent ? 'check' : 'close'} className={isPresent ? 'text-tertiary' : 'text-error'} />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">{record.subject}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{record.date}</p>
                </div>
              </div>
              <span
                className={`font-label-sm text-label-sm px-2 py-1 rounded ${
                  isPresent
                    ? 'text-tertiary bg-tertiary-fixed-dim/20'
                    : 'text-error bg-error-container/20'
                }`}
              >
                {isPresent ? 'Present' : 'Absent'}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
