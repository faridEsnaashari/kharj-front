import { cx } from '../utils/index.js';
import { IconUser } from './icons.jsx';

const initialsFrom = (name) => {
  if (!name) {
    return '';
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

/*
 * Avatar falls back through image → initials → generic person glyph, so a user
 * with no photo and no name still renders at the right size instead of
 * collapsing the layout.
 */
export const Avatar = ({ name, src, size = 'md', className }) => {
  const initials = initialsFrom(name);

  return (
    <span
      className={cx('ui-avatar', `ui-avatar--${size}`, className)}
      title={name || undefined}
      role="img"
      aria-label={name || 'User'}
    >
      {src ? (
        <img className="ui-avatar__image" src={src} alt="" />
      ) : initials ? (
        <span className="ui-avatar__initials">{initials}</span>
      ) : (
        <IconUser size={16} />
      )}
    </span>
  );
};

/*
 * Overlapping avatars for shared ownership. Beyond `max`, the remainder
 * collapses into a "+N" counter rather than overflowing the row.
 */
export const AvatarStack = ({ users = [], max = 3, size = 'sm', className }) => {
  const visible = users.slice(0, max);
  const overflow = users.length - visible.length;

  return (
    <span className={cx('ui-avatar-stack', className)}>
      {visible.map((user, index) => (
        <Avatar
          key={user.id ?? user.name ?? index}
          name={user.name}
          src={user.avatar}
          size={size}
        />
      ))}

      {overflow > 0 ? (
        <span className={cx('ui-avatar', `ui-avatar--${size}`, 'ui-avatar--overflow')}>
          +{overflow}
        </span>
      ) : null}
    </span>
  );
};
