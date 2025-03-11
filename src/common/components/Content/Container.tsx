import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Defines the `Container` component base and variant styles.
 */
const containerVariants = cva('mx-auto container', {
  variants: {
    size: {
      default: '',
      sm: 'max-w-[40rem]',
      md: 'max-w-[48rem]',
      lg: 'max-w-[64rem]',
      xl: 'max-w-[80rem]',
      '2xl': 'max-w-[96rem]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * Properties for the `Container` component.
 */
export interface ContainerProps
  extends BaseComponentProps,
    PropsWithChildren,
    VariantProps<typeof containerVariants> {}

/**
 * The `Container` component renders a block which fixes the maximum width
 * of content to a breakpoint and centers the content within the viewport.
 * By default, a `Container` sets the maximum width of the content to the
 * minimum width of the current breakpoint.
 */
const Container = ({
  children,
  className,
  size = 'default',
  testId = 'container',
}: ContainerProps): JSX.Element => {
  return (
    <div className={cn(containerVariants({ size, className }))} data-testid={testId}>
      {children}
    </div>
  );
};

export default Container;
