import { useRef } from 'react';
import {
  Amount,
  Badge,
  Spinner,
  IconButton,
  IconX,
  useDismiss,
} from '../../../shared/components';
import { RecentActivityList } from '../../transaction';
import { useAccountDetailsPage } from '../hooks/useAccountDetailsPage';
import { getAccountLabel, getAccountOwnerName } from '../logic/accounts.logic';

export const AccountDetailsModal = ({ accountId, onClose }) => {
  const containerRef = useRef(null);
  useDismiss(containerRef, true, onClose);

  const {
    account,
    accountLoading,
    activityFilter,
    setActivityFilter,
    activity,
    activityLoading,
  } = useAccountDetailsPage(accountId);

  return (
    <div className="accounts-modal__backdrop">
      <div className="accounts-modal" ref={containerRef}>
        <div className="accounts-modal__header">
          <h2 className="accounts-modal__title">Account</h2>
          <IconButton label="Close" onClick={onClose}>
            <IconX size={18} />
          </IconButton>
        </div>

        {accountLoading || !account ? (
          <div className="accounts__loading">
            <Spinner size={28} />
          </div>
        ) : (
          <div className="account-details__header">
            <span className="account-details__label">
              {getAccountLabel(account)}
            </span>
            <Amount
              value={account.ballance}
              tone="neutral"
              size="lg"
              fractionDigits={0}
            />
            <div className="account-details__meta">
              <span>{getAccountOwnerName(account)}</span>
              <Badge tone="neutral">Priority {account.priority}</Badge>
            </div>
          </div>
        )}

        <RecentActivityList
          transactions={activity.rows}
          filter={activityFilter}
          onFilterChange={setActivityFilter}
          loading={activityLoading}
        />
      </div>
    </div>
  );
};
