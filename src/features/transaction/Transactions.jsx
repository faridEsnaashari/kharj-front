import {
  Section,
  List,
  Spinner,
  useIntersectionLoadMore,
} from '../../shared/components';
import { useTransactionsPage } from './hooks/useTransactionsPage.js';
import { TransactionFilters } from './components/TransactionFilters.jsx';
import { TransactionRow } from './components/TransactionRow.jsx';
import './styles/transaction.css';

export const Transactions = () => {
  const {
    transactions,
    total,
    transactionsLoading,
    loadingMore,
    hasMore,
    loadMore,
    banks,
    units,
    relatedUsers,
    optionsLoading,
    filters,
    setFilter,
    error,
  } = useTransactionsPage();

  const sentinelRef = useIntersectionLoadMore({
    onLoadMore: loadMore,
    hasMore,
    loading: loadingMore,
  });

  return (
    <div className="transactions">
      {error ? <p className="transactions__error">{error}</p> : null}

      <TransactionFilters
        banks={banks}
        units={units}
        relatedUsers={relatedUsers}
        optionsLoading={optionsLoading}
        filters={filters}
        setFilter={setFilter}
      />

      <Section title={`Transactions (${total})`}>
        {transactionsLoading ? (
          <div className="transactions__loading">
            <Spinner size={24} />
          </div>
        ) : (
          <List>
            {transactions.length === 0 ? (
              <p className="transactions__empty">No transactions yet.</p>
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

        {hasMore ? (
          <div ref={sentinelRef} className="transactions__sentinel">
            {loadingMore ? <Spinner size={20} /> : null}
          </div>
        ) : null}
      </Section>
    </div>
  );
};
