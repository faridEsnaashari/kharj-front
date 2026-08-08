import { useCallback, useEffect, useState } from 'react';
import { getDebts, getDebtSummary } from '../api/debts.api';
import { getBanks } from '../../bank/api/bank.api';
import { getUnits } from '../../unit/api/unit.api';
import { getRelatedUsers } from '../../user/api/user.api';
import { usePaginatedList } from '../../../shared/hooks/usePaginatedList';
import {
  DEBT_TABS,
  DEBT_GROUP_BY,
  DEBT_DIRECTIONS,
  buildHistoryQueryParams,
} from '../logic/debts.logic';

const INITIAL_FILTERS = {
  bankId: '',
  unitId: '',
  direction: DEBT_DIRECTIONS.ALL,
  counterpartyId: '',
};

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const useDebtsPage = () => {
  const [tab, setTab] = useState(DEBT_TABS.SUMMARY);
  const [groupBy, setGroupBy] = useState(DEBT_GROUP_BY.BANK);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [banks, setBanks] = useState([]);
  const [units, setUnits] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [error, setError] = useState(null);

  const currentUserId = relatedUsers[0]?.id ?? null;

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
          setError(getErrorMessage(err, 'Failed to load filters'));
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

  const fetchSummary = useCallback(async () => {
    setSummaryLoading(true);

    try {
      const data = await getDebtSummary({
        groupBy,
        bankId: filters.bankId || undefined,
        unitId: filters.unitId || undefined,
      });
      setSummary(data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load debt summary'));
    } finally {
      setSummaryLoading(false);
    }
  }, [groupBy, filters.bankId, filters.unitId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const fetchHistoryPage = useCallback(
    ({ page, size }) =>
      getDebts({
        page,
        size,
        ...buildHistoryQueryParams(filters, currentUserId),
      }),
    [filters, currentUserId],
  );

  const {
    rows: historyRows,
    total: historyTotal,
    loading: historyLoading,
    loadingMore: historyLoadingMore,
    hasMore: historyHasMore,
    loadMore: loadMoreHistory,
    reload: reloadHistory,
    error: historyError,
  } = usePaginatedList(fetchHistoryPage, 10);

  useEffect(() => {
    reloadHistory();
  }, [reloadHistory]);

  useEffect(() => {
    if (historyError) {
      setError(historyError);
    }
  }, [historyError]);

  const setFilter = useCallback((field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
      ...(field === 'direction' ? { counterpartyId: '' } : {}),
    }));
  }, []);

  return {
    tab,
    setTab,
    groupBy,
    setGroupBy,
    filters,
    setFilter,
    banks,
    units,
    relatedUsers,
    optionsLoading,
    currentUserId,
    summary,
    summaryLoading,
    historyRows,
    historyTotal,
    historyLoading,
    historyLoadingMore,
    historyHasMore,
    loadMoreHistory,
    error,
  };
};
