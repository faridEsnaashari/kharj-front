import React from 'react';

/*
 * SectionHeader / Section
 *
 * Two treatments appear across the screens:
 *   - uppercase micro-label ("SOURCE ACCOUNT", "FINANCES")   -> default
 *   - sentence-case display ("Your Accounts")                -> display
 *
 * The trailing `action` slot is the blue text link ("See all", "Clear All").
 */
export const SectionHeader = ({ title, subtitle, action, display = false, className = '' }) => (
  <div className={`visily-section-header ${className}`.trim()}>
    <div>
      <h2
        className={['visily-section-title', display && 'visily-section-title--display']
          .filter(Boolean)
          .join(' ')}
      >
        {title}
      </h2>
      {subtitle && <p className="visily-section-subtitle">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const Section = ({ title, subtitle, action, display, children, className = '' }) => (
  <section className={`visily-section ${className}`.trim()}>
    {title && (
      <SectionHeader title={title} subtitle={subtitle} action={action} display={display} />
    )}
    {children}
  </section>
);

export default SectionHeader;
