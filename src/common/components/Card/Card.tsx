import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `Card` React component.
 * @see {@link PropsWithChildren}
 * @see {@link BaseComponentProps}
 */
export interface CardProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Card` component renders a container for grouped, related content.
 * @param {CardProps} props - Component properties, `CardProps`.
 * @returns {JSX.Element} JSX
 */
const Card = ({ children, className, testId = 'card' }: CardProps): JSX.Element => {
  return (
    <div className={cn('rounded-lg bg-neutral-500/10 p-4', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default Card;
