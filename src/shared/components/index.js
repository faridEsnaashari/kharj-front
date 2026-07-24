/*
 * The design-system barrel. Import from here, never from the individual files:
 *
 *   import { Button, Input, DateField, Card, Amount } from '../../shared/components';
 *
 * Do not hand-roll a button, input, or card inside a feature folder — if
 * something is missing, add it here so every screen gets it.
 *
 * primitives.jsx (Control, Pressable) is intentionally NOT exported: those are
 * internal building blocks for the components in this folder.
 */

export { Button, IconButton } from './Button.jsx';
export { Spinner } from './Spinner.jsx';
export { Field } from './Field.jsx';
export { Input, PasswordInput, Textarea, Select, Form, FormRow } from './Input.jsx';
export { DateField, TimeField } from './DateField.jsx';
export { Calendar } from './Calendar.jsx';
export { Card, CardHeader, CardBody, CardFooter, IconTile } from './Card.jsx';
export { Chip, ChipGroup, Badge } from './Chip.jsx';
export { Amount, ProgressBar } from './Amount.jsx';
export { Section, SectionHeader, List, ListRow } from './List.jsx';
export { SegmentedControl, Switch } from './Toggle.jsx';
export { Avatar, AvatarStack } from './Avatar.jsx';

export * from './icons.jsx';

export { cx, splitFieldProps } from '../utils/index.js';
export { useDismiss } from '../hooks/useDismiss.js';
export { CALENDARS } from '../lib/date.js';
