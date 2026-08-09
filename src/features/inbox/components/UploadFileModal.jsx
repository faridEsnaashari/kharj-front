import { useRef } from 'react';
import {
  Select,
  Button,
  IconButton,
  IconUpload,
  IconX,
  useDismiss,
} from '../../../shared/components';

const toOptions = (items) =>
  items.map((item) => ({ value: item.id, label: item.name }));

export const UploadFileModal = ({
  banks,
  optionsLoading,
  bankId,
  setBankId,
  file,
  setFile,
  uploading,
  onSubmit,
  onClose,
}) => {
  const containerRef = useRef(null);
  useDismiss(containerRef, true, onClose);

  return (
    <div className="inbox-modal__backdrop">
      <div className="inbox-modal" ref={containerRef}>
        <div className="inbox-modal__header">
          <h2 className="inbox-modal__title">Import from File</h2>
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

        <label className="inbox-import__file">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <span>{file ? file.name : 'Choose a file'}</span>
        </label>

        <Button
          variant="primary"
          fullWidth
          loading={uploading}
          iconLeft={<IconUpload size={18} />}
          onClick={onSubmit}
        >
          Import File
        </Button>
      </div>
    </div>
  );
};
