import { useRef } from 'react';
import {
  Select,
  Textarea,
  Button,
  IconButton,
  IconX,
  useDismiss,
} from '../../../shared/components';

const toOptions = (items) =>
  items.map((item) => ({ value: item.id, label: item.name }));

export const TextImportModal = ({
  banks,
  optionsLoading,
  bankId,
  setBankId,
  text,
  setText,
  parsing,
  onSubmit,
  onClose,
}) => {
  const containerRef = useRef(null);
  useDismiss(containerRef, true, onClose);

  return (
    <div className="inbox-modal__backdrop">
      <div className="inbox-modal" ref={containerRef}>
        <div className="inbox-modal__header">
          <h2 className="inbox-modal__title">Paste SMS Text</h2>
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
          value={bankId}
          onChange={(e) => setBankId(e.target.value)}
        />

        <Textarea
          label="SMS Text"
          placeholder="Paste the bank SMS text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          variant="primary"
          fullWidth
          loading={parsing}
          onClick={onSubmit}
        >
          Parse Text
        </Button>
      </div>
    </div>
  );
};
