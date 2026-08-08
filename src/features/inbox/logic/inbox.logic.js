export const isPendingIncome = (row) => row.type === 'INCOME';

export const getSignedPendingAmount = (row) =>
  isPendingIncome(row) ? row.amount : -row.amount;

export const getPendingAccountLabel = (row) => {
  const bankName = row.account?.bank?.name;
  const unitName = row.account?.unit?.name;

  return [bankName, unitName].filter(Boolean).join(' · ');
};

export const getPendingOwnerName = (row) => row.account?.owner?.name || '';

export const getPendingSubtitle = (row) => {
  const [datePart, timePart] = (row.paidAt || '').split(/[T ]/);

  return [datePart, timePart?.slice(0, 5)].filter(Boolean).join(' · ');
};

export const buildConvertInitialForm = (row) => {
  const [datePart, timePart] = (row.paidAt || '').split(/[T ]/);

  return {
    ownerId: row.account?.ownedBy ? String(row.account.ownedBy) : '',
    category: '',
    date: datePart || '',
    time: timePart ? timePart.slice(0, 5) : '',
    description: '',
  };
};

export const isConvertFormValid = (form) =>
  form.ownerId !== '' && form.category !== '' && form.date !== '';

export const isConvertOwnerChanged = (row, form) =>
  Number(form.ownerId) !== row.account?.ownedBy;

export const buildConvertPayload = (row, form, resolvedAccountId) => {
  const paidAt = `${form.date} ${form.time || '00:00'}:00`;

  if (isPendingIncome(row)) {
    return {
      accountId: resolvedAccountId,
      amount: row.amount,
      category: form.category,
      paidAt,
      description: form.description || undefined,
      uncompletePaymentId: row.id,
    };
  }

  return {
    bankId: row.account.bankId,
    unitId: row.account.unitId,
    ownerId: Number(form.ownerId),
    category: form.category,
    price: row.amount,
    paidAt,
    description: form.description || undefined,
    isFun: false,
    isMaman: false,
    uncompletePaymentId: row.id,
  };
};
