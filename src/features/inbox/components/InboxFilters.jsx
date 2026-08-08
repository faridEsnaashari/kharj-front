import { Select } from '../../../shared/components';

const ALL_OPTION = { value: '', label: 'All' };

const toFilterOptions = (items) => [
  ALL_OPTION,
  ...items.map((item) => ({ value: item.id, label: item.name })),
];

export const InboxFilters = ({ banks, optionsLoading, bankId, setBankId }) => {
  return (
    <div className="inbox-filters">
      <Select
        label="Bank"
        disabled={optionsLoading}
        options={toFilterOptions(banks)}
        value={bankId}
        onChange={(e) => setBankId(e.target.value)}
      />
    </div>
  );
};
