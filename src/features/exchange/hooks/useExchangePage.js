import { useCallback, useEffect, useState } from 'react';
import { createExchange } from '../api/exchange.api';
import {
  getBanks,
  getUnits,
  getRelatedUsers,
  getAccounts,
} from '../../../shared/api/lookups.api';
import { getRecentActivity, ACTIVITY_FILTERS } from '../../transaction';
import {
  isExchangeFormValid,
  buildCreateExchangePayload,
  getSelectedAccount,
} from '../logic/exchange.logic';

const INITIAL_FORM = {
  fromBankId: '',
  fromUnitId: '',
  fromOwnerId: '',
  toUserId: '',
  toBankId: '',
  toUnitId: '',
  toOwnerId: '',
  fromAmount: '',
  toAmount: '',
  date: '',
  time: '',
};

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const useExchangePage = () => {
  const [banks, setBanks] = useState([]);
  const [units, setUnits] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [form, setForm] = useState(INITIAL_FORM);
  const setField = useCallback((field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  }, []);

  const setToUserId = useCallback((value) => {
    setForm((current) => ({
      ...current,
      toUserId: value,
      toBankId: '',
      toUnitId: '',
      toOwnerId: '',
    }));
  }, []);

  const [fromAccount, setFromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);

  const [toBanks, setToBanks] = useState([]);
  const [toUnits, setToUnits] = useState([]);

  const [activityFilter, setActivityFilter] = useState(ACTIVITY_FILTERS.ALL);
  const [activity, setActivity] = useState({
    rows: [],
    paginationData: { total: 0 },
  });
  const [activityLoading, setActivityLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      setOptionsLoading(true);

      try {
        const [banksData, unitsData, relatedUsersData] = await Promise.all([
          getBanks(),
          getUnits(),
          getRelatedUsers(),
        ]);
        setBanks(banksData || []);
        setUnits(unitsData || []);
        setRelatedUsers(relatedUsersData || []);
      } catch (err) {
        setSubmitError(getErrorMessage(err, 'Failed to load form options'));
      } finally {
        setOptionsLoading(false);
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    const toUserId = form.toUserId;

    if (!toUserId) {
      setToBanks([]);
      setToUnits([]);
      return;
    }

    let cancelled = false;

    Promise.all([
      getBanks({ userId: toUserId }),
      getUnits({ userId: toUserId }),
    ])
      .then(([banksData, unitsData]) => {
        if (!cancelled) {
          setToBanks(banksData || []);
          setToUnits(unitsData || []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setToBanks([]);
          setToUnits([]);
          setSubmitError(
            getErrorMessage(err, 'Failed to load destination book options'),
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form.toUserId]);

  useEffect(() => {
    const fromBankId = form.fromBankId;
    const fromUnitId = form.fromUnitId;
    const fromOwnerId = form.fromOwnerId;

    if (!fromBankId || !fromUnitId || !fromOwnerId) {
      setFromAccount(null);
      return;
    }

    let cancelled = false;

    getAccounts({
      bankId: fromBankId,
      unitId: fromUnitId,
      ownedBy: fromOwnerId,
    })
      .then((accounts) => {
        if (!cancelled) {
          setFromAccount(getSelectedAccount(accounts));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFromAccount(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form.fromBankId, form.fromUnitId, form.fromOwnerId]);

  useEffect(() => {
    const toUserId = form.toUserId;
    const toBankId = form.toBankId;
    const toUnitId = form.toUnitId;
    const toOwnerId = form.toOwnerId;

    if (!toUserId || !toBankId || !toUnitId || !toOwnerId) {
      setToAccount(null);
      return;
    }

    let cancelled = false;

    getAccounts({
      bankId: toBankId,
      unitId: toUnitId,
      ownedBy: toOwnerId,
      userId: toUserId,
    })
      .then((accounts) => {
        if (!cancelled) {
          setToAccount(getSelectedAccount(accounts));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setToAccount(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form.toUserId, form.toBankId, form.toUnitId, form.toOwnerId]);

  const loadActivity = useCallback(async () => {
    setActivityLoading(true);

    try {
      const data = await getRecentActivity({
        type: activityFilter,
        bankId: form.fromBankId || undefined,
        unitId: form.fromUnitId || undefined,
        size: 5,
      });
      setActivity(data || { rows: [], paginationData: { total: 0 } });
    } catch (err) {
      setSubmitError(getErrorMessage(err, 'Failed to load recent activity'));
    } finally {
      setActivityLoading(false);
    }
  }, [activityFilter, form.fromBankId, form.fromUnitId]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  const handleSubmit = useCallback(async () => {
    if (!isExchangeFormValid(form) || !fromAccount || !toAccount) {
      setSubmitError(
        'Fill in the source and destination accounts, amounts and date first.',
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await createExchange(
        buildCreateExchangePayload(form, fromAccount.id, toAccount.id),
      );
      setSubmitSuccess(true);
      setForm((current) => ({
        ...INITIAL_FORM,
        fromBankId: current.fromBankId,
        fromUnitId: current.fromUnitId,
        fromOwnerId: current.fromOwnerId,
        toUserId: current.toUserId,
        toBankId: current.toBankId,
        toUnitId: current.toUnitId,
        toOwnerId: current.toOwnerId,
      }));
      await loadActivity();
    } catch (err) {
      setSubmitError(getErrorMessage(err, 'Failed to create exchange'));
    } finally {
      setSubmitting(false);
    }
  }, [form, fromAccount, toAccount, loadActivity]);

  return {
    banks,
    units,
    toBanks,
    toUnits,
    relatedUsers,
    optionsLoading,
    form,
    setField,
    setToUserId,
    fromBalance: fromAccount?.ballance ?? null,
    toBalance: toAccount?.ballance ?? null,
    activityFilter,
    setActivityFilter,
    activity,
    activityLoading,
    submitting,
    submitError,
    submitSuccess,
    handleSubmit,
  };
};
