import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `DialogContent` component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
export interface DialogContentProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `DialogContent` component serves as the container for the main content
 * of a `Dialog`. All of the main body content should be wrapped by `DialogContent`.
 * @param {DialogContentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const DialogContent = ({
  children,
  className,
  testId = 'dialog-content',
}: DialogContentProps): JSX.Element => {
  return (
    <div className={cn('mb-6 mt-4 text-sm', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default DialogContent;
