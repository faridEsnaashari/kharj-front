const REQUIRED_FIELDS = [
  'bankId',
  'unitId',
  'ownerId',
  'category',
  'price',
  'date',
];

export const isPaymentFormValid = (form) =>
  REQUIRED_FIELDS.every((field) => form[field] !== '' && form[field] != null);

export const buildCreatePaymentPayload = (form) => ({
  bankId: Number(form.bankId),
  unitId: Number(form.unitId),
  ownerId: Number(form.ownerId),
  category: form.category,
  price: Number(form.price),
  paidAt: `${form.date} ${form.time || '00:00'}:00`,
  description: form.description || undefined,
  isFun: false,
  isMaman: false,
});

export const getSelectedAccountBalance = (accounts) => accounts?.[0]?.ballance;
