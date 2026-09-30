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

  const toUserId = form?.toUserId;
  const toBankId = form?.toBankId;
  const toUnitId = form?.toUnitId;
  const toOwnerId = form?.toOwnerId;

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

    if (!toAccount) {
      onError('No account found for the selected destination.');
      return;
    }

    setSubmitting(true);
    onError(null);

    try {
      await createExchange(
        buildExchangeConvertPayload(row, form, toAccount.id),
      );
      onNotice('Exchange recorded.');
      close();
      onDone();
    } catch (err) {
      onError(getErrorMessage(err, 'Failed to create exchange'));
    } finally {
      setSubmitting(false);
    }
  }, [row, form, toAccount, close, onDone, onError, onNotice]);

  return {
    row,
    form,
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
