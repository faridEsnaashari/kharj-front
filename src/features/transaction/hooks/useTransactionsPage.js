import { useCallback, useEffect, useState } from 'react';
import { getRecentActivity } from '../api/transaction.api.js';
import { getBanks } from '../../bank/api/bank.api';
import { getUnits } from '../../unit/api/unit.api';
import { getRelatedUsers } from '../../user/api/user.api';
import { usePaginatedList } from '../../../shared/hooks/usePaginatedList';
import { ACTIVITY_FILTERS } from '../logic/transaction.logic.js';

const INITIAL_FILTERS = {
  type: ACTIVITY_FILTERS.ALL,
  bankId: '',
  unitId: '',
  ownedBy: '',
};

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const useTransactionsPage = () => {
  const [banks, setBanks] = useState([]);
  const [units, setUnits] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [error, setError] = useState(null);

  const fetchTransactionsPage = useCallback(
    ({ page, size }) =>
      getRecentActivity({
        page,
        size,
        type: filters.type,
        bankId: filters.bankId || undefined,
        unitId: filters.unitId || undefined,
        ownedBy: filters.ownedBy || undefined,
      }),
    [filters.type, filters.bankId, filters.unitId, filters.ownedBy],
  );

  const {
    rows: transactions,
    total,
    loading: transactionsLoading,
    loadingMore,
    hasMore,
    loadMore,
    reload,
    error: listError,
  } = usePaginatedList(fetchTransactionsPage, 10);

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

  return {
    transactions,
    total,
    transactionsLoading,
    loadingMore,
    hasMore,
    loadMore,
    banks,
    units,
    relatedUsers,
    optionsLoading,
    filters,
    setFilter,
    error,
  };
};
