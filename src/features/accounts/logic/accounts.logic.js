export const getAccountLabel = (account) => {
  const bankName = account.bank?.name;
  const unitName = account.unit?.name;

  return [bankName, unitName].filter(Boolean).join(' · ');
};

export const getAccountOwnerName = (account) => account.owner?.name || '';

const REQUIRED_FIELDS = ['bankId', 'unitId', 'ownerId', 'ballance', 'priority'];

export const isCreateAccountFormValid = (form) =>
  REQUIRED_FIELDS.every((field) => form[field] !== '' && form[field] != null);

export const buildCreateAccountPayload = (form) => ({
  bankId: Number(form.bankId),
  unitId: Number(form.unitId),
  ownedBy: Number(form.ownerId),
  ballance: Number(form.ballance),
  priority: Number(form.priority),
});
