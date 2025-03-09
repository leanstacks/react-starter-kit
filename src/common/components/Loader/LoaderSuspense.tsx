import { PropsWithChildren, Suspense } from 'react';

import LoaderSpinner from './LoaderSpinner';

/**
 * The `LoaderSuspense` component renders an animated spinning loader. Typically used
 * in the `Router` to display loading state when dynamic imports are loading.
 */
const LoaderSuspense = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <Suspense
      fallback={
        <div
          className="flex h-[50vh] items-center justify-center"
          data-testid="loader-suspense-fallback"
        >
          <LoaderSpinner text="Loading..." testId="loader-suspense-spinner" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LoaderSuspense;
