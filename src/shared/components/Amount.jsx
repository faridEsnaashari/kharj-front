import { cx } from '../utils/index.js';
import { IconArrowDownLeft, IconArrowUpRight } from './icons.jsx';

/*
 * Money, rendered so that direction is legible.
 *
 * Positive is green with an inbound arrow, negative is red with an outbound
 * arrow. Keep the arrow: colour alone fails for colour-blind users, so the
 * glyph is the accessible carrier of the same information.
 *
 * `tone="neutral"` is for a *balance*, which has no direction — it drops both
 * the arrow and the sign colouring.
 *
 * Amounts arrive from the API as raw numbers (the `ballance` field and friends
 * are unformatted), so formatting happens here rather than in the caller.
 */

/*
 * Intl.NumberFormat construction is expensive, so one instance per precision
 * is created lazily and shared by every Amount on the page (module-level
 * singleton cache).
 */
const formatters = new Map();

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
  currency = '',
  tone = 'auto',
  size = 'md',
  showSign = true,
  showArrow = true,
  fractionDigits = 2,
  className,
}) => {
  const numeric = Number(value) || 0;
  const direction = numeric > 0 ? 'positive' : numeric < 0 ? 'negative' : 'zero';
  const resolvedTone = tone === 'auto' ? direction : tone;

  const directional = tone === 'auto' && direction !== 'zero';
  const sign = numeric > 0 ? '+' : '−';

  return (
    <span className={cx('ui-amount', `ui-amount--${resolvedTone}`, `ui-amount--${size}`, className)}>
      {directional && showArrow ? (
        <span className="ui-amount__arrow">
          {numeric > 0 ? <IconArrowDownLeft size={14} /> : <IconArrowUpRight size={14} />}
        </span>
      ) : null}

      <span className="ui-amount__value">
        {directional && showSign ? sign : ''}
        {formatterFor(fractionDigits).format(Math.abs(numeric))}
        {currency ? <span className="ui-amount__currency">{currency}</span> : null}
      </span>
    </span>
  );
};

/*
 * A labelled proportion bar — the per-person share rows in the allocation
 * summary. `tone` matches the Amount beside it so the row reads as one unit.
 */
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
