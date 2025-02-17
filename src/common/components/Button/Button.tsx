import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { PropsWithTestId } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Define the component base and variant styles.
 */
const variants = cva(
  'flex items-center justify-center gap-2 rounded-md border px-2 py-1 enabled:hover:opacity-80 disabled:opacity-50',
  {
    variants: {
      variant: {
        solid:
          'border-neutral-700 bg-neutral-700 text-white dark:border-neutral-300 dark:bg-neutral-300 dark:text-neutral-900',
        outline: 'border-neutral-700 dark:border-neutral-300',
        text: 'border-transparent',
      },
    },
    defaultVariants: { variant: 'solid' },
  },
);

/**
 * The variant attributes of the Button component.
 */
type ButtonVariants = VariantProps<typeof variants>;

/**
 * Properties for the `Button` component.
 * @see {@link ButtonHTMLAttributes}
 * @see {@link ButtonVariants}
 * @see {@link PropsWithTestId}
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants,
    PropsWithTestId {}

/**
 * The `Button` React component formats and renders a styled button.
 * @param {ButtonProps} props - Component properties, `ButtonProps`.
 * @returns {JSX.Element} JSX
 */
const Button = ({
  className,
  role = 'button',
  type = 'button',
  variant,
  testId = 'button',
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(variants({ variant, className }))}
      data-testid={testId}
      role={role}
      type={type}
      {...props}
    />
  );
};

export default Button;
