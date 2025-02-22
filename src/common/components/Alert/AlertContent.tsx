import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

export interface AlertContentProps extends BaseComponentProps, PropsWithChildren {}

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
