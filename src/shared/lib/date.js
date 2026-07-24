/*
 * Date helpers for the Jalali-aware DateField / Calendar.
 *
 * THE CRITICAL RULE
 * -----------------
 * Every value that crosses the boundary of this module — in or out — is a
 * *Gregorian* ISO date string (`YYYY-MM-DD`). The Jalali calendar exists only
 * as a rendering mode.
 *
 * `jalali-plugin-dayjs` works by rebinding the calendar on a dayjs instance, so
 * calling `.format('YYYY-MM-DD')` on a Jalali-bound instance emits *Jalali*
 * numerals (e.g. `1403-03-04`). If such a string reaches component state or the
 * API it is silently misread as Gregorian and the date is wrong by ~621 years.
 *
 * To prevent that, every conversion here collapses through the epoch timestamp
 * (`.valueOf()`), which is calendar-independent. Any new helper added to this
 * file must do the same.
 */

import dayjs from 'dayjs';
import jalaliday from 'jalali-plugin-dayjs';

dayjs.extend(jalaliday);

export const CALENDARS = {
  GREGORIAN: 'gregory',
  JALALI: 'jalali',
};

export const ISO_FORMAT = 'YYYY-MM-DD';

const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

const GREGORIAN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/* Jalali weeks start on Saturday, Gregorian (as drawn in the mockups) on Sunday. */
const JALALI_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const GREGORIAN_WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const isJalali = (calendar) => {
  return calendar === CALENDARS.JALALI;
};

/*
 * Bind a timestamp to the requested calendar. Everything downstream reads
 * .year()/.month()/.date() off the result, which are calendar-relative — that
 * is exactly what the *display* layer wants, and never what state wants.
 */
const bind = (timestamp, calendar) => {
  const base = dayjs(timestamp);

  if (isJalali(calendar)) {
    return base.calendar('jalali');
  }

  return base.calendar('gregory');
};

/* ---- Boundary conversions ------------------------------------------------ */

/** Parse a Gregorian ISO string into a timestamp. Returns null when unparseable. */
export const isoToTimestamp = (iso) => {
  if (!iso) {
    return null;
  }

  const parsed = dayjs(iso, ISO_FORMAT, true);

  if (!parsed.isValid()) {
    return null;
  }

  return parsed.valueOf();
};

/**
 * Render a timestamp as a Gregorian ISO string.
 *
 * Note the explicit `.calendar('gregory')`: without it, a timestamp that
 * happened to arrive from a Jalali-bound instance would format in Jalali.
 */
export const timestampToIso = (timestamp) => {
  if (timestamp === null || timestamp === undefined) {
    return '';
  }

  return dayjs(timestamp).calendar('gregory').format(ISO_FORMAT);
};

/** Today, as a Gregorian ISO string. */
export const todayIso = () => {
  return timestampToIso(Date.now());
};

/* ---- Display ------------------------------------------------------------- */

/**
 * Format a Gregorian ISO string for display in the given calendar.
 * The output is for humans only — never feed it back into state.
 */
export const formatForDisplay = (iso, calendar = CALENDARS.GREGORIAN) => {
  const timestamp = isoToTimestamp(iso);

  if (timestamp === null) {
    return '';
  }

  const bound = bind(timestamp, calendar);
  const year = bound.year();
  const month = String(bound.month() + 1).padStart(2, '0');
  const day = String(bound.date()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const monthLabel = (timestamp, calendar) => {
  const bound = bind(timestamp, calendar);
  const months = isJalali(calendar) ? JALALI_MONTHS : GREGORIAN_MONTHS;

  return `${months[bound.month()]} ${bound.year()}`;
};

export const weekdayLabels = (calendar) => {
  if (isJalali(calendar)) {
    return JALALI_WEEKDAYS;
  }

  return GREGORIAN_WEEKDAYS;
};

/* ---- Calendar grid ------------------------------------------------------- */

export const startOfMonth = (timestamp, calendar) => {
  return bind(timestamp, calendar).startOf('month').valueOf();
};

export const addMonths = (timestamp, calendar, amount) => {
  return bind(timestamp, calendar).add(amount, 'month').valueOf();
};

export const isSameDay = (a, b) => {
  if (a === null || b === null || a === undefined || b === undefined) {
    return false;
  }

  return dayjs(a).calendar('gregory').isSame(dayjs(b).calendar('gregory'), 'day');
};

/**
 * The day cells for the month containing `timestamp`, padded with leading
 * blanks so the first day lands under the correct weekday column.
 *
 * Returns `{ blanks, days }` where each day is
 * `{ timestamp, label }` — `label` is the calendar-relative day number and
 * `timestamp` is what a click hands back (converted to ISO by the caller).
 */
export const monthGrid = (timestamp, calendar) => {
  const first = bind(startOfMonth(timestamp, calendar), calendar);
  const daysInMonth = first.daysInMonth();

  /*
   * dayjs .day() is always 0=Sunday regardless of the bound calendar, so shift
   * it by one for Jalali, whose week starts on Saturday.
   */
  const weekdayOfFirst = first.day();
  const blanks = isJalali(calendar) ? (weekdayOfFirst + 1) % 7 : weekdayOfFirst;

  const days = [];

  for (let dayNumber = 0; dayNumber < daysInMonth; dayNumber += 1) {
    days.push({
      timestamp: first.add(dayNumber, 'day').valueOf(),
      label: dayNumber + 1,
    });
  }

  return { blanks, days };
};
