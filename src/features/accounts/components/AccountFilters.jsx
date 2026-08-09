import { Select } from '../../../shared/components';

const ALL_OPTION = { value: '', label: 'All' };

const toFilterOptions = (items) => [
  ALL_OPTION,
  ...items.map((item) => ({ value: item.id, label: item.name })),
];

export const AccountFilters = ({
  banks,
  units,
  relatedUsers,
  optionsLoading,
  filters,
  setFilter,
}) => {
  return (
    <div className="accounts-filters">
      <Select
        label="Bank"
        disabled={optionsLoading}
        options={toFilterOptions(banks)}
        value={filters.bankId}
        onChange={(e) => setFilter('bankId', e.target.value)}
      />

      <Select
        label="Unit"
        disabled={optionsLoading}
        options={toFilterOptions(units)}
        value={filters.unitId}
        onChange={(e) => setFilter('unitId', e.target.value)}
      />

      <Select
        label="Owner"
        disabled={optionsLoading}
        options={toFilterOptions(relatedUsers)}
        value={filters.ownedBy}
        onChange={(e) => setFilter('ownedBy', e.target.value)}
      />
    </div>
  );
};
