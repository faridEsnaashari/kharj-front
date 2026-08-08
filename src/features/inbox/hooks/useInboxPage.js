import { useCallback, useEffect, useState } from 'react';
import {
  uploadBankFile,
  importBankExport,
  importText,
  getPendingImports,
  deletePendingImport,
} from '../api/inbox.api';
import {
  getBanks,
  getRelatedUsers,
  getAccounts,
  getPaymentCategories,
  getIncomeCategories,
} from '../../../shared/api/lookups.api';
import {
  createPayment,
  createIncome,
} from '../../../shared/api/create-transaction.api';
import { usePaginatedList } from '../../../shared/hooks/usePaginatedList';
import { categoriesToOptions } from '../../../shared/lib/categories';
import {
  isPendingIncome,
  isConvertOwnerChanged,
  buildConvertInitialForm,
  isConvertFormValid,
  buildConvertPayload,
} from '../logic/inbox.logic';

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const useInboxPage = () => {
  const [banks, setBanks] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [paymentCategories, setPaymentCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [filterBankId, setFilterBankId] = useState('');

  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadBankId, setUploadBankId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [textOpen, setTextOpen] = useState(false);
  const [textBankId, setTextBankId] = useState('');
  const [text, setText] = useState('');
  const [parsingText, setParsingText] = useState(false);

  const [activeRow, setActiveRow] = useState(null);
  const [convertForm, setConvertForm] = useState(null);
  const [converting, setConverting] = useState(false);

  const [notice, setNotice] = useState(null);
  const [error, setError] = useState(null);

  const fetchPendingPage = useCallback(
    ({ page, size }) =>
      getPendingImports({ page, size, bankId: filterBankId || undefined }),
    [filterBankId],
  );

  const {
    rows: pending,
    total: pendingTotal,
    loading: pendingLoading,
    loadingMore: pendingLoadingMore,
    hasMore: pendingHasMore,
    loadMore: loadMorePending,
    reload: reloadPending,
    error: pendingError,
  } = usePaginatedList(fetchPendingPage, 10);

  useEffect(() => {
    reloadPending();
  }, [reloadPending]);

  useEffect(() => {
    if (pendingError) {
      setError(pendingError);
    }
  }, [pendingError]);

  useEffect(() => {
    let cancelled = false;

    const loadOptions = async () => {
      setOptionsLoading(true);

      try {
        const [
          banksData,
          relatedUsersData,
          paymentCategoriesData,
          incomeCategoriesData,
        ] = await Promise.all([
          getBanks(),
          getRelatedUsers(),
          getPaymentCategories(),
          getIncomeCategories(),
        ]);

        if (!cancelled) {
          setBanks(banksData || []);
          setRelatedUsers(relatedUsersData || []);
          setPaymentCategories(categoriesToOptions(paymentCategoriesData));
          setIncomeCategories(categoriesToOptions(incomeCategoriesData));
        }
      } catch (err) {
        if (!cancelled) {
          setError(getErrorMessage(err, 'Failed to load form options'));
        }
      } finally {
        if (!cancelled) {
          setOptionsLoading(false);
        }
      }
    };

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  const openUpload = useCallback(() => {
    setUploadBankId('');
    setSelectedFile(null);
    setUploadOpen(true);
  }, []);

  const closeUpload = useCallback(() => {
    setUploadOpen(false);
  }, []);

  const openText = useCallback(() => {
    setTextBankId('');
    setText('');
    setTextOpen(true);
  }, []);

  const closeText = useCallback(() => {
    setTextOpen(false);
  }, []);

  const handleUploadImport = useCallback(async () => {
    if (!uploadBankId || !selectedFile) {
      setError('Pick a bank and a file first.');
      return;
    }

    setUploading(true);
    setError(null);
    setNotice(null);

    try {
      const uploadedFile = await uploadBankFile(selectedFile);
      await importBankExport({ bankId: uploadBankId, uploadedFile });
      setNotice('File imported.');
      setUploadOpen(false);
      reloadPending();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to import file'));
    } finally {
      setUploading(false);
    }
  }, [uploadBankId, selectedFile, reloadPending]);

  const handleTextImport = useCallback(async () => {
    if (!textBankId || !text) {
      setError('Pick a bank and paste the SMS text first.');
      return;
    }

    setParsingText(true);
    setError(null);
    setNotice(null);

    try {
      await importText({ bankId: textBankId, text });
      setNotice('Text parsed.');
      setTextOpen(false);
      reloadPending();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to parse text'));
    } finally {
      setParsingText(false);
    }
  }, [textBankId, text, reloadPending]);

  const openConvert = useCallback((row) => {
    setActiveRow(row);
    setConvertForm(buildConvertInitialForm(row));
  }, []);

  const closeConvert = useCallback(() => {
    setActiveRow(null);
    setConvertForm(null);
  }, []);

  const setConvertField = useCallback((field, value) => {
    setConvertForm((current) => ({ ...current, [field]: value }));
  }, []);

  const handleConvertSubmit = useCallback(async () => {
    if (!activeRow || !convertForm || !isConvertFormValid(convertForm)) {
      setError('Fill in the owner, category and date first.');
      return;
    }

    setConverting(true);
    setError(null);
    setNotice(null);

    try {
      let resolvedAccountId = activeRow.accountId;

      if (
        isPendingIncome(activeRow) &&
        isConvertOwnerChanged(activeRow, convertForm)
      ) {
        const accounts = await getAccounts({
          bankId: activeRow.account.bankId,
          unitId: activeRow.account.unitId,
          ownedBy: convertForm.ownerId,
        });
        const resolved = accounts?.[0];

        if (!resolved) {
          setError('No account found for the selected owner.');
          setConverting(false);
          return;
        }

        resolvedAccountId = resolved.id;
      }

      const payload = buildConvertPayload(
        activeRow,
        convertForm,
        resolvedAccountId,
      );

      if (isPendingIncome(activeRow)) {
        await createIncome(payload);
      } else {
        await createPayment(payload);
      }

      setNotice('Transaction recorded.');
      closeConvert();
      reloadPending();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to record transaction'));
    } finally {
      setConverting(false);
    }
  }, [activeRow, convertForm, closeConvert, reloadPending]);

  const handleDelete = useCallback(
    async (id) => {
      setError(null);
      setNotice(null);

      try {
        await deletePendingImport(id);
        reloadPending();
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to delete pending import'));
      }
    },
    [reloadPending],
  );

  return {
    banks,
    relatedUsers,
    paymentCategories,
    incomeCategories,
    optionsLoading,
    filterBankId,
    setFilterBankId,
    uploadOpen,
    openUpload,
    closeUpload,
    uploadBankId,
    setUploadBankId,
    selectedFile,
    setSelectedFile,
    uploading,
    handleUploadImport,
    textOpen,
    openText,
    closeText,
    textBankId,
    setTextBankId,
    text,
    setText,
    parsingText,
    handleTextImport,
    pending,
    pendingTotal,
    pendingLoading,
    pendingLoadingMore,
    pendingHasMore,
    loadMorePending,
    activeRow,
    convertForm,
    openConvert,
    closeConvert,
    setConvertField,
    converting,
    handleConvertSubmit,
    handleDelete,
    notice,
    error,
  };
};
