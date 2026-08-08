import { formatForDisplay, CALENDARS } from '../../../shared/lib/date.js';

export const ACTIVITY_FILTERS = {
  ALL: 'ALL',
  INCOME: 'INCOME',
  PAYMENT: 'PAYMENT',
};

export const isIncomeTransaction = (transaction) =>
  transaction.type === 'INCOME';

export const getSignedTransactionAmount = (transaction) =>
  isIncomeTransaction(transaction) ? transaction.amount : -transaction.amount;

export const getTransactionTitle = (transaction) =>
  transaction.description || transaction.category || 'Transaction';

export const getTransactionSourceLabel = (transaction) => {
  const bankName = transaction.account?.bank?.name;
  const unitName = transaction.account?.unit?.name;

  return [bankName, unitName].filter(Boolean).join(' · ');
};

export const getTransactionSubtitle = (transaction) => {
  const [datePart, timePart] = (transaction.paidAt || '').split(/[T ]/);
  const formattedDate = formatForDisplay(datePart, CALENDARS.JALALI);

  return [formattedDate, timePart?.slice(0, 5)].filter(Boolean).join(' · ');
};
