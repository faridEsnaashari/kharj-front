const REQUIRED_FIELDS = [
  'bankId',
  'unitId',
  'ownerId',
  'category',
  'amount',
  'date',
];

export const isIncomeFormValid = (form) =>
  REQUIRED_FIELDS.every((field) => form[field] !== '' && form[field] != null);

export const getSelectedAccount = (accounts) => accounts?.[0] ?? null;

export const buildCreateIncomePayload = (form, accountId) => ({
  accountId: Number(accountId),
  amount: Number(form.amount),
  category: form.category,
  paidAt: `${form.date} ${form.time || '00:00'}:00`,
  description: form.description || undefined,
});
