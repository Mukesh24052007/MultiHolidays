import Icon from '@/components/ui/Icon';
import { WEEKDAY_HEADERS, CALENDAR_LEGEND } from '@/constants/calendar';
import type { CalendarDay } from '@/types';

const DAY_STYLES: Record<CalendarDay['status'], string> = {
  present:        'border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer group hover:border-tertiary/60 hover:bg-tertiary-container/10 transition-colors',
  absent:         'border border-error/20 rounded-lg bg-error-container/30 cursor-pointer group hover:border-error/50 hover:bg-error-container/50 transition-colors',
  today:          'border border-outline-variant/30 rounded-lg bg-primary/10 border-primary cursor-pointer ring-2 ring-primary/50',
  leave:          'border-2 border-dashed border-primary bg-primary-container/20 rounded-lg cursor-pointer group hover:bg-primary-container/30',
  'leave-selected':'border-2 border-primary bg-primary/15 rounded-lg cursor-pointer ring-2 ring-primary/40 shadow-sm',
  weekend:        'border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer',
  upcoming:       'border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors',
  unmarked:       'border border-amber-400 rounded-lg bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors',
  holiday:        'rounded-lg border border-gray-200 cursor-not-allowed select-none overflow-hidden',
  empty:          'opacity-0 pointer-events-none',
};

const DAY_TEXT: Record<CalendarDay['status'], string> = {
  present:        'text-body-md font-bold',
  absent:         'text-body-md font-bold text-on-error-container',
  today:          'text-body-md font-bold text-primary',
  leave:          'text-body-md font-bold text-primary',
  'leave-selected':'text-body-md font-bold text-primary',
  weekend:        'text-body-md font-bold',
  upcoming:       'text-body-md font-bold',
  unmarked:       'text-body-md font-bold text-amber-700',
  holiday:        'text-body-md font-bold text-gray-300 relative z-10',
  empty:          '',
};

interface Props {
  month: string;
  days: CalendarDay[];
  onPrev?: () => void;
  onNext?: () => void;
  /** Called when user clicks a clickable day cell — passes "YYYY-MM-DD" */
  onDayClick?: (isoDate: string, status: CalendarDay['status']) => void;
  /** When true, upcoming days show a selection affordance */
  leaveSelectMode?: boolean;
  /** ISO dates currently selected for leave */
  selectedLeaveDates?: Set<string>;
}

export default function CalendarGrid({
  month, days, onPrev, onNext, onDayClick,
  leaveSelectMode = false, selectedLeaveDates,
}: Props) {
  // Extract year+month from the label for building ISO dates
  const [monthName, yearStr] = month.split(' ');
  const MONTH_MAP: Record<string, number> = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
  };
  const year  = parseInt(yearStr, 10);
  const mon   = MONTH_MAP[monthName] ?? 1;

  function getEffectiveStatus(day: CalendarDay, iso: string): CalendarDay['status'] {
    if (leaveSelectMode && day.status === 'upcoming' && selectedLeaveDates?.has(iso)) {
      return 'leave-selected';
    }
    return day.status;
  }

  function handleDayClick(day: CalendarDay) {
    if (!onDayClick || day.day === null) return;
    if (day.status === 'holiday' || day.status === 'empty') return;
    // In leave-select mode only allow clicking upcoming days
    if (leaveSelectMode && day.status !== 'upcoming' && day.status !== 'leave-selected') return;
    // In normal mode block upcoming
    if (!leaveSelectMode && day.status === 'upcoming') return;
    const iso = `${year}-${String(mon).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;
    onDayClick(iso, day.status);
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <h3 className="text-headline-md font-headline-md text-on-surface">{month}</h3>
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Previous month"
            className="p-2 hover:bg-surface-container-high rounded-lg text-outline disabled:opacity-30 transition-opacity"
          >
            <Icon name="chevron_left" />
          </button>
          <button
            onClick={onNext}
            disabled={!onNext}
            aria-label="Next month"
            className="p-2 hover:bg-surface-container-high rounded-lg text-outline disabled:opacity-30 transition-opacity"
          >
            <Icon name="chevron_right" />
          </button>
        </div>
      </div>

      {/* Leave-select mode banner */}
      {leaveSelectMode && (
        <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary font-medium">
          <Icon name="touch_app" className="text-[18px] shrink-0" />
          Tap upcoming days to mark them as leave
        </div>
      )}

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
        {days.map((day, i) => {
          const iso = day.day !== null
            ? `${year}-${String(mon).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`
            : '';
          const effectiveStatus = iso ? getEffectiveStatus(day, iso) : day.status;

          return (
            <div
              key={i}
              onClick={() => handleDayClick(day)}
              className={`date-card relative flex flex-col items-center justify-center aspect-square ${DAY_STYLES[effectiveStatus]}`}
            >
              {/* Holiday stripe overlay */}
              {effectiveStatus === 'holiday' && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background:
                      'repeating-linear-gradient(45deg, #f9fafb, #f9fafb 4px, #e5e7eb 4px, #e5e7eb 8px)',
                  }}
                />
              )}

              {day.day !== null && (
                <>
                  <span className={DAY_TEXT[effectiveStatus]}>{String(day.day).padStart(2, '0')}</span>
                  {effectiveStatus === 'today' && (
                    <span className="text-[10px] absolute top-1 right-1 font-bold text-primary">TODAY</span>
                  )}
                  {effectiveStatus === 'present' && (
                    <>
                      <Icon name="check_circle" filled className="text-tertiary text-sm absolute bottom-2 text-[14px] group-hover:opacity-0 transition-opacity" />
                      <Icon name="edit" className="text-tertiary text-[14px] absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                  {effectiveStatus === 'absent' && (
                    <>
                      <Icon name="cancel" filled className="text-error text-sm absolute bottom-2 text-[14px] group-hover:opacity-0 transition-opacity" />
                      <Icon name="edit" className="text-error text-[14px] absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                  {effectiveStatus === 'unmarked' && (
                    <Icon name="edit_calendar" className="text-amber-500 text-[14px] absolute bottom-1" />
                  )}
                  {effectiveStatus === 'leave-selected' && (
                    <Icon name="event_busy" filled className="text-primary text-[14px] absolute bottom-1" />
                  )}
                  {effectiveStatus === 'leave' && (
                    <Icon
                      name="add_circle"
                      className="text-primary text-[14px] absolute bottom-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                  {effectiveStatus === 'holiday' && (
                    <Icon name="block" className="text-gray-300 text-[14px] absolute bottom-1 z-10" />
                  )}
                  {leaveSelectMode && effectiveStatus === 'upcoming' && (
                    <Icon name="add" className="text-primary/40 text-[14px] absolute bottom-1" />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-md mt-md p-sm bg-surface rounded-lg">
        {CALENDAR_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className="text-label-sm font-label-sm text-outline">{item.label}</span>
          </div>
        ))}
        {leaveSelectMode && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-primary bg-primary/15" />
            <span className="text-label-sm font-label-sm text-primary font-semibold">Selected Leave</span>
          </div>
        )}
      </div>
    </div>
  );
}
