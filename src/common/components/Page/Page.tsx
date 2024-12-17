import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `Page` React component.
 * @see {@link PropsWithChildren}
 * @see {@link BaseComponentProps}
 */
export interface PageProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Page` component renders a standardized styled page-level block.
 * @param {PageProps} - Component properties.
 * @returns {JSX.Element} JSX
 */
const Page = ({ children, className, testId = 'page' }: PageProps): JSX.Element => {
  return (
    <div className={classNames('px-2 sm:px-8', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default Page;
