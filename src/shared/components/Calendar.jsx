import { useState } from 'react';
import {
  CALENDARS,
  addMonths,
  isSameDay,
  isoToTimestamp,
  monthGrid,
  monthLabel,
  timestampToIso,
  weekdayLabels,
} from '../lib/date.js';
import { cx } from '../utils/index.js';
import { IconButton } from './Button.jsx';
import { IconChevronLeft, IconChevronRight } from './icons.jsx';

/*
 * A month grid.
 *
 * `value` in and `onChange` out are both Gregorian ISO (`YYYY-MM-DD`) — the
 * `calendar` prop only changes what the user sees. See src/shared/lib/date.js
 * for why that separation is load-bearing.
 */
export const Calendar = ({
  value,
  onChange,
  calendar = CALENDARS.GREGORIAN,
  className,
}) => {
  const selectedTimestamp = isoToTimestamp(value);

  /*
   * Both of these read the clock, so they use lazy initialisers — calling
   * Date.now() during render would make the grid re-derive on every re-render.
   * `today` only drives the is-today outline, so pinning it at mount is fine.
   */
  const [cursor, setCursor] = useState(() => selectedTimestamp ?? Date.now());
  const [today] = useState(() => Date.now());

  const { blanks, days } = monthGrid(cursor, calendar);

  const goToMonth = (amount) => {
    setCursor((current) => addMonths(current, calendar, amount));
  };

  return (
    <div
      className={cx('ui-calendar', className)}
      dir={calendar === CALENDARS.JALALI ? 'rtl' : 'ltr'}
    >
      <div className="ui-calendar__header">
        <IconButton label="Previous month" onClick={() => goToMonth(-1)}>
          <IconChevronLeft size={18} />
        </IconButton>

        <span className="ui-calendar__month">{monthLabel(cursor, calendar)}</span>

        <IconButton label="Next month" onClick={() => goToMonth(1)}>
          <IconChevronRight size={18} />
        </IconButton>
      </div>

      <div className="ui-calendar__grid" role="grid">
        {weekdayLabels(calendar).map((weekday) => (
          <span key={weekday} className="ui-calendar__weekday">
            {weekday}
          </span>
        ))}

        {Array.from({ length: blanks }, (unused, index) => (
          <span key={`blank-${index}`} className="ui-calendar__blank" />
        ))}

        {days.map((day) => {
          const selected = isSameDay(day.timestamp, selectedTimestamp);

          return (
            <button
              key={day.timestamp}
              type="button"
              className={cx(
                'ui-calendar__day',
                selected && 'is-selected',
                isSameDay(day.timestamp, today) && 'is-today',
              )}
              aria-pressed={selected}
              onClick={() => onChange(timestampToIso(day.timestamp))}
            >
              {day.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
