import { api } from '../../auth/api/api.config';

export const createPayment = async (dto) => {
  const response = await api.post('/payment', dto);
  return response.data.data;
};

export const getPaymentCategories = async () => {
  const response = await api.get('/payment/categories');
  return response.data.data;
};
