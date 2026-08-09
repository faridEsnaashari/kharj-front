import {
  Form,
  FormRow,
  Select,
  Input,
  Textarea,
  DateField,
  TimeField,
  Button,
  Amount,
  CALENDARS,
} from '../../../shared/components';

const toOptions = (items) =>
  items.map((item) => ({ value: item.id, label: item.name }));

export const PaymentForm = ({
  banks,
  units,
  relatedUsers,
  categories,
  optionsLoading,
  form,
  setField,
  accountBalance,
  submitting,
  onSubmit,
}) => {
  return (
    <Form onSubmit={onSubmit} className="payment-form">
      <Select
        label="Bank"
        placeholder="Select a bank"
        required
        disabled={optionsLoading}
        options={toOptions(banks)}
        value={form.bankId}
        onChange={(e) => setField('bankId', e.target.value)}
      />

      <Select
        label="Unit"
        placeholder="Select a unit"
        required
        disabled={optionsLoading}
        options={toOptions(units)}
        value={form.unitId}
        onChange={(e) => setField('unitId', e.target.value)}
      />

      <Select
        label="Owner"
        placeholder="Select an owner"
        required
        disabled={optionsLoading}
        options={toOptions(relatedUsers)}
        value={form.ownerId}
        onChange={(e) => setField('ownerId', e.target.value)}
      />

      <div className="payment-form__balance">
        <span className="payment-form__balance-label">Available balance</span>
        {accountBalance !== null ? (
          <Amount value={accountBalance} tone="neutral" fractionDigits={0} />
        ) : (
          <span className="payment-form__balance-placeholder">—</span>
        )}
      </div>

      <Select
        label="Category"
        placeholder="Select a category"
        required
        disabled={optionsLoading}
        options={categories}
        value={form.category}
        onChange={(e) => setField('category', e.target.value)}
      />

      <Input
        label="Price"
        type="number"
        required
        min="0"
        value={form.price}
        onChange={(e) => setField('price', e.target.value)}
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

      <Textarea
        label="Description"
        optional
        value={form.description}
        onChange={(e) => setField('description', e.target.value)}
      />

      <Button type="submit" variant="primary" fullWidth loading={submitting}>
        Create Payment
      </Button>
    </Form>
  );
};
