import { useCallback, useEffect, useState } from 'react';
import { getBanks } from '../../bank/api/bank.api';
import { getUnits } from '../../unit/api/unit.api';
import { getAccounts } from '../../accounts/api/accounts.api';
import { createExchange } from '../../exchange/api/exchange.api';
import {
  buildExchangeInitialForm,
  isExchangeConvertFormValid,
  buildExchangeConvertPayload,
} from '../logic/inbox.logic';

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const useInboxExchange = ({
  onDone,
  onError,
  onNotice,
  relatedUsers,
}) => {
  const [units, setUnits] = useState([]);
  const [fromAccount, setFromAccount] = useState(null);
  const [row, setRow] = useState(null);
  const [form, setForm] = useState(null);
  const [toBanks, setToBanks] = useState([]);
  const [toUnits, setToUnits] = useState([]);
  const [toAccount, setToAccount] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const open = useCallback(
    (target) => {
      setRow(target);
      setForm({
        ...buildExchangeInitialForm(target),
        toUserId: relatedUsers?.[0] ? String(relatedUsers[0].id) : '',
        toOwnerId: relatedUsers?.[0] ? String(relatedUsers[0].id) : '',
      });
    },
    [relatedUsers],
  );

  const close = useCallback(() => {
    setRow(null);
    setForm(null);
    setToBanks([]);
    setToUnits([]);
    setToAccount(null);
    setFromAccount(null);
  }, []);

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

  const isOpen = Boolean(row);
  const fromBankId = form?.fromBankId;
  const fromUnitId = form?.fromUnitId;
  const fromOwnerId = form?.fromOwnerId;
  const toUserId = form?.toUserId;
  const toBankId = form?.toBankId;
  const toUnitId = form?.toUnitId;
  const toOwnerId = form?.toOwnerId;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    let cancelled = false;

    getUnits()
      .then((unitsData) => {
        if (!cancelled) {
          setUnits(unitsData || []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          onError(getErrorMessage(err, 'Failed to load units'));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, onError]);

  useEffect(() => {
    if (!fromBankId || !fromUnitId || !fromOwnerId) {
      return undefined;
    }

    let cancelled = false;

    getAccounts({
      bankId: fromBankId,
      unitId: fromUnitId,
      ownedBy: fromOwnerId,
    })
      .then((accounts) => {
        if (!cancelled) {
          setFromAccount(accounts?.[0] ?? null);
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
  }, [fromBankId, fromUnitId, fromOwnerId]);

  useEffect(() => {
    if (!toUserId) {
      return undefined;
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
          onError(
            getErrorMessage(err, 'Failed to load destination book options'),
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [toUserId, onError]);

  useEffect(() => {
    if (!toUserId || !toBankId || !toUnitId || !toOwnerId) {
      return undefined;
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
          setToAccount(accounts?.[0] ?? null);
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
  }, [toUserId, toBankId, toUnitId, toOwnerId]);

  const submit = useCallback(async () => {
    if (!row || !form || !isExchangeConvertFormValid(form)) {
      onError('Fill in the destination account, amount and date first.');
      return;
    }

    if (!fromAccount) {
      onError('No account found for the selected source.');
      return;
    }

    if (!toAccount) {
      onError('No account found for the selected destination.');
      return;
    }

    setSubmitting(true);
    onError(null);

    try {
      await createExchange(
        buildExchangeConvertPayload(row, form, fromAccount.id, toAccount.id),
      );
      onNotice('Exchange recorded.');
      close();
      onDone();
    } catch (err) {
      onError(getErrorMessage(err, 'Failed to create exchange'));
    } finally {
      setSubmitting(false);
    }
  }, [row, form, fromAccount, toAccount, close, onDone, onError, onNotice]);

  return {
    row,
    form,
    units,
    fromBalance:
      fromBankId && fromUnitId && fromOwnerId
        ? (fromAccount?.ballance ?? null)
        : null,
    toBanks,
    toUnits,
    toBalance:
      form && toBankId && toUnitId && toOwnerId
        ? (toAccount?.ballance ?? null)
        : null,
    submitting,
    open,
    close,
    setField,
    setToUserId,
    submit,
  };
};
