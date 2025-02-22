import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

export interface AlertHeaderProps extends BaseComponentProps, PropsWithChildren {}

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
