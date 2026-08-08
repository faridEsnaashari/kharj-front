import { api } from '../../features/auth/api/api.config';

export const getBanks = async ({ userId } = {}) => {
  const response = await api.get('/bank', { params: { userId } });
  return response.data.data;
};

export const getUnits = async ({ userId } = {}) => {
  const response = await api.get('/unit', { params: { userId } });
  return response.data.data;
};

export const getRelatedUsers = async () => {
  const response = await api.get('/user/related-user');
  return response.data.data;
};

export const getAccounts = async ({ bankId, unitId, ownedBy, userId }) => {
  const response = await api.get('/account', {
    params: { bankId, unitId, ownedBy, userId, size: 1 },
  });
  return response.data.data.rows;
};

export const getPaymentCategories = async () => {
  const response = await api.get('/payment/categories');
  return response.data.data;
};

export const getIncomeCategories = async () => {
  const response = await api.get('/income/categories');
  return response.data.data;
};
