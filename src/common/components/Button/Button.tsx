import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import { PropsWithTestId } from 'common/utils/types';

/**
 * The variations of `Button` components.
 */
export type ButtonVariant = 'solid' | 'outline' | 'text';

/**
 * Properties for the `Button` component.
 * @param {ButtonVariant} [variant] - Optional. The type of Button. Default: `solid`
 * @see {@link ButtonHTMLAttributes}
 * @see {@link PropsWithTestId}
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithTestId {
  variant?: ButtonVariant;
}

/**
 * The `Button` React component formats and renders a styled button.
 * @param {ButtonProps} props - Component properties, `ButtonProps`.
 * @returns {JSX.Element} JSX
 */
const Button = ({
  children,
  className,
  role = 'button',
  type = 'button',
  variant = 'solid',
  testId = 'button',
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(
        'flex items-center justify-center rounded-md border px-2 py-1 enabled:hover:opacity-80 disabled:opacity-50',
        {
          'border-neutral-700 bg-neutral-700 text-white dark:border-neutral-300 dark:bg-neutral-300 dark:text-neutral-900':
            variant === 'solid',
          'border-neutral-700 dark:border-neutral-300': variant === 'outline',
          'border-transparent': variant === 'text',
        },
        className,
      )}
      data-testid={testId}
      role={role}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
