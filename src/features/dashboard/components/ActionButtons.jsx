import {
  Card,
  IconTile,
  IconArrowUpRight,
  IconArrowDownLeft,
  IconExchange,
  IconUpload,
  IconBank,
  IconScale,
  IconList,
} from '../../../shared/components';

const noop = () => {};

const ACTIONS = [
  {
    key: 'pay',
    label: 'Pay',
    tone: 'negative',
    Icon: IconArrowUpRight,
    handlerProp: 'onPay',
  },
  {
    key: 'income',
    label: 'Income',
    tone: 'positive',
    Icon: IconArrowDownLeft,
    handlerProp: 'onIncome',
  },
  {
    key: 'transactions',
    label: 'Transactions',
    tone: 'accent',
    Icon: IconList,
    handlerProp: 'onTransactions',
  },
  {
    key: 'exchange',
    label: 'Exchange',
    tone: 'accent',
    Icon: IconExchange,
    handlerProp: 'onExchange',
  },
  {
    key: 'excelImport',
    label: 'Inbox',
    tone: 'neutral',
    Icon: IconUpload,
    handlerProp: 'onExcelImport',
  },
  {
    key: 'accounts',
    label: 'Accounts',
    tone: 'accent',
    Icon: IconBank,
    handlerProp: 'onAccounts',
  },
  {
    key: 'debts',
    label: 'Debts',
    tone: 'neutral',
    Icon: IconScale,
    handlerProp: 'onDebts',
  },
];

export const ActionButtons = ({
  onPay = noop,
  onIncome = noop,
  onExcelImport = noop,
  onTransactions = noop,
  onExchange = noop,
  onAccounts = noop,
  onDebts = noop,
}) => {
  const handlers = {
    onPay,
    onIncome,
    onExcelImport,
    onTransactions,
    onExchange,
    onAccounts,
    onDebts,
  };

  return (
    <div className="dashboard-actions">
      {ACTIONS.map((action) => (
        <Card
          key={action.key}
          className="dashboard-actions__tile"
          onClick={handlers[action.handlerProp]}
        >
          <IconTile tone={action.tone} size="lg">
            <action.Icon size={22} />
          </IconTile>
          <span className="dashboard-actions__label">{action.label}</span>
        </Card>
      ))}
    </div>
  );
};
