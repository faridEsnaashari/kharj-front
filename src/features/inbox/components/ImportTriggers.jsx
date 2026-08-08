import { Button, IconUpload, IconNote } from '../../../shared/components';

export const ImportTriggers = ({ onOpenUpload, onOpenText }) => {
  return (
    <div className="inbox-import-triggers">
      <Button
        variant="secondary"
        fullWidth
        iconLeft={<IconUpload size={18} />}
        onClick={onOpenUpload}
      >
        Import File
      </Button>

      <Button
        variant="secondary"
        fullWidth
        iconLeft={<IconNote size={18} />}
        onClick={onOpenText}
      >
        Paste SMS Text
      </Button>
    </div>
  );
};
