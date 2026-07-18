import React from 'react';

/*
 * Avatar / AvatarStack
 *
 * Falls back to initials when there is no image — the account cards show a
 * face per shared owner, and a broken image there would read as missing data.
 */

const initialsOf = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export const Avatar = ({ src, name = '', size = 'md', className = '', ...rest }) => (
  <span
    className={['visily-avatar', size !== 'md' && `visily-avatar--${size}`, className]
      .filter(Boolean)
      .join(' ')}
    title={name || undefined}
    {...rest}
  >
    {src ? <img src={src} alt={name} /> : <span aria-hidden="true">{initialsOf(name)}</span>}
    {!src && name && <span className="visily-sr-only">{name}</span>}
  </span>
);

/*
 * Overlapping row of owners. `max` caps how many faces render before a
 * "+N" counter takes over, so a widely-shared account cannot overflow the card.
 */
export const AvatarStack = ({ people = [], max = 3, size = 'sm', className = '' }) => {
  const visible = people.slice(0, max);
  const overflow = people.length - visible.length;

  return (
    <span className={`visily-avatar-stack ${className}`.trim()}>
      {visible.map((person, index) => (
        <Avatar
          key={person.id ?? person.name ?? index}
          src={person.src}
          name={person.name}
          size={size}
        />
      ))}
      {overflow > 0 && (
        <span
          className={['visily-avatar', size !== 'md' && `visily-avatar--${size}`]
            .filter(Boolean)
            .join(' ')}
        >
          +{overflow}
        </span>
      )}
    </span>
  );
};

export default Avatar;
