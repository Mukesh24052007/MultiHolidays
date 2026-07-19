import Icon from '@/components/ui/Icon';
import { WEEKDAY_HEADERS, CALENDAR_LEGEND } from '@/constants/calendar';
import type { CalendarDay } from '@/types';

const DAY_STYLES: Record<CalendarDay['status'], string> = {
  present: 'border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer',
  absent: 'border border-outline-variant/30 rounded-lg bg-error-container/30 border-error/20 cursor-pointer',
  today: 'border border-outline-variant/30 rounded-lg bg-primary/10 border-primary cursor-pointer ring-2 ring-primary/50',
  leave: 'border-2 border-dashed border-primary bg-primary-container/20 rounded-lg cursor-pointer group hover:bg-primary-container/30',
  weekend: 'border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer',
  upcoming: 'border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer',
  empty: 'opacity-0 pointer-events-none',
};

const DAY_TEXT: Record<CalendarDay['status'], string> = {
  present: 'text-body-md font-bold',
  absent: 'text-body-md font-bold text-on-error-container',
  today: 'text-body-md font-bold text-primary',
  leave: 'text-body-md font-bold text-primary',
  weekend: 'text-body-md font-bold',
  upcoming: 'text-body-md font-bold',
  empty: '',
};

type Props = {
  month: string;
  days: CalendarDay[];
};

export default function CalendarGrid({ month, days }: Props) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <h3 className="text-headline-md font-headline-md text-on-surface">{month}</h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-surface-container-high rounded-lg text-outline">
            <Icon name="chevron_left" />
          </button>
          <button className="p-2 hover:bg-surface-container-high rounded-lg text-outline">
            <Icon name="chevron_right" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-md">
        {WEEKDAY_HEADERS.map((d) => (
          <div key={d} className="text-center text-label-sm font-label-sm text-outline uppercase tracking-wider py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-2" style={{ gridAutoRows: '1fr' }}>
        {days.map((day, i) => (
          <div
            key={i}
            className={`date-card relative flex flex-col items-center justify-center aspect-square ${DAY_STYLES[day.status]}`}
          >
            {day.day !== null && (
              <>
                <span className={DAY_TEXT[day.status]}>{String(day.day).padStart(2, '0')}</span>
                {day.status === 'today' && (
                  <span className="text-[10px] absolute top-1 right-1 font-bold text-primary">TODAY</span>
                )}
                {day.status === 'present' && (
                  <Icon name="check_circle" filled className="text-tertiary text-sm absolute bottom-2 text-[14px]" />
                )}
                {day.status === 'absent' && (
                  <Icon name="cancel" filled className="text-error text-sm absolute bottom-2 text-[14px]" />
                )}
                {day.status === 'leave' && (
                  <Icon
                    name="add_circle"
                    className="text-primary text-[14px] absolute bottom-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-md mt-md p-sm bg-surface rounded-lg">
        {CALENDAR_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className="text-label-sm font-label-sm text-outline">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
