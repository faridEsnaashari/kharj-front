import { cx } from '../utils/index.js';
import { IconArrowDownLeft, IconArrowUpRight } from './icons.jsx';
import { toDisplayAmount, isRialUnit } from '../lib/currency.js';

const formatters = new Map();
const exactFormatter = new Intl.NumberFormat();

const formatterFor = (fractionDigits) => {
  if (!formatters.has(fractionDigits)) {
    formatters.set(
      fractionDigits,
      new Intl.NumberFormat(undefined, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }),
    );
  }

  return formatters.get(fractionDigits);
};

export const Amount = ({
  value,
  unit,
  currency = '',
  tone = 'auto',
  size = 'md',
  showSign = true,
  showArrow = true,
  showExact = true,
  fractionDigits = 2,
  className,
}) => {
  const numeric = toDisplayAmount(value, unit);
  const direction =
    numeric > 0 ? 'positive' : numeric < 0 ? 'negative' : 'zero';
  const resolvedTone = tone === 'auto' ? direction : tone;

  const directional = tone === 'auto' && direction !== 'zero';
  const sign = numeric > 0 ? '+' : '−';

  const amount = (
    <span
      className={cx(
        'ui-amount',
        `ui-amount--${resolvedTone}`,
        `ui-amount--${size}`,
        className,
      )}
    >
      {directional && showArrow ? (
        <span className="ui-amount__arrow">
          {numeric > 0 ? (
            <IconArrowDownLeft size={14} />
          ) : (
            <IconArrowUpRight size={14} />
          )}
        </span>
      ) : null}

      <span className="ui-amount__value">
        {directional && showSign ? sign : ''}
        {formatterFor(fractionDigits).format(Math.abs(numeric))}
        {currency ? (
          <span className="ui-amount__currency">{currency}</span>
        ) : null}
      </span>
    </span>
  );

  if (!showExact || !isRialUnit(unit)) {
    return amount;
  }

  return (
    <span className="ui-amount-wrap">
      {amount}
      <span className="ui-amount__exact">
        {exactFormatter.format(Math.abs(Number(value) || 0))}
      </span>
    </span>
  );
};

export const ProgressBar = ({
  value = 0,
  max = 100,
  tone = 'accent',
  label,
  className,
}) => {
  const safeMax = max > 0 ? max : 1;
  const percent = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div
      className={cx('ui-progress', `ui-progress--${tone}`, className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={label}
    >
      <span className="ui-progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
};
