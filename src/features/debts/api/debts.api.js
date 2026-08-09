import { api } from '../../auth/api/api.config';

export const getDebts = async ({
  page = 1,
  size = 20,
  bankId,
  unitId,
  fromUserId,
  toUserId,
} = {}) => {
  const response = await api.get('/debt', {
    params: { page, size, bankId, unitId, fromUserId, toUserId },
  });
  return response.data.data;
};

export const getDebtSummary = async ({
  groupBy = 'bank',
  bankId,
  unitId,
} = {}) => {
  const response = await api.get('/debt/summary', {
    params: { groupBy, bankId, unitId },
  });
  return response.data.data;
};
