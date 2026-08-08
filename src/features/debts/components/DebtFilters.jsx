import { Select, SegmentedControl } from '../../../shared/components';
import {
  DEBT_TABS,
  DEBT_GROUP_BY_OPTIONS,
  DEBT_DIRECTION_OPTIONS,
  DEBT_DIRECTIONS,
} from '../logic/debts.logic';

const ALL_OPTION = { value: '', label: 'All' };

const toFilterOptions = (items) => [
  ALL_OPTION,
  ...items.map((item) => ({ value: item.id, label: item.name })),
];

export const DebtFilters = ({
  tab,
  banks,
  units,
  relatedUsers,
  currentUserId,
  optionsLoading,
  filters,
  setFilter,
  groupBy,
  setGroupBy,
}) => {
  const counterpartyOptions = toFilterOptions(
    relatedUsers.filter((relatedUser) => relatedUser.id !== currentUserId),
  );

  return (
    <div className="debts-filters">
      <div className="debts-filters__row">
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
      </div>

      {tab === DEBT_TABS.SUMMARY ? (
        <SegmentedControl
          label="Group by"
          options={DEBT_GROUP_BY_OPTIONS}
          value={groupBy}
          onChange={setGroupBy}
        />
      ) : (
        <>
          <SegmentedControl
            label="Direction"
            options={DEBT_DIRECTION_OPTIONS}
            value={filters.direction}
            onChange={(value) => setFilter('direction', value)}
          />

          <Select
            label="With"
            disabled={
              optionsLoading || filters.direction === DEBT_DIRECTIONS.ALL
            }
            options={counterpartyOptions}
            value={filters.counterpartyId}
            onChange={(e) => setFilter('counterpartyId', e.target.value)}
          />
        </>
      )}
    </div>
  );
};
