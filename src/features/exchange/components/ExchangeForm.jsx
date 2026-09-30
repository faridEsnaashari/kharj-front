import {
  Form,
  FormRow,
  Section,
  Select,
  Input,
  AmountInput,
  DateField,
  TimeField,
  Button,
  Amount,
  CALENDARS,
  getAmountHint,
} from '../../../shared/components';

const toOptions = (items) =>
  items.map((item) => ({ value: item.id, label: item.name }));

const findUnit = (units, unitId) =>
  units.find((unit) => String(unit.id) === String(unitId));

const BalanceRow = ({ label, balance, unit }) => (
  <div className="exchange-form__balance">
    <span className="exchange-form__balance-label">{label}</span>
    {balance !== null ? (
      <Amount value={balance} unit={unit} tone="neutral" fractionDigits={0} />
    ) : (
      <span className="exchange-form__balance-placeholder">—</span>
    )}
  </div>
);

export const ExchangeForm = ({
  banks,
  units,
  toBanks,
  toUnits,
  relatedUsers,
  optionsLoading,
  form,
  setField,
  setToUserId,
  fromBalance,
  toBalance,
  submitting,
  onSubmit,
}) => {
  const fromUnit = findUnit(units, form.fromUnitId);
  const toUnit = findUnit(toUnits, form.toUnitId);

  return (
    <Form onSubmit={onSubmit} className="exchange-form">
      <Section title="From">
        <Select
          label="Bank"
          placeholder="Select a bank"
          required
          disabled={optionsLoading}
          options={toOptions(banks)}
          value={form.fromBankId}
          onChange={(e) => setField('fromBankId', e.target.value)}
        />

        <Select
          label="Unit"
          placeholder="Select a unit"
          required
          disabled={optionsLoading}
          options={toOptions(units)}
          value={form.fromUnitId}
          onChange={(e) => setField('fromUnitId', e.target.value)}
        />

        <Select
          label="Owner"
          placeholder="Select an owner"
          required
          disabled={optionsLoading}
          options={toOptions(relatedUsers)}
          value={form.fromOwnerId}
          onChange={(e) => setField('fromOwnerId', e.target.value)}
        />

        <BalanceRow
          label="Available balance"
          balance={fromBalance}
          unit={fromUnit}
        />

        <AmountInput
          label="Amount"
          required
          hint={getAmountHint(form.fromAmount, fromUnit)}
          value={form.fromAmount}
          onChange={(value) => setField('fromAmount', value)}
        />
      </Section>

      <Section title="To">
        <Select
          label="Book"
          placeholder="Select whose book"
          required
          disabled={optionsLoading}
          options={toOptions(relatedUsers)}
          value={form.toUserId}
          onChange={(e) => setToUserId(e.target.value)}
        />

        <Select
          label="Bank"
          placeholder="Select a bank"
          required
          disabled={optionsLoading || !form.toUserId}
          options={toOptions(toBanks)}
          value={form.toBankId}
          onChange={(e) => setField('toBankId', e.target.value)}
        />

        <Select
          label="Unit"
          placeholder="Select a unit"
          required
          disabled={optionsLoading || !form.toUserId}
          options={toOptions(toUnits)}
          value={form.toUnitId}
          onChange={(e) => setField('toUnitId', e.target.value)}
        />

        <Select
          label="Owner"
          placeholder="Select an owner"
          required
          disabled={optionsLoading}
          options={toOptions(relatedUsers)}
          value={form.toOwnerId}
          onChange={(e) => setField('toOwnerId', e.target.value)}
        />

        <BalanceRow
          label="Available balance"
          balance={toBalance}
          unit={toUnit}
        />

        <AmountInput
          label="Amount"
          required
          hint={getAmountHint(form.toAmount, toUnit)}
          value={form.toAmount}
          onChange={(value) => setField('toAmount', value)}
        />
      </Section>

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

      <Button type="submit" variant="primary" fullWidth loading={submitting}>
        Create Exchange
      </Button>
    </Form>
  );
};
