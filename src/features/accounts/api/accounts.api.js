import { api } from '../../auth/api/api.config';

export const listAccounts = async ({
  page = 1,
  size = 20,
  bankId,
  unitId,
  ownedBy,
} = {}) => {
  const response = await api.get('/account', {
    params: { page, size, bankId, unitId, ownedBy },
  });
  return response.data.data;
};

export const getAccount = async (id) => {
  const response = await api.get(`/account/${id}`);
  return response.data.data;
};

export const createAccount = async (dto) => {
  const response = await api.post('/account', dto);
  return response.data.data;
};
