import { RecentActivityList } from '../transaction';
import { useExchangePage } from './hooks/useExchangePage';
import { ExchangeForm } from './components/ExchangeForm';
import './styles/exchange.css';

export const Exchange = () => {
  const {
    banks,
    units,
    toBanks,
    toUnits,
    relatedUsers,
    optionsLoading,
    form,
    setField,
    setToUserId,
    fromBalance,
    toBalance,
    activityFilter,
    setActivityFilter,
    activity,
    activityLoading,
    submitting,
    submitError,
    submitSuccess,
    handleSubmit,
  } = useExchangePage();

  return (
    <div className="exchange">
      {submitError ? <p className="exchange__error">{submitError}</p> : null}
      {submitSuccess ? (
        <p className="exchange__success">Exchange created.</p>
      ) : null}

      <ExchangeForm
        banks={banks}
        units={units}
        toBanks={toBanks}
        toUnits={toUnits}
        relatedUsers={relatedUsers}
        optionsLoading={optionsLoading}
        form={form}
        setField={setField}
        setToUserId={setToUserId}
        fromBalance={fromBalance}
        toBalance={toBalance}
        submitting={submitting}
        onSubmit={handleSubmit}
      />

      <RecentActivityList
        transactions={activity.rows}
        filter={activityFilter}
        onFilterChange={setActivityFilter}
        loading={activityLoading}
      />
    </div>
  );
};
