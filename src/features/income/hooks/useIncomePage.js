import { useCallback, useEffect, useState } from 'react';
import { createIncome } from '../../../shared/api/create-transaction.api';
import {
  getBanks,
  getUnits,
  getRelatedUsers,
  getAccounts,
  getIncomeCategories,
} from '../../../shared/api/lookups.api';
import { getRecentActivity, ACTIVITY_FILTERS } from '../../transaction';
import { categoriesToOptions } from '../../../shared/lib/categories';
import {
  isIncomeFormValid,
  buildCreateIncomePayload,
  getSelectedAccount,
} from '../logic/income.logic';

const INITIAL_FORM = {
  bankId: '',
  unitId: '',
  ownerId: '',
  category: '',
  amount: '',
  date: '',
  time: '',
  description: '',
};

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const useIncomePage = () => {
  const [banks, setBanks] = useState([]);
  const [units, setUnits] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [form, setForm] = useState(INITIAL_FORM);
  const setField = useCallback((field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  }, []);

  const [selectedAccount, setSelectedAccount] = useState(null);

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
            getIncomeCategories(),
          ]);
        setBanks(banksData || []);
        setUnits(unitsData || []);
        setRelatedUsers(relatedUsersData || []);
        setCategories(categoriesToOptions(categoriesData));
      } catch (err) {
        setSubmitError(getErrorMessage(err, 'Failed to load form options'));
      } finally {
        setOptionsLoading(false);
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    const bankId = form.bankId;
    const unitId = form.unitId;
    const ownerId = form.ownerId;

    if (!bankId || !unitId || !ownerId) {
      setSelectedAccount(null);
      return;
    }

    let cancelled = false;

    getAccounts({ bankId, unitId, ownedBy: ownerId })
      .then((accounts) => {
        if (!cancelled) {
          setSelectedAccount(getSelectedAccount(accounts));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSelectedAccount(null);
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
    if (!isIncomeFormValid(form)) {
      setSubmitError(
        'Fill in bank, unit, owner, category, amount and date first.',
      );
      return;
    }

    if (!selectedAccount) {
      setSubmitError('first select a valid account');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await createIncome(buildCreateIncomePayload(form, selectedAccount.id));
      setSubmitSuccess(true);
      setForm((current) => ({
        ...INITIAL_FORM,
        bankId: current.bankId,
        unitId: current.unitId,
        ownerId: current.ownerId,
      }));
      await loadActivity();
    } catch (err) {
      setSubmitError(getErrorMessage(err, 'Failed to create income'));
    } finally {
      setSubmitting(false);
    }
  }, [form, selectedAccount, loadActivity]);

  return {
    banks,
    units,
    relatedUsers,
    categories,
    optionsLoading,
    form,
    setField,
    accountBalance: selectedAccount?.ballance ?? null,
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
