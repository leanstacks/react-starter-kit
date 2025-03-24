import { PropsWithChildren } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

export interface PopoverProps extends BaseComponentProps, PropsWithChildren {}

const Popover = ({ children, className, testId = 'popover' }: PopoverProps): JSX.Element => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default Popover;
