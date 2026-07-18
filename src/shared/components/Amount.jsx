import React from 'react';
import { ArrowDownLeftIcon, ArrowUpRightIcon } from './icons';

/*
 * Amount
 *
 * Signed currency figure. Direction is the meaning — money in is green with an
 * inbound arrow, money out is red with an outbound arrow. The arrow is not
 * decoration: it is what makes the sign legible without relying on colour, so
 * leave `showArrow` on unless the surrounding row already states the direction.
 *
 * `value` is a raw number (the DB stores amounts unformatted) and is rendered
 * with tabular figures so columns of amounts line up.
 */
const Amount = ({
  value = 0,
  currency = '',
  signed = true,
  showArrow = true,
  size = 'md',
  tone,
  locale = 'en-US',
  className = '',
  ...rest
}) => {
  const numeric = Number(value) || 0;
  const isPositive = numeric > 0;
  const isNegative = numeric < 0;

  // An explicit `tone` wins — a balance is neither incoming nor outgoing, so
  // callers need a way to render it neutral regardless of sign.
  const resolvedTone = tone || (isPositive ? 'positive' : isNegative ? 'negative' : 'neutral');

  const formatted = Math.abs(numeric).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const sign = signed && isPositive ? '+' : signed && isNegative ? '-' : '';

  return (
    <span
      className={[
        'visily-amount',
        `visily-amount--${resolvedTone}`,
        size !== 'md' && `visily-amount--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {showArrow && isPositive && <ArrowDownLeftIcon size={14} />}
      {showArrow && isNegative && <ArrowUpRightIcon size={14} />}
      <span>
        {sign}
        {currency}
        {formatted}
      </span>
    </span>
  );
};

export default Amount;
