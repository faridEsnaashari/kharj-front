import { useEffect, useState } from 'react';
import { getAccount } from '../api/accounts.api';
import { getRecentActivity, ACTIVITY_FILTERS } from '../../transaction';

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const useAccountDetailsPage = (id) => {
  const [account, setAccount] = useState(null);
  const [accountLoading, setAccountLoading] = useState(Boolean(id));

  const [activityFilter, setActivityFilter] = useState(ACTIVITY_FILTERS.ALL);
  const [activity, setActivity] = useState({
    rows: [],
    paginationData: { total: 0 },
  });
  const [activityLoading, setActivityLoading] = useState(Boolean(id));

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return undefined;
    }

    let cancelled = false;

    getAccount(id)
      .then((data) => {
        if (!cancelled) {
          setAccount(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(getErrorMessage(err, 'Failed to load account'));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setAccountLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!account) {
      return undefined;
    }

    let cancelled = false;

    getRecentActivity({
      type: activityFilter,
      bankId: account.bankId,
      unitId: account.unitId,
      ownedBy: account.ownedBy,
      size: 10,
    })
      .then((data) => {
        if (!cancelled) {
          setActivity(data || { rows: [], paginationData: { total: 0 } });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(getErrorMessage(err, 'Failed to load activity'));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setActivityLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [account, activityFilter]);

  return {
    account,
    accountLoading,
    activityFilter,
    setActivityFilter,
    activity,
    activityLoading,
    error,
  };
};
