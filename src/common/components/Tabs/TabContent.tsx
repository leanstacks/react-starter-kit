import { PropsWithChildren } from 'react';
import { cva } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { useTabs } from 'common/hooks/useTabs';
import { cn } from 'common/utils/css';

const variants = cva('', {
  variants: {
    active: {
      true: 'block',
      false: 'hidden',
    },
  },
  defaultVariants: {
    active: false,
  },
});

/**
 * Properties for the `TabContent` React  component.
 */
export interface TabContentProps extends BaseComponentProps, PropsWithChildren {
  value: string;
}

/**
 * The `TabContent` component renders the content for a single tab.
 */
const TabContent = ({
  children,
  className,
  testId = 'tab-content',
  value,
}: TabContentProps): JSX.Element => {
  const { value: selectedTab } = useTabs();

  const active = value === selectedTab;

  return (
    <div className={cn(variants({ active, className }))} data-testid={testId}>
      {children}
    </div>
  );
};

export default TabContent;
