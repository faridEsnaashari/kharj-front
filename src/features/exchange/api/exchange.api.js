import { api } from '../../auth/api/api.config';

export const createExchange = async (dto) => {
  const response = await api.post('/exchange', dto);
  return response.data.data;
};
