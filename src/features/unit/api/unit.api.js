import { api } from '../../auth/api/api.config';

export const getUnits = async ({ userId } = {}) => {
  const response = await api.get('/unit', { params: { userId } });
  return response.data.data;
};
