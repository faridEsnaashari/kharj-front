export const RIAL_UNIT_SYMBOL = 'RIAL';
export const RIAL_DISPLAY_SCALE = 10000;

export const isRialUnit = (unit) => unit?.symbol === RIAL_UNIT_SYMBOL;

export const toDisplayAmount = (value, unit) => {
  const numeric = Number(value) || 0;

  return isRialUnit(unit) ? numeric / RIAL_DISPLAY_SCALE : numeric;
};

const hintFormatter = new Intl.NumberFormat();

export const getAmountHint = (rawValue, unit) => {
  if (!isRialUnit(unit)) {
    return null;
  }

  const numeric = Number(rawValue);

  if (rawValue === '' || rawValue === null || Number.isNaN(numeric)) {
    return null;
  }

  return `≈ ${hintFormatter.format(numeric / RIAL_DISPLAY_SCALE)}`;
};
