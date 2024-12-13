import classNames from 'classnames';

import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `LoaderSkeleton` component.
 * @see {@link BaseComponentProps}
 */
export interface LoaderSkeletonProps extends BaseComponentProps {}

/**
 * The `LoaderSkeleton` component renders an animated loader which pulses
 * faintly. Typically used when initially loading some data asynchronously.
 * @param {LoaderSkeletonProps} [props] - Component properties, `LoaderSkeletonProps`.
 * @returns {JSX.Element} JSX
 */
const LoaderSkeleton = ({
  className,
  testId = 'loader-skeleton',
}: LoaderSkeletonProps): JSX.Element => {
  return (
    <div
      className={classNames(
        'animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700',
        className,
      )}
      data-testid={testId}
    />
  );
};

export default LoaderSkeleton;
