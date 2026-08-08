import {
  ListRow,
  IconTile,
  Amount,
  IconArrowDownLeft,
  IconArrowUpRight,
} from '../../../shared/components';
import {
  isIncomeTransaction,
  getSignedTransactionAmount,
  getTransactionCategory,
  getTransactionDescription,
  getTransactionDateTime,
  getTransactionSourceLabel,
} from '../logic/transaction.logic.js';

export const TransactionRow = ({ transaction }) => {
  const isIncome = isIncomeTransaction(transaction);

  return (
    <ListRow
      leading={
        <IconTile tone={isIncome ? 'positive' : 'negative'} size="sm">
          {isIncome ? <IconArrowDownLeft /> : <IconArrowUpRight />}
        </IconTile>
      }
      title={getTransactionCategory(transaction)}
      subtitle={getTransactionDescription(transaction)}
      caption={getTransactionDateTime(transaction)}
      trailing={
        <div className="transaction-row__trailing">
          <span className="transaction-row__source">
            {getTransactionSourceLabel(transaction)}
          </span>
          <Amount
            value={getSignedTransactionAmount(transaction)}
            fractionDigits={0}
          />
        </div>
      }
    />
  );
};
