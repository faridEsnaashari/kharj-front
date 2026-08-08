import { api } from '../../auth/api/api.config';

export const getAccountGroupByUnit = async () => {
  const response = await api.get('/account/static/group-by-unit');
  return response.data.data;
};

export const getAccountWeeklyPaymentIncome = async () => {
  const response = await api.get('/account/static/weekly-payment-income');
  return response.data.data;
};
