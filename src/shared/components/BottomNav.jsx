import { NavLink } from 'react-router-dom';
import { cx } from '../utils/index.js';

export const BottomNav = ({ tabs }) => {
  return (
    <nav className="ui-bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) =>
            cx('ui-bottom-nav__tab', isActive && 'is-active')
          }
        >
          <tab.icon size={22} />
          <span className="ui-bottom-nav__label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
