import {
  Section,
  List,
  ListRow,
  ChipGroup,
  IconTile,
  Amount,
  Spinner,
  IconArrowDownLeft,
  IconArrowUpRight,
} from '../../../shared/components';
import {
  ACTIVITY_FILTERS,
  isIncomeTransaction,
  getSignedTransactionAmount,
  getTransactionTitle,
  getTransactionSubtitle,
  getTransactionSourceLabel,
} from '../logic/transaction.logic.js';

const FILTER_OPTIONS = [
  { value: ACTIVITY_FILTERS.ALL, label: 'All' },
  { value: ACTIVITY_FILTERS.INCOME, label: 'Income' },
  { value: ACTIVITY_FILTERS.PAYMENT, label: 'Pay' },
];

export const RecentActivityList = ({
  transactions,
  filter,
  onFilterChange,
  loading,
}) => {
  return (
    <Section title="Recent Activity" className="dashboard-activity">
      <ChipGroup
        options={FILTER_OPTIONS}
        value={filter}
        onChange={onFilterChange}
      />

      {loading ? (
        <div className="dashboard-activity__loading">
          <Spinner size={24} />
        </div>
      ) : (
        <List>
          {transactions.length === 0 ? (
            <p className="dashboard-activity__empty">No activity yet.</p>
          ) : (
            transactions.map((transaction) => {
              const isIncome = isIncomeTransaction(transaction);

              return (
                <ListRow
                  key={`${transaction.type}-${transaction.id}`}
                  leading={
                    <IconTile
                      tone={isIncome ? 'positive' : 'negative'}
                      size="sm"
                    >
                      {isIncome ? <IconArrowDownLeft /> : <IconArrowUpRight />}
                    </IconTile>
                  }
                  title={getTransactionTitle(transaction)}
                  subtitle={getTransactionSubtitle(transaction)}
                  trailing={
                    <div className="dashboard-activity__trailing">
                      <span className="dashboard-activity__source">
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
            })
          )}
        </List>
      )}
    </Section>
  );
};
