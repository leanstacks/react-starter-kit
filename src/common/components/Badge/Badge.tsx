import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `Badge` React component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
export interface BadgeProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Badge` component highlights a notification, a count, or a piece status
 * information.
 * @param {BadgeProps} props - Component properties.
 * @returns JSX
 */
const Badge = ({ children, className, testId = 'badge' }: BadgeProps): JSX.Element => {
  return (
    <div
      className={cn(
        'rounded-full bg-red-600 px-1 py-0.5 text-[10px] font-bold leading-none text-white dark:bg-red-700 dark:opacity-75',
        className,
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Badge;
