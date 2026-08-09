import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../shared/components';
import { RecentActivityList } from '../transaction';
import { useDashboard } from './hooks/useDashboard';
import { UnitCard } from './components/UnitCard';
import { ActionButtons } from './components/ActionButtons';
import './styles/dashboard.css';

const MAX_UNIT_CARDS = 5;

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    statistic,
    activity,
    activityFilter,
    setActivityFilter,
    loading,
    activityLoading,
    error,
  } = useDashboard();

  const topUnits = statistic.slice(0, MAX_UNIT_CARDS);

  return (
    <div className="dashboard">
      {error ? <p className="dashboard__error">{error}</p> : null}

      {loading ? (
        <div className="dashboard__loading">
          <Spinner size={28} />
        </div>
      ) : (
        <div className="dashboard-cards">
          {topUnits.map((item) => (
            <UnitCard key={item.unitId} {...item} />
          ))}
        </div>
      )}

      <ActionButtons
        onPay={() => navigate('/payment')}
        onIncome={() => navigate('/income')}
        onExcelImport={() => navigate('/inbox')}
        onTransactions={() => navigate('/transactions')}
        onExchange={() => navigate('/exchange')}
        onAccounts={() => navigate('/accounts')}
        onDebts={() => navigate('/debts')}
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
