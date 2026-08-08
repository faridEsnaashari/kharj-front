import { Select, ChipGroup } from '../../../shared/components';
import { ACTIVITY_FILTERS } from '../logic/transaction.logic.js';

const ALL_OPTION = { value: '', label: 'All' };

const toFilterOptions = (items) => [
  ALL_OPTION,
  ...items.map((item) => ({ value: item.id, label: item.name })),
];

const TYPE_OPTIONS = [
  { value: ACTIVITY_FILTERS.ALL, label: 'All' },
  { value: ACTIVITY_FILTERS.INCOME, label: 'Income' },
  { value: ACTIVITY_FILTERS.PAYMENT, label: 'Pay' },
];

export const TransactionFilters = ({
  banks,
  units,
  relatedUsers,
  optionsLoading,
  filters,
  setFilter,
}) => {
  return (
    <div className="transactions-filters">
      <ChipGroup
        options={TYPE_OPTIONS}
        value={filters.type}
        onChange={(value) => setFilter('type', value)}
      />

      <div className="transactions-filters__selects">
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
    </div>
  );
};
