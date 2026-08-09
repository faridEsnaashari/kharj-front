import {
  ListRow,
  IconTile,
  Amount,
  Badge,
  IconBank,
} from '../../../shared/components';
import { getAccountLabel, getAccountOwnerName } from '../logic/accounts.logic';

export const AccountRow = ({ account, onClick }) => {
  return (
    <ListRow
      leading={
        <IconTile tone="accent" size="sm">
          <IconBank />
        </IconTile>
      }
      title={getAccountLabel(account)}
      subtitle={getAccountOwnerName(account)}
      onClick={() => onClick(account)}
      trailing={
        <div className="accounts-row__trailing">
          <Badge tone="neutral">P{account.priority}</Badge>
          <Amount value={account.ballance} tone="neutral" fractionDigits={0} />
        </div>
      }
    />
  );
};
