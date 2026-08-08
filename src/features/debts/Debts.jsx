import {
  Section,
  List,
  Spinner,
  SegmentedControl,
  Card,
  CardBody,
  Amount,
  useIntersectionLoadMore,
} from '../../shared/components';
import { useDebtsPage } from './hooks/useDebtsPage';
import { DebtFilters } from './components/DebtFilters';
import { DebtSummaryRow } from './components/DebtSummaryRow';
import { DebtHistoryRow } from './components/DebtHistoryRow';
import { DEBT_TAB_OPTIONS, DEBT_TABS } from './logic/debts.logic';
import './styles/debts.css';

export const Debts = () => {
  const {
    tab,
    setTab,
    groupBy,
    setGroupBy,
    filters,
    setFilter,
    banks,
    units,
    relatedUsers,
    optionsLoading,
    currentUserId,
    summary,
    summaryLoading,
    historyRows,
    historyTotal,
    historyLoading,
    historyLoadingMore,
    historyHasMore,
    loadMoreHistory,
    error,
  } = useDebtsPage();

  const sentinelRef = useIntersectionLoadMore({
    onLoadMore: loadMoreHistory,
    hasMore: historyHasMore,
    loading: historyLoadingMore,
  });

  return (
    <div className="debts">
      <h1 className="debts__title">Debts</h1>

      {error ? <p className="debts__error">{error}</p> : null}

      <div className="debts-totals">
        <Card className="debts-totals__card">
          <CardBody className="debts-totals__body">
            <span className="debts-totals__label">Owed to you</span>
            <Amount
              value={summary?.totals?.owedToYou ?? 0}
              tone="positive"
              size="lg"
            />
          </CardBody>
        </Card>

        <Card className="debts-totals__card">
          <CardBody className="debts-totals__body">
            <span className="debts-totals__label">You owe</span>
            <Amount
              value={summary?.totals?.youOwe ?? 0}
              tone="negative"
              size="lg"
            />
          </CardBody>
        </Card>
      </div>

      <SegmentedControl
        options={DEBT_TAB_OPTIONS}
        value={tab}
        onChange={setTab}
      />

      <DebtFilters
        tab={tab}
        banks={banks}
        units={units}
        relatedUsers={relatedUsers}
        currentUserId={currentUserId}
        optionsLoading={optionsLoading}
        filters={filters}
        setFilter={setFilter}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
      />

      {tab === DEBT_TABS.SUMMARY ? (
        <Section title="Active Balances">
          {summaryLoading ? (
            <div className="debts__loading">
              <Spinner size={24} />
            </div>
          ) : (
            <List>
              {summary?.rows?.length ? (
                summary.rows.map((row, index) => (
                  <DebtSummaryRow
                    key={index}
                    row={row}
                    currentUserId={currentUserId}
                  />
                ))
              ) : (
                <p className="debts__empty">No active balances.</p>
              )}
            </List>
          )}
        </Section>
      ) : (
        <Section title={`History (${historyTotal})`}>
          {historyLoading ? (
            <div className="debts__loading">
              <Spinner size={24} />
            </div>
          ) : (
            <List>
              {historyRows.length ? (
                historyRows.map((row) => (
                  <DebtHistoryRow
                    key={row.id}
                    row={row}
                    currentUserId={currentUserId}
                  />
                ))
              ) : (
                <p className="debts__empty">No debts yet.</p>
              )}
            </List>
          )}

          {historyHasMore ? (
            <div ref={sentinelRef} className="debts__sentinel">
              {historyLoadingMore ? <Spinner size={20} /> : null}
            </div>
          ) : null}
        </Section>
      )}
    </div>
  );
};
