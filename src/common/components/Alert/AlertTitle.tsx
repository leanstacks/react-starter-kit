import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `AlertTitle` component.
 */
export interface AlertTitleProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `AlertTitle` component renders the styled title text for an `Alert`.
 * AlertTitle is always within an `AlertHeader`.
 */
const AlertTitle = ({
  children,
  className,
  testId = 'alert-title',
}: AlertTitleProps): JSX.Element => {
  return (
    <div className={cn('text-xl leading-none font-bold', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default AlertTitle;
