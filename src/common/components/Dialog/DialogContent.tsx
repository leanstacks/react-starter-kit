import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { BaseComponentProps } from 'common/utils/types';

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
    <div className={classNames('mb-6 mt-4 text-sm', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default DialogContent;
