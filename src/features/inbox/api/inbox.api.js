import { api } from '../../auth/api/api.config';

export const uploadBankFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/file/upload/bank-payment', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const importBankExport = async ({ bankId, uploadedFile }) => {
  const response = await api.post('/uncomplete-payments/upload/bank-export', {
    bankId: Number(bankId),
    uploadedFile,
  });
  return response.data.data;
};

export const importText = async ({ bankId, text }) => {
  const response = await api.post('/uncomplete-payments/text', {
    bankId: Number(bankId),
    text,
  });
  return response.data.data;
};

export const getPendingImports = async ({
  bankId,
  page = 1,
  size = 20,
} = {}) => {
  const response = await api.get('/uncomplete-payments', {
    params: { bankId, page, size },
  });
  return response.data.data;
};

export const deletePendingImport = async (id) => {
  const response = await api.delete(`/uncomplete-payments/${id}`);
  return response.data.data;
};
