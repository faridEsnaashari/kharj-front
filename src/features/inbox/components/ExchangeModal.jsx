import { useRef } from 'react';
import {
  Amount,
  Select,
  Input,
  AmountInput,
  DateField,
  TimeField,
  FormRow,
  Button,
  IconButton,
  IconX,
  CALENDARS,
  getAmountHint,
  useDismiss,
} from '../../../shared/components';

const toOptions = (items) =>
  items.map((item) => ({ value: item.id, label: item.name }));

export const ExchangeModal = ({
  row,
  banks,
  units,
  relatedUsers,
  fromBalance,
  toBanks,
  toUnits,
  toBalance,
  form,
  setField,
  setToUserId,
  submitting,
  onSubmit,
  onClose,
}) => {
  const containerRef = useRef(null);
  useDismiss(containerRef, true, onClose);

  const fromUnit = units.find((unit) => String(unit.id) === form.fromUnitId);
  const toUnit = toUnits.find((unit) => String(unit.id) === form.toUnitId);

  return (
    <div className="inbox-modal__backdrop">
      <div className="inbox-modal" ref={containerRef}>
        <div className="inbox-modal__header">
          <h2 className="inbox-modal__title">Convert to Exchange</h2>
          <IconButton label="Close" onClick={onClose}>
            <IconX size={18} />
          </IconButton>
        </div>

        <div className="inbox-modal__description">
          <span className="inbox-modal__description-label">
            Parsed Description
          </span>
          <p className="inbox-modal__description-value">
            {row.description || '—'}
          </p>
        </div>

        <Select
          label="From Bank"
          placeholder="Select a bank"
          required
          options={toOptions(banks)}
          value={form.fromBankId}
          onChange={(e) => setField('fromBankId', e.target.value)}
        />

        <Select
          label="From Unit"
          placeholder="Select a unit"
          required
          options={toOptions(units)}
          value={form.fromUnitId}
          onChange={(e) => setField('fromUnitId', e.target.value)}
        />

        <Select
          label="From Owner"
          placeholder="Select an owner"
          required
          options={toOptions(relatedUsers)}
          value={form.fromOwnerId}
          onChange={(e) => setField('fromOwnerId', e.target.value)}
        />

        {fromBalance !== null ? (
          <div className="inbox-modal__account">
            <span className="inbox-modal__account-label">Balance</span>
            <Amount
              value={fromBalance}
              unit={fromUnit}
              tone="neutral"
              fractionDigits={0}
            />
          </div>
        ) : null}

        <AmountInput
          label="From Amount"
          required
          hint={getAmountHint(form.fromAmount, fromUnit)}
          value={form.fromAmount}
          onChange={(value) => setField('fromAmount', value)}
        />

        <Select
          label="To Book"
          placeholder="Select whose book"
          required
          options={toOptions(relatedUsers)}
          value={form.toUserId}
          onChange={(e) => setToUserId(e.target.value)}
        />

        <Select
          label="To Bank"
          placeholder="Select a bank"
          required
          disabled={!form.toUserId}
          options={toOptions(toBanks)}
          value={form.toBankId}
          onChange={(e) => setField('toBankId', e.target.value)}
        />

        <Select
          label="To Unit"
          placeholder="Select a unit"
          required
          disabled={!form.toUserId}
          options={toOptions(toUnits)}
          value={form.toUnitId}
          onChange={(e) => setField('toUnitId', e.target.value)}
        />

        <Select
          label="To Owner"
          placeholder="Select an owner"
          required
          options={toOptions(relatedUsers)}
          value={form.toOwnerId}
          onChange={(e) => setField('toOwnerId', e.target.value)}
        />

        {toBalance !== null ? (
          <div className="inbox-modal__account">
            <span className="inbox-modal__account-label">Balance</span>
            <Amount
              value={toBalance}
              unit={toUnit}
              tone="neutral"
              fractionDigits={0}
            />
          </div>
        ) : null}

        <AmountInput
          label="To Amount"
          required
          hint={getAmountHint(form.toAmount, toUnit)}
          value={form.toAmount}
          onChange={(value) => setField('toAmount', value)}
        />

        <FormRow>
          <DateField
            label="Date"
            required
            calendar={CALENDARS.JALALI}
            value={form.date}
            onChange={(iso) => setField('date', iso)}
          />
          <TimeField
            label="Time"
            value={form.time}
            onChange={(e) => setField('time', e.target.value)}
          />
        </FormRow>

        <div className="inbox-modal__actions">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            fullWidth
            loading={submitting}
            onClick={onSubmit}
          >
            Record Exchange
          </Button>
        </div>
      </div>
    </div>
  );
};
