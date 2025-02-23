import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `AlertContent` component.
 */
export interface AlertContentProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `AlertContent` component is a container for the main content of an
 * `Alert`. AlertContent wraps the AlertHeader and AlertDescription.  AlertContent
 * is not used outside an `Alert`.
 */
const AlertContent = ({
  children,
  className,
  testId = 'alert-content',
}: AlertContentProps): JSX.Element => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default AlertContent;
