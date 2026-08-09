import { Section, List, ChipGroup, Spinner } from '../../../shared/components';
import { ACTIVITY_FILTERS } from '../logic/transaction.logic.js';
import { TransactionRow } from './TransactionRow.jsx';
import '../styles/transaction.css';

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
            transactions.map((transaction) => (
              <TransactionRow
                key={`${transaction.type}-${transaction.id}`}
                transaction={transaction}
              />
            ))
          )}
        </List>
      )}
    </Section>
  );
};
