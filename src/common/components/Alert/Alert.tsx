import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Define the component base and variant styles.
 */
const variants = cva('flex gap-2 rounded-md p-3', {
  variants: {
    variant: {
      danger: 'bg-red-800/90 text-white/80',
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
 */
export interface AlertProps extends AlertVariants, PropsWithChildren, BaseComponentProps {}

/**
 * The `Alert` component formats and renders a styled message. Use the
 * `variant` property to apply predefined styles.
 *
 * Compose an Alert using of `FAIcon`, `AlertContent`, `AlertHeader`, `AlertTitle`,
 * and `AlertDescription`.
 */
const Alert = ({
  children,
  className,
  variant = 'info',
  testId = 'alert',
}: AlertProps): JSX.Element => {
  return (
    <div className={cn(variants({ variant, className }))} role="alert" data-testid={testId}>
      {children}
    </div>
  );
};

export default Alert;
