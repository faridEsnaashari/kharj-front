import { api } from '../../auth/api/api.config';

export const createIncome = async (dto) => {
  const response = await api.post('/income', dto);
  return response.data.data;
};

export const getIncomeCategories = async () => {
  const response = await api.get('/income/categories');
  return response.data.data;
};
