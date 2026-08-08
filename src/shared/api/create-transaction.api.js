import { api } from '../../features/auth/api/api.config';

export const createPayment = async (dto) => {
  const response = await api.post('/payment', dto);
  return response.data.data;
};

export const createIncome = async (dto) => {
  const response = await api.post('/income', dto);
  return response.data.data;
};
