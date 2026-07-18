import dayjs from 'dayjs';
import jalaliday from 'jalali-plugin-dayjs';

dayjs.extend(jalaliday);

/*
 * Date helpers
 * ---------------------------------------------------------------------------
 * Canonical rule: the value crossing a component boundary is ALWAYS a
 * Gregorian ISO string (`YYYY-MM-DD`), because that is what the backend stores
 * and what the API expects. The Jalali calendar is a *display* concern only.
 *
 * Never let a Jalali-formatted string escape into state or onto the wire.
 */

export const ISO_DATE = 'YYYY-MM-DD';

export const CALENDARS = {
  GREGORIAN: 'gregory',
  JALALI: 'jalali',
};

/* Jalali weeks start on Saturday, Gregorian on Sunday. dayjs `.day()` always
 * reports the underlying weekday with 0 = Sunday, so the Jalali grid needs a
 * one-day rotation to put Saturday in the first column. */
const WEEK_START = {
  [CALENDARS.GREGORIAN]: 0, // Sunday
  [CALENDARS.JALALI]: 6, // Saturday
};

export const WEEKDAY_LABELS = {
  [CALENDARS.GREGORIAN]: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  [CALENDARS.JALALI]: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
};

/** Wrap a value in a dayjs instance bound to the given calendar. */
export const toCalendar = (value, calendar = CALENDARS.GREGORIAN) => {
  const base = value ? dayjs(value) : dayjs();
  return base.calendar(calendar);
};

/*
 * Collapse a calendar-bound instance back to a Gregorian ISO string.
 *
 * This is NOT optional ceremony: calling `.format()` on a Jalali-bound instance
 * emits Jalali digits (1403-03-01), which would silently travel to the backend
 * as if it were Gregorian. Going through the epoch timestamp is what guarantees
 * we hand back a real Gregorian date.
 */
const toGregorianISO = (instance) => dayjs(instance.valueOf()).format(ISO_DATE);

/** True when `value` parses to a real date. */
export const isValidDate = (value) => Boolean(value) && dayjs(value).isValid();

/** Gregorian ISO string — the only form that may be stored or sent. */
export const toISO = (value) => (isValidDate(value) ? dayjs(value).format(ISO_DATE) : '');

/** Human-facing string in the requested calendar. */
export const formatDate = (value, calendar = CALENDARS.GREGORIAN, format = ISO_DATE) => {
  if (!isValidDate(value)) {
    return '';
  }
  return toCalendar(value, calendar).format(format);
};

/** Month + year heading for a calendar popover, e.g. "May 2024" / "خرداد 1403". */
export const formatMonthHeading = (value, calendar = CALENDARS.GREGORIAN) =>
  formatDate(value, calendar, 'MMMM YYYY');

/* Steps a whole month within `calendar` (so Jalali months advance by Jalali
 * month lengths), then returns the result as a Gregorian ISO string. */
export const addMonths = (value, amount, calendar = CALENDARS.GREGORIAN) =>
  toGregorianISO(toCalendar(value, calendar).add(amount, 'month'));

export const isSameDay = (a, b) => {
  if (!isValidDate(a) || !isValidDate(b)) {
    return false;
  }
  return dayjs(a).format(ISO_DATE) === dayjs(b).format(ISO_DATE);
};

export const isToday = (value) => isSameDay(value, dayjs());

/**
 * Build the day grid for the month containing `value`.
 *
 * Returns a flat array of 7-column rows. Leading/trailing padding cells are
 * `null` so the caller can render an empty slot rather than a neighbouring
 * month's day — the Visly grids show blanks, not greyed-out spill-over.
 *
 * Each cell: { iso, label, isToday, isCurrentMonth }
 */
export const getMonthGrid = (value, calendar = CALENDARS.GREGORIAN) => {
  const cursor = toCalendar(value, calendar);
  const monthStart = cursor.startOf('month');
  const daysInMonth = cursor.daysInMonth();

  // Rotate the raw weekday index so the calendar's first column lands correctly.
  const weekStart = WEEK_START[calendar] ?? 0;
  const leadingBlanks = (monthStart.day() - weekStart + 7) % 7;

  const cells = [];

  for (let i = 0; i < leadingBlanks; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = monthStart.add(day - 1, 'day');
    cells.push({
      // `iso` is Gregorian (what we store); `label` is calendar-local (what we show).
      iso: toGregorianISO(date),
      label: date.format('D'),
      isToday: isToday(date),
      isCurrentMonth: true,
    });
  }

  // Pad the final row so every week renders as a full 7 columns.
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
};

export { dayjs };
