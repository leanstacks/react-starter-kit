import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import { PropsWithTestId } from 'common/utils/types';

/**
 * The `ButtonVariant` enumerates types of Buttons.
 */
export enum ButtonVariant {
  Solid = 'Solid',
  Outline = 'Outline',
  Text = 'Text',
}

/**
 * Properties for the `Button` component.
 * @param {ButtonVariant} [variant] - Optional. The type of Button. Default: `Primary`
 * @see {@link ButtonHTMLAttributes}
 * @see {@link PropsWithTestId}
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithTestId {
  variant?: ButtonVariant;
}

/**
 * The `Button` React componentformats and renders a styled button.
 * @param {ButtonProps} props - Component properties, `ButtonProps`.
 * @returns {JSX.Element} JSX
 */
const Button = ({
  children,
  className,
  role = 'button',
  type = 'button',
  variant = ButtonVariant.Solid,
  testId = 'button',
  ...props
}: ButtonProps): JSX.Element => {
  const getVariantClasses = (variant: ButtonVariant): string => {
    switch (variant) {
      case ButtonVariant.Outline:
        return 'border-neutral-700 dark:border-neutral-300';
      case ButtonVariant.Text:
        return 'border-transparent';
      case ButtonVariant.Solid:
      default:
        return 'border-neutral-700 bg-neutral-700 text-white dark:border-neutral-300 dark:bg-neutral-300 dark:text-neutral-900';
    }
  };

  return (
    <button
      className={classNames(
        'flex items-center justify-center rounded-md border px-2 py-1 enabled:hover:opacity-80 disabled:opacity-50',
        getVariantClasses(variant),
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


// /**
//  * The `Button` React component wraps the `Button` component from `@leanstacks/react-common`
//  * to refine the base CSS classes.
//  * @param {ButtonProps} props - Component properties, `ButtonProps`.
//  * @returns {JSX.Element} JSX
//  * @see {@link ButtonProps}
//  */
// const Button = ({ className, ...props }: ButtonProps): JSX.Element => {
//   return (
//     <CommonButton
//       className={classNames('flex items-center justify-center rounded-md', className)}
//       {...props}
//     />
//   );
// };

export default Button;
