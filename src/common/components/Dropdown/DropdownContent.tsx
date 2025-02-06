import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `DropdownContent` component.
 * @see {@link PropsWithChildren}
 * @see {@link BaseComponentProps}
 */
export interface DropdownContentProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `DropdownContent` component renders a wrapper for the content displayed
 * when a `Dropdown` is toggled to be visible.  A `Dropdown` accepts any
 * `ReactNode` for the `content` attribute; however, the `DropdownContent`
 * component provides a styled component wrapper which standardizes the
 * appearance of `Dropdown` content.
 * @param {DropdownContentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const DropdownContent = ({
  children,
  className,
  testId = 'dropdown-content',
}: DropdownContentProps): JSX.Element => {
  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-500 bg-white py-2 dark:bg-neutral-800',
        className,
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default DropdownContent;
