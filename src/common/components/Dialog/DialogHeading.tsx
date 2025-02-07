import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `DialogHeading` component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
export interface DialogHeadingProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `DialogHeading` component serves as the container for the heading content
 * of a `Dialog`. All of the heading content should be wrapped by `DialogHeading`.
 * @param {DialogHeadingProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const DialogHeading = ({
  children,
  className,
  testId = 'dialog-heading',
}: DialogHeadingProps): JSX.Element => {
  return (
    <div className={cn('mb-4 line-clamp-2 text-2xl', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default DialogHeading;
