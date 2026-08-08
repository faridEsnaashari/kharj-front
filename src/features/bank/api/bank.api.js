import { api } from '../../auth/api/api.config';

export const getBanks = async ({ userId } = {}) => {
  const response = await api.get('/bank', { params: { userId } });
  return response.data.data;
};
