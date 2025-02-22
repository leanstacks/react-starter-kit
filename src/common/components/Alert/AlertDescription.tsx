import { PropsWithChildren } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

export interface AlertDescriptionProps extends BaseComponentProps, PropsWithChildren {}

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
