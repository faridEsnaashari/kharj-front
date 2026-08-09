import { RecentActivityList } from '../transaction';
import { usePaymentPage } from './hooks/usePaymentPage';
import { PaymentForm } from './components/PaymentForm';
import './styles/payment.css';

export const Payment = () => {
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
  } = usePaymentPage();

  return (
    <div className="payment">
      {submitError ? <p className="payment__error">{submitError}</p> : null}
      {submitSuccess ? (
        <p className="payment__success">Payment created.</p>
      ) : null}

      <PaymentForm
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
