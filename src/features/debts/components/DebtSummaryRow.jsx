import { Avatar, Amount, ListRow } from '../../../shared/components';
import {
  getDebtCounterparty,
  getSignedDebtAmount,
  getDebtDirectionLabel,
  getSummaryRowUnitLabel,
} from '../logic/debts.logic';

export const DebtSummaryRow = ({ row, currentUserId }) => {
  const counterparty = getDebtCounterparty(row, currentUserId);

  return (
    <ListRow
      leading={<Avatar name={counterparty?.name} />}
      title={counterparty?.name || 'Unknown'}
      subtitle={getSummaryRowUnitLabel(row)}
      trailing={
        <div className="debts-row__trailing">
          <Amount value={getSignedDebtAmount(row, currentUserId)} />
          <span className="debts-row__direction">
            {getDebtDirectionLabel(row, currentUserId)}
          </span>
        </div>
      }
    />
  );
};
