import { api } from '../../auth/api/api.config';

export const getRelatedUsers = async () => {
  const response = await api.get('/user/related-user');
  return response.data.data;
};
