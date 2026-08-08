import { cx } from '../utils/index.js';
import { Pressable } from './primitives.jsx';

export const SectionHeader = ({ title, subtitle, action, className }) => {
  return (
    <div className={cx('ui-section__header', className)}>
      <div className="ui-section__titles">
        <h2 className="ui-section__title">{title}</h2>
        {subtitle ? <p className="ui-section__subtitle">{subtitle}</p> : null}
      </div>

      {action ? <div className="ui-section__action">{action}</div> : null}
    </div>
  );
};

export const Section = ({ title, subtitle, action, className, children }) => {
  return (
    <section className={cx('ui-section', className)}>
      {title ? (
        <SectionHeader title={title} subtitle={subtitle} action={action} />
      ) : null}
      {children}
    </section>
  );
};

export const List = ({ className, children }) => {
  return <div className={cx('ui-list', className)}>{children}</div>;
};

export const ListRow = ({
  leading = null,
  title,
  subtitle,
  trailing = null,
  onClick,
  className,
  ...rest
}) => {
  return (
    <Pressable
      onClick={onClick}
      className={cx('ui-list__row', onClick && 'is-interactive', className)}
      {...rest}
    >
      {leading ? <div className="ui-list__leading">{leading}</div> : null}

      <div className="ui-list__content">
        <span className="ui-list__title">{title}</span>
        {subtitle ? (
          <span className="ui-list__subtitle">{subtitle}</span>
        ) : null}
      </div>

      {trailing ? <div className="ui-list__trailing">{trailing}</div> : null}
    </Pressable>
  );
};
