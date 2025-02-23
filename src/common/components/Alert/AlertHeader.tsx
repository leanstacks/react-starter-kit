import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `AlertHeader` component.
 */
export interface AlertHeaderProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `AlertHeader` component is a container for the title and, optionally, the
 * icon of an `Alert`. AlertHeader is a flex box ensuring the items within are evenly
 * spaced and centered.
 */
const AlertHeader = ({
  children,
  className,
  testId = 'alert-header',
}: AlertHeaderProps): JSX.Element => {
  return (
    <div className={cn('mb-1 flex items-center gap-2', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default AlertHeader;
