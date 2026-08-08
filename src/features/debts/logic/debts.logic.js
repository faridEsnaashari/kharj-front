import { formatForDisplay, CALENDARS } from '../../../shared/lib/date.js';

export const DEBT_TABS = { SUMMARY: 'summary', HISTORY: 'history' };

export const DEBT_TAB_OPTIONS = [
  { value: DEBT_TABS.SUMMARY, label: 'Summaries' },
  { value: DEBT_TABS.HISTORY, label: 'Detailed History' },
];

export const DEBT_GROUP_BY = { BANK: 'bank', UNIT: 'unit' };

export const DEBT_GROUP_BY_OPTIONS = [
  { value: DEBT_GROUP_BY.BANK, label: 'By Bank & Unit' },
  { value: DEBT_GROUP_BY.UNIT, label: 'By Unit' },
];

export const DEBT_DIRECTIONS = {
  ALL: '',
  I_OWE: 'i-owe',
  OWED_TO_ME: 'owed-to-me',
};

export const DEBT_DIRECTION_OPTIONS = [
  { value: DEBT_DIRECTIONS.ALL, label: 'All' },
  { value: DEBT_DIRECTIONS.I_OWE, label: 'I Owe' },
  { value: DEBT_DIRECTIONS.OWED_TO_ME, label: 'Owed To Me' },
];

export const isOwedToCurrentUser = (row, currentUserId) =>
  row.toUserId === currentUserId;

export const getDebtCounterparty = (row, currentUserId) =>
  isOwedToCurrentUser(row, currentUserId) ? row.fromUser : row.toUser;

export const getSignedDebtAmount = (row, currentUserId) =>
  isOwedToCurrentUser(row, currentUserId) ? row.amount : -row.amount;

export const getDebtDirectionLabel = (row, currentUserId) =>
  isOwedToCurrentUser(row, currentUserId) ? 'Owed to you' : 'You owe';

export const getSummaryRowUnitLabel = (row) =>
  [row.bank?.name, row.unit?.name].filter(Boolean).join(' · ');

export const getHistoryRowUnitLabel = (row) => {
  const account = row.payment?.account;
  return [account?.bank?.name, account?.unit?.name].filter(Boolean).join(' · ');
};

export const getHistoryRowDateLabel = (row) => {
  const [datePart] = (row.createdAt || '').split(/[T ]/);
  return formatForDisplay(datePart, CALENDARS.JALALI);
};

export const buildHistoryQueryParams = (filters, currentUserId) => {
  const params = {
    bankId: filters.bankId || undefined,
    unitId: filters.unitId || undefined,
  };

  if (filters.direction === DEBT_DIRECTIONS.I_OWE) {
    params.fromUserId = currentUserId;
    if (filters.counterpartyId) {
      params.toUserId = filters.counterpartyId;
    }
  } else if (filters.direction === DEBT_DIRECTIONS.OWED_TO_ME) {
    params.toUserId = currentUserId;
    if (filters.counterpartyId) {
      params.fromUserId = filters.counterpartyId;
    }
  }

  return params;
};
