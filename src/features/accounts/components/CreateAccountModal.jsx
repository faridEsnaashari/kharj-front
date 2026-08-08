import { useRef } from 'react';
import {
  Select,
  Input,
  Button,
  IconButton,
  IconX,
  useDismiss,
} from '../../../shared/components';

const toOptions = (items) =>
  items.map((item) => ({ value: item.id, label: item.name }));

export const CreateAccountModal = ({
  banks,
  units,
  relatedUsers,
  optionsLoading,
  form,
  setField,
  submitting,
  onSubmit,
  onClose,
}) => {
  const containerRef = useRef(null);
  useDismiss(containerRef, true, onClose);

  return (
    <div className="accounts-modal__backdrop">
      <div className="accounts-modal" ref={containerRef}>
        <div className="accounts-modal__header">
          <h2 className="accounts-modal__title">New Account</h2>
          <IconButton label="Close" onClick={onClose}>
            <IconX size={18} />
          </IconButton>
        </div>

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

        <Input
          label="Initial Balance"
          type="number"
          required
          value={form.ballance}
          onChange={(e) => setField('ballance', e.target.value)}
        />

        <Input
          label="Priority"
          type="number"
          required
          min="1"
          value={form.priority}
          onChange={(e) => setField('priority', e.target.value)}
        />

        <Button
          variant="primary"
          fullWidth
          loading={submitting}
          onClick={onSubmit}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};
