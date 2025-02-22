import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

export interface AlertTitleProps extends BaseComponentProps, PropsWithChildren {}

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
