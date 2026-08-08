import {
  Form,
  FormRow,
  Section,
  Select,
  Input,
  DateField,
  TimeField,
  Button,
  Amount,
  CALENDARS,
} from '../../../shared/components';

const toOptions = (items) =>
  items.map((item) => ({ value: item.id, label: item.name }));

const BalanceRow = ({ label, balance }) => (
  <div className="exchange-form__balance">
    <span className="exchange-form__balance-label">{label}</span>
    {balance !== null ? (
      <Amount value={balance} tone="neutral" fractionDigits={0} />
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

        <BalanceRow label="Available balance" balance={fromBalance} />

        <Input
          label="Amount"
          type="number"
          required
          min="0"
          value={form.fromAmount}
          onChange={(e) => setField('fromAmount', e.target.value)}
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

        <BalanceRow label="Available balance" balance={toBalance} />

        <Input
          label="Amount"
          type="number"
          required
          min="0"
          value={form.toAmount}
          onChange={(e) => setField('toAmount', e.target.value)}
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
