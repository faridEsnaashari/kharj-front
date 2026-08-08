import { RecentActivityList } from '../transaction';
import { useIncomePage } from './hooks/useIncomePage';
import { IncomeForm } from './components/IncomeForm';
import './styles/income.css';

export const Income = () => {
  const {
    banks,
    units,
    relatedUsers,
    categories,
    optionsLoading,
    form,
    setField,
    accountBalance,
    activityFilter,
    setActivityFilter,
    activity,
    activityLoading,
    submitting,
    submitError,
    submitSuccess,
    handleSubmit,
  } = useIncomePage();

  return (
    <div className="income">
      {submitError ? <p className="income__error">{submitError}</p> : null}
      {submitSuccess ? (
        <p className="income__success">Income created.</p>
      ) : null}

      <IncomeForm
        banks={banks}
        units={units}
        relatedUsers={relatedUsers}
        categories={categories}
        optionsLoading={optionsLoading}
        form={form}
        setField={setField}
        accountBalance={accountBalance}
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
