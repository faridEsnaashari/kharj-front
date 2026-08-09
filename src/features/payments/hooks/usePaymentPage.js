import { useCallback, useEffect, useState } from 'react';
import { createPayment, getPaymentCategories } from '../api/payment.api';
import { getBanks } from '../../bank/api/bank.api';
import { getUnits } from '../../unit/api/unit.api';
import { getRelatedUsers } from '../../user/api/user.api';
import { getAccounts } from '../../accounts/api/accounts.api';
import { getRecentActivity, ACTIVITY_FILTERS } from '../../transaction';
import { categoriesToOptions } from '../../../shared/lib/categories';
import {
  isPaymentFormValid,
  buildCreatePaymentPayload,
  getSelectedAccountBalance,
} from '../logic/payment.logic';

const INITIAL_FORM = {
  bankId: '',
  unitId: '',
  ownerId: '',
  category: '',
  price: '',
  date: '',
  time: '',
  description: '',
};

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const usePaymentPage = () => {
  const [banks, setBanks] = useState([]);
  const [units, setUnits] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [form, setForm] = useState(INITIAL_FORM);
  const setField = useCallback((field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  }, []);

  const [accountBalance, setAccountBalance] = useState(null);

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
        const [banksData, unitsData, relatedUsersData, categoriesData] =
          await Promise.all([
            getBanks(),
            getUnits(),
            getRelatedUsers(),
            getPaymentCategories(),
          ]);
        setBanks(banksData || []);
        setUnits(unitsData || []);
        setRelatedUsers(relatedUsersData || []);
        setCategories(categoriesToOptions(categoriesData));

        if (relatedUsersData?.[0]) {
          setField('ownerId', relatedUsersData[0].id);
        }
      } catch (err) {
        setSubmitError(getErrorMessage(err, 'Failed to load form options'));
      } finally {
        setOptionsLoading(false);
      }
    };

    loadOptions();
  }, [setField]);

  useEffect(() => {
    const bankId = form.bankId;
    const unitId = form.unitId;
    const ownerId = form.ownerId;

    if (!bankId || !unitId || !ownerId) {
      setAccountBalance(null);
      return;
    }

    let cancelled = false;

    getAccounts({ bankId, unitId, ownedBy: ownerId })
      .then((accounts) => {
        if (!cancelled) {
          setAccountBalance(getSelectedAccountBalance(accounts) ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAccountBalance(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form.bankId, form.unitId, form.ownerId]);

  const loadActivity = useCallback(async () => {
    setActivityLoading(true);

    try {
      const data = await getRecentActivity({
        type: activityFilter,
        bankId: form.bankId || undefined,
        unitId: form.unitId || undefined,
        size: 5,
      });
      setActivity(data || { rows: [], paginationData: { total: 0 } });
    } catch (err) {
      setSubmitError(getErrorMessage(err, 'Failed to load recent activity'));
    } finally {
      setActivityLoading(false);
    }
  }, [activityFilter, form.bankId, form.unitId]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  const handleSubmit = useCallback(async () => {
    if (!isPaymentFormValid(form)) {
      setSubmitError(
        'Fill in bank, unit, owner, category, price and date first.',
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await createPayment(buildCreatePaymentPayload(form));
      setSubmitSuccess(true);
      setForm((current) => ({
        ...INITIAL_FORM,
        bankId: current.bankId,
        unitId: current.unitId,
        ownerId: current.ownerId,
      }));
      await loadActivity();
    } catch (err) {
      setSubmitError(getErrorMessage(err, 'Failed to create payment'));
    } finally {
      setSubmitting(false);
    }
  }, [form, loadActivity]);

  return {
    banks,
    units,
    relatedUsers,
    categories,
    optionsLoading,
    form,
    setField,
    accountBalance,
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
