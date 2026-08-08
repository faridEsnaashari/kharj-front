import { api } from '../../auth/api/api.config';

export const getRecentActivity = async ({
  type,
  bankId,
  unitId,
  ownedBy,
  page = 1,
  size = 10,
} = {}) => {
  const response = await api.get('/transaction/recent-activity', {
    params: {
      page,
      size,
      ...(type && type !== 'ALL' ? { type } : {}),
      ...(bankId ? { bankId } : {}),
      ...(unitId ? { unitId } : {}),
      ...(ownedBy ? { ownedBy } : {}),
    },
  });
  return response.data.data;
};
