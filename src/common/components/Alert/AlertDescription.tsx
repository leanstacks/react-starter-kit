import { PropsWithChildren } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `AlertDescription` component.
 */
export interface AlertDescriptionProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `AlertDescription` component renders the styled description text for an
 * `Alert`.
 */
const AlertDescription = ({
  children,
  className,
  testId = 'alert-description',
}: AlertDescriptionProps): JSX.Element => {
  return (
    <div className={cn('leading-tight', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default AlertDescription;
