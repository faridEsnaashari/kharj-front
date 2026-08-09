const REQUIRED_FIELDS = [
  'fromBankId',
  'fromUnitId',
  'fromOwnerId',
  'toUserId',
  'toBankId',
  'toUnitId',
  'toOwnerId',
  'fromAmount',
  'toAmount',
  'date',
];

export const isExchangeFormValid = (form) =>
  REQUIRED_FIELDS.every((field) => form[field] !== '' && form[field] != null);

export const getSelectedAccount = (accounts) => accounts?.[0] ?? null;

export const buildCreateExchangePayload = (
  form,
  fromAccountId,
  toAccountId,
) => ({
  fromAccountId: Number(fromAccountId),
  toAccountId: Number(toAccountId),
  fromAmount: Number(form.fromAmount),
  toAmount: Number(form.toAmount),
  toUser: Number(form.toUserId),
  paidAt: `${form.date} ${form.time || '00:00'}:00`,
});
