import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Defines the component base and variant styles.
 */
const variants = cva('flex gap-4 border-b border-b-neutral-500/10', {
  variants: {
    align: {
      stretch: '*:grow',
      start: 'flex',
    },
  },
  defaultVariants: { align: 'start' },
});

/**
 * The variant attributes of the TabList component.
 */
type TabListVariants = VariantProps<typeof variants>;

/**
 * Properties for the `TabList` component.
 */
export interface TabListProps extends BaseComponentProps, PropsWithChildren, TabListVariants {}

/**
 * The `TabList` component is a container for one to many `Tab` components. It
 * renders a horizontal bar of clickable tab labels.
 */
const TabList = ({
  align = 'start',
  children,
  className,
  testId = 'tab-list',
}: TabListProps): JSX.Element => {
  return (
    <div className={cn(variants({ align, className }))} data-testid={testId}>
      {children}
    </div>
  );
};

export default TabList;
