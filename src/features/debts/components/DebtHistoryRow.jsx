import { Avatar, Amount, ListRow } from '../../../shared/components';
import {
  getDebtCounterparty,
  getSignedDebtAmount,
  getDebtDirectionLabel,
  getHistoryRowUnitLabel,
  getHistoryRowDateLabel,
} from '../logic/debts.logic';

export const DebtHistoryRow = ({ row, currentUserId }) => {
  const counterparty = getDebtCounterparty(row, currentUserId);

  return (
    <ListRow
      leading={<Avatar name={counterparty?.name} />}
      title={`${getDebtDirectionLabel(row, currentUserId)} · ${counterparty?.name || 'Unknown'}`}
      subtitle={[getHistoryRowUnitLabel(row), getHistoryRowDateLabel(row)]
        .filter(Boolean)
        .join(' · ')}
      trailing={<Amount value={getSignedDebtAmount(row, currentUserId)} />}
    />
  );
};
