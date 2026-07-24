/*
 * Inline stroke icons.
 *
 * Every icon inherits `currentColor` and sizes from the `size` prop, so an icon
 * placed inside a Button or Chip automatically takes that component's colour.
 * Do not give an icon its own colour — colour it by colouring its container.
 */

const Svg = ({ size = 20, children, ...rest }) => {
  return (
    <svg
      className="ui-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
};

export const IconUser = (props) => {
  return (
    <Svg {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Svg>
  );
};

export const IconMail = (props) => {
  return (
    <Svg {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </Svg>
  );
};

export const IconLock = (props) => {
  return (
    <Svg {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Svg>
  );
};

export const IconEye = (props) => {
  return (
    <Svg {...props}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  );
};

export const IconEyeOff = (props) => {
  return (
    <Svg {...props}>
      <path d="M10.6 5.2A9.9 9.9 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.2M6.2 6.2A17.4 17.4 0 0 0 2 12s3.6 7 10 7a9.8 9.8 0 0 0 4-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m2 2 20 20" />
    </Svg>
  );
};

export const IconCalendar = (props) => {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </Svg>
  );
};

export const IconClock = (props) => {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
};

export const IconChevronLeft = (props) => {
  return (
    <Svg {...props}>
      <path d="m15 18-6-6 6-6" />
    </Svg>
  );
};

export const IconChevronRight = (props) => {
  return (
    <Svg {...props}>
      <path d="m9 18 6-6-6-6" />
    </Svg>
  );
};

export const IconChevronDown = (props) => {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
};

export const IconArrowRight = (props) => {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
};

export const IconArrowUpRight = (props) => {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Svg>
  );
};

export const IconArrowDownLeft = (props) => {
  return (
    <Svg {...props}>
      <path d="M17 7 7 17M16 17H7V8" />
    </Svg>
  );
};

export const IconExchange = (props) => {
  return (
    <Svg {...props}>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 6h18" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 18H3" />
    </Svg>
  );
};

export const IconWallet = (props) => {
  return (
    <Svg {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M16 12h3" />
    </Svg>
  );
};

export const IconBank = (props) => {
  return (
    <Svg {...props}>
      <path d="M3 10h18M5 10v8M19 10v8M9 10v8M15 10v8M2 21h20M12 3 3 8h18Z" />
    </Svg>
  );
};

export const IconTag = (props) => {
  return (
    <Svg {...props}>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </Svg>
  );
};

export const IconNote = (props) => {
  return (
    <Svg {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
    </Svg>
  );
};

export const IconInfo = (props) => {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </Svg>
  );
};

export const IconCheck = (props) => {
  return (
    <Svg {...props}>
      <path d="m20 6-11 11-5-5" />
    </Svg>
  );
};

export const IconShield = (props) => {
  return (
    <Svg {...props}>
      <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
};

export const IconPlus = (props) => {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
};

export const IconX = (props) => {
  return (
    <Svg {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  );
};

export const IconSearch = (props) => {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Svg>
  );
};

export const IconTrash = (props) => {
  return (
    <Svg {...props}>
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M5 7l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13" />
      <path d="M9 7V4h6v3" />
    </Svg>
  );
};
