import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { BaseComponentProps } from 'common/utils/types';

/**
 * The variations of `Alert` components.
 */
export type AlertVariant = 'error' | 'info' | 'success' | 'warning';

/**
 * Properties for the `Alert` component.
 * @param {AlertVariant} [variant] - Optional. The type of Alert. Default: `info`
 * @see {@link PropsWithChildren}
 * @see {@link BaseComponentProps}
 */
export interface AlertProps extends PropsWithChildren, BaseComponentProps {
  variant?: AlertVariant;
}

/**
 * The `Alert` React component formats and renders a styled message. Use the
 * `variant` property to apply predefined styles.
 * @param {AlertProps} props - Component properties, `AlertProps`.
 * @returns {JSX.Element} JSX
 */
const Alert = ({
  children,
  className,
  variant = 'info',
  testId = 'alert',
}: AlertProps): JSX.Element => {
  const getVariantClasses = (variant: AlertVariant): string => {
    switch (variant) {
      case 'error':
        return 'bg-red-800/90 text-white/80';
      case 'warning':
        return 'bg-amber-400/90 text-slate-900';
      case 'success':
        return 'bg-green-800/90 text-white/80';
      case 'info':
      default:
        return 'bg-blue-800/90 text-white/80';
    }
  };

  return (
    <div
      className={classNames('rounded-lg p-3', getVariantClasses(variant), className)}
      role="alert"
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Alert;
