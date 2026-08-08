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

const JALALI_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const GREGORIAN_WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const isJalali = (calendar) => {
  return calendar === CALENDARS.JALALI;
};

const bind = (timestamp, calendar) => {
  const base = dayjs(timestamp);

  if (isJalali(calendar)) {
    return base.calendar('jalali');
  }

  return base.calendar('gregory');
};

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

export const timestampToIso = (timestamp) => {
  if (timestamp === null || timestamp === undefined) {
    return '';
  }

  return dayjs(timestamp).calendar('gregory').format(ISO_FORMAT);
};

export const todayIso = () => {
  return timestampToIso(Date.now());
};

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

  return dayjs(a)
    .calendar('gregory')
    .isSame(dayjs(b).calendar('gregory'), 'day');
};

export const monthGrid = (timestamp, calendar) => {
  const first = bind(startOfMonth(timestamp, calendar), calendar);
  const daysInMonth = first.daysInMonth();

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
