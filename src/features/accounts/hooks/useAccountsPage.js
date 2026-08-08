import { useCallback, useEffect, useState } from 'react';
import { listAccounts, createAccount } from '../api/accounts.api';
import {
  getBanks,
  getUnits,
  getRelatedUsers,
} from '../../../shared/api/lookups.api';
import { usePaginatedList } from '../../../shared/hooks/usePaginatedList';
import {
  isCreateAccountFormValid,
  buildCreateAccountPayload,
} from '../logic/accounts.logic';

const INITIAL_FORM = {
  bankId: '',
  unitId: '',
  ownerId: '',
  ballance: '',
  priority: '',
};

const INITIAL_FILTERS = {
  bankId: '',
  unitId: '',
  ownedBy: '',
};

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const useAccountsPage = () => {
  const [banks, setBanks] = useState([]);
  const [units, setUnits] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const [error, setError] = useState(null);

  const fetchAccountsPage = useCallback(
    ({ page, size }) =>
      listAccounts({
        page,
        size,
        bankId: filters.bankId || undefined,
        unitId: filters.unitId || undefined,
        ownedBy: filters.ownedBy || undefined,
      }),
    [filters.bankId, filters.unitId, filters.ownedBy],
  );

  const {
    rows: accounts,
    total,
    loading: accountsLoading,
    loadingMore,
    hasMore,
    loadMore,
    reload,
    error: listError,
  } = usePaginatedList(fetchAccountsPage, 10);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (listError) {
      setError(listError);
    }
  }, [listError]);

  useEffect(() => {
    let cancelled = false;

    const loadOptions = async () => {
      setOptionsLoading(true);

      try {
        const [banksData, unitsData, relatedUsersData] = await Promise.all([
          getBanks(),
          getUnits(),
          getRelatedUsers(),
        ]);

        if (cancelled) {
          return;
        }

        setBanks(banksData || []);
        setUnits(unitsData || []);
        setRelatedUsers(relatedUsersData || []);
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

  const setFilter = useCallback((field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  }, []);

  const setField = useCallback((field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  }, []);

  const openCreate = useCallback(() => {
    setForm(INITIAL_FORM);
    setCreateOpen(true);
  }, []);

  const closeCreate = useCallback(() => {
    setCreateOpen(false);
  }, []);

  const handleCreateSubmit = useCallback(async () => {
    if (!isCreateAccountFormValid(form)) {
      setError('Fill in bank, unit, owner, balance and priority first.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createAccount(buildCreateAccountPayload(form));
      setCreateOpen(false);
      reload();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create account'));
    } finally {
      setSubmitting(false);
    }
  }, [form, reload]);

  const openDetails = useCallback((account) => {
    setSelectedAccountId(account.id);
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedAccountId(null);
  }, []);

  return {
    accounts,
    total,
    accountsLoading,
    loadingMore,
    hasMore,
    loadMore,
    banks,
    units,
    relatedUsers,
    optionsLoading,
    filters,
    setFilter,
    createOpen,
    openCreate,
    closeCreate,
    form,
    setField,
    submitting,
    handleCreateSubmit,
    selectedAccountId,
    openDetails,
    closeDetails,
    error,
  };
};
