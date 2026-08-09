import { useRef } from 'react';
import {
  Amount,
  Badge,
  Select,
  Textarea,
  DateField,
  TimeField,
  FormRow,
  Button,
  IconButton,
  IconX,
  CALENDARS,
  useDismiss,
} from '../../../shared/components';
import {
  isPendingIncome,
  getSignedPendingAmount,
  getPendingAccountLabel,
} from '../logic/inbox.logic';

const toOptions = (items) =>
  items.map((item) => ({ value: item.id, label: item.name }));

export const ConvertModal = ({
  row,
  relatedUsers,
  paymentCategories,
  incomeCategories,
  form,
  setField,
  submitting,
  onSubmit,
  onClose,
}) => {
  const containerRef = useRef(null);
  useDismiss(containerRef, true, onClose);

  const isIncome = isPendingIncome(row);
  const categories = isIncome ? incomeCategories : paymentCategories;

  return (
    <div className="inbox-modal__backdrop">
      <div className="inbox-modal" ref={containerRef}>
        <div className="inbox-modal__header">
          <h2 className="inbox-modal__title">Convert to Transaction</h2>
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

        <div className="inbox-modal__amount">
          <Amount
            value={getSignedPendingAmount(row)}
            size="lg"
            fractionDigits={0}
          />
          <Badge tone={isIncome ? 'positive' : 'negative'}>
            {isIncome ? 'Income' : 'Expense'}
          </Badge>
        </div>

        <div className="inbox-modal__account">
          <span className="inbox-modal__account-label">Account</span>
          <span className="inbox-modal__account-value">
            {getPendingAccountLabel(row)}
          </span>
        </div>

        <Select
          label="Owner"
          placeholder="Select an owner"
          required
          options={toOptions(relatedUsers)}
          value={form.ownerId}
          onChange={(e) => setField('ownerId', e.target.value)}
        />

        <Select
          label="Category"
          placeholder="Select a category"
          required
          options={categories}
          value={form.category}
          onChange={(e) => setField('category', e.target.value)}
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
            Record Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};
