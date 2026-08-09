import {
  Section,
  List,
  Spinner,
  IconButton,
  IconPlus,
  useIntersectionLoadMore,
} from '../../shared/components';
import { useAccountsPage } from './hooks/useAccountsPage';
import { AccountFilters } from './components/AccountFilters';
import { AccountRow } from './components/AccountRow';
import { CreateAccountModal } from './components/CreateAccountModal';
import { AccountDetailsModal } from './components/AccountDetailsModal';
import './styles/accounts.css';

export const Accounts = () => {
  const {
    accounts,
    total,
    accountsLoading,
    loadingMore,
    hasMore,
    loadMore,
    banks,
    units,
    relatedUsers,
    optionsLoading,
    filters,
    setFilter,
    createOpen,
    openCreate,
    closeCreate,
    form,
    setField,
    submitting,
    handleCreateSubmit,
    selectedAccountId,
    openDetails,
    closeDetails,
    error,
  } = useAccountsPage();

  const sentinelRef = useIntersectionLoadMore({
    onLoadMore: loadMore,
    hasMore,
    loading: loadingMore,
  });

  return (
    <div className="accounts">
      {error ? <p className="accounts__error">{error}</p> : null}

      <AccountFilters
        banks={banks}
        units={units}
        relatedUsers={relatedUsers}
        optionsLoading={optionsLoading}
        filters={filters}
        setFilter={setFilter}
      />

      <Section title={`Accounts (${total})`}>
        {accountsLoading ? (
          <div className="accounts__loading">
            <Spinner size={24} />
          </div>
        ) : (
          <List>
            {accounts.length === 0 ? (
              <p className="accounts__empty">No accounts yet.</p>
            ) : (
              accounts.map((account) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  onClick={openDetails}
                />
              ))
            )}
          </List>
        )}

        {hasMore ? (
          <div ref={sentinelRef} className="accounts__sentinel">
            {loadingMore ? <Spinner size={20} /> : null}
          </div>
        ) : null}
      </Section>

      <div className="accounts-fab-wrapper">
        <IconButton
          label="New Account"
          variant="primary"
          className="accounts-fab"
          onClick={openCreate}
        >
          <IconPlus size={22} />
        </IconButton>
      </div>

      {createOpen ? (
        <CreateAccountModal
          banks={banks}
          units={units}
          relatedUsers={relatedUsers}
          optionsLoading={optionsLoading}
          form={form}
          setField={setField}
          submitting={submitting}
          onSubmit={handleCreateSubmit}
          onClose={closeCreate}
        />
      ) : null}

      {selectedAccountId ? (
        <AccountDetailsModal
          accountId={selectedAccountId}
          onClose={closeDetails}
        />
      ) : null}
    </div>
  );
};
