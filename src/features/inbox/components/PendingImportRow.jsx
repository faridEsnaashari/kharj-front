import {
  ListRow,
  IconTile,
  Amount,
  Badge,
  Button,
  IconButton,
  IconArrowDownLeft,
  IconArrowUpRight,
  IconX,
} from '../../../shared/components';
import {
  isPendingIncome,
  getSignedPendingAmount,
  getPendingAccountLabel,
  getPendingSubtitle,
  getPendingOwnerName,
} from '../logic/inbox.logic';

export const PendingImportRow = ({ row, onOpen, onDelete }) => {
  const isIncome = isPendingIncome(row);
  const subtitle = [
    row.description,
    getPendingSubtitle(row),
    getPendingOwnerName(row),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="inbox-row">
      <ListRow
        className="inbox-row__list"
        leading={
          <IconTile tone={isIncome ? 'positive' : 'negative'} size="sm">
            {isIncome ? <IconArrowDownLeft /> : <IconArrowUpRight />}
          </IconTile>
        }
        title={getPendingAccountLabel(row)}
        subtitle={subtitle}
        trailing={
          <div className="inbox-row__trailing">
            <Badge tone="neutral">{row.source}</Badge>
            <Amount value={getSignedPendingAmount(row)} fractionDigits={0} />
          </div>
        }
      />

      <div className="inbox-row__actions">
        <Button variant="secondary" size="sm" onClick={() => onOpen(row)}>
          Convert
        </Button>
        <IconButton label="Discard" onClick={() => onDelete(row.id)}>
          <IconX size={16} />
        </IconButton>
      </div>
    </div>
  );
};
