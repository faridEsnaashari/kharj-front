import { useEffect, useState, useCallback } from 'react';
import {
  getAccountGroupByUnit,
  getAccountWeeklyPaymentIncome,
} from '../api/dashboard.api';
import { getRecentActivity, ACTIVITY_FILTERS } from '../../transaction';
import { mergeGroupAndWeekly } from '../logic/dashboard.logic';

export const useDashboard = () => {
  const [statistic, setStatistic] = useState([]);
  const [activity, setActivity] = useState({
    rows: [],
    paginationData: { total: 0 },
  });
  const [activityFilter, setActivityFilter] = useState(ACTIVITY_FILTERS.ALL);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStatistic = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [groupByUnit, weeklyByUnit] = await Promise.all([
        getAccountGroupByUnit(),
        getAccountWeeklyPaymentIncome(),
      ]);
      setStatistic(mergeGroupAndWeekly(groupByUnit || [], weeklyByUnit || []));
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to load accounts',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const loadActivity = useCallback(async (filter) => {
    setActivityLoading(true);

    try {
      const data = await getRecentActivity({ type: filter, size: 5 });
      setActivity(data || { rows: [], paginationData: { total: 0 } });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to load activity',
      );
    } finally {
      setActivityLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatistic();
  }, [loadStatistic]);

  useEffect(() => {
    loadActivity(activityFilter);
  }, [activityFilter, loadActivity]);

  return {
    statistic,
    activity,
    activityFilter,
    setActivityFilter,
    loading,
    activityLoading,
    error,
  };
};
