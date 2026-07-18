import React, { useState } from 'react';
import {
  CALENDARS,
  WEEKDAY_LABELS,
  addMonths,
  formatMonthHeading,
  getMonthGrid,
  isSameDay,
  toISO,
} from '../lib/date';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

/*
 * Calendar
 *
 * Month grid supporting both the Gregorian and Jalali calendars. No Visly
 * screen contains a calendar, so this is built from the design *rules*: card
 * surface, pill selection in brand blue, dimmed weekday headers, and the same
 * ghost buttons used elsewhere for the month steppers.
 *
 * `value` in, `onChange` out — both Gregorian ISO (`YYYY-MM-DD`), regardless of
 * which calendar is being displayed.
 */
const Calendar = ({ value, onChange, calendar = CALENDARS.GREGORIAN, min, max }) => {
  // The month being viewed, which is independent of the selected day.
  const [cursor, setCursor] = useState(() => toISO(value) || toISO(new Date()));

  const rows = getMonthGrid(cursor, calendar);
  const weekdays = WEEKDAY_LABELS[calendar] || WEEKDAY_LABELS[CALENDARS.GREGORIAN];

  const isOutOfRange = (iso) => (min && iso < min) || (max && iso > max);

  return (
    <div className="visily-calendar" role="group" aria-label="Choose date">
      <div className="visily-calendar-header">
        <button
          type="button"
          className="visily-btn visily-btn--ghost visily-btn--icon visily-btn--sm"
          onClick={() => setCursor(addMonths(cursor, -1, calendar))}
          aria-label="Previous month"
        >
          <ChevronLeftIcon />
        </button>

        <span className="visily-calendar-heading" aria-live="polite">
          {formatMonthHeading(cursor, calendar)}
        </span>

        <button
          type="button"
          className="visily-btn visily-btn--ghost visily-btn--icon visily-btn--sm"
          onClick={() => setCursor(addMonths(cursor, 1, calendar))}
          aria-label="Next month"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="visily-calendar-weekdays" aria-hidden="true">
        {weekdays.map((day) => (
          <span key={day} className="visily-calendar-weekday">
            {day}
          </span>
        ))}
      </div>

      <div className="visily-calendar-grid">
        {rows.map((week, weekIndex) =>
          week.map((cell, dayIndex) => {
            if (!cell) {
              // Padding slot — rendered blank, never as a neighbouring month's day.
              return <span key={`${weekIndex}-${dayIndex}`} className="visily-calendar-blank" />;
            }

            const selected = isSameDay(cell.iso, value);
            const disabled = isOutOfRange(cell.iso);

            return (
              <button
                key={cell.iso}
                type="button"
                className={[
                  'visily-calendar-day',
                  selected && 'visily-calendar-day--selected',
                  cell.isToday && !selected && 'visily-calendar-day--today',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={disabled}
                aria-pressed={selected}
                aria-current={cell.isToday ? 'date' : undefined}
                onClick={() => onChange && onChange(cell.iso)}
              >
                {cell.label}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Calendar;
