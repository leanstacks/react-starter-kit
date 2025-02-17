import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Define the component base and variant styles.
 */
const variants = cva('flex items-center gap-2 rounded-md p-3', {
  variants: {
    variant: {
      error: 'bg-red-800/90 text-white/80',
      info: 'bg-neutral-200/90 text-slate-900',
      success: 'bg-green-800/90 text-white/80',
      warning: 'bg-amber-400/90 text-slate-900',
    },
  },
  defaultVariants: { variant: 'info' },
});

/**
 * The variant attributes of the Alert component.
 */
type AlertVariants = VariantProps<typeof variants>;

/**
 * Properties for the `Alert` component.
 * @see {@link PropsWithChildren}
 * @see {@link BaseComponentProps}
 */
export interface AlertProps extends AlertVariants, PropsWithChildren, BaseComponentProps {}

/**
 * The `Alert` React component formats and renders a styled message. Use the
 * `variant` property to apply predefined styles.
 * @param {AlertProps} props - Component properties, `AlertProps`.
 * @returns {JSX.Element} JSX
 */
const Alert = ({ children, className, variant, testId = 'alert' }: AlertProps): JSX.Element => {
  return (
    <div className={cn(variants({ variant, className }))} role="alert" data-testid={testId}>
      {children}
    </div>
  );
};

export default Alert;
