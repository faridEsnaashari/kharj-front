import { cx } from '../utils/index.js';

export const Filters = ({ className, children }) => {
  return <div className={cx('ui-filters', className)}>{children}</div>;
};
