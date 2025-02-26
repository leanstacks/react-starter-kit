import { PropsWithChildren } from 'react';
import { cva } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { useTabs } from 'common/hooks/useTabs';
import { cn } from 'common/utils/css';
import Button from '../Button/Button';

/**
 * Defines the component base and variant styles.
 */
const variants = cva('rounded-none border-0 border-b-2 px-4 text-sm font-bold uppercase', {
  variants: {
    active: {
      false: 'border-transparent',
      true: 'border-blue-300 dark:border-blue-600',
    },
  },
  defaultVariants: {
    active: false,
  },
});

/**
 * Properties for the `Tab` component.
 */
export interface TabProps extends BaseComponentProps, PropsWithChildren {
  value: string;
}

/**
 * The `Tab` component renders a clickable tab button which, when clicked,
 * displays the associated tab content.
 *
 * Note: The `Tab` and its associated `TabContent` must have the same `value`
 * property value.
 */
const Tab = ({ children, className, testId = 'tab', value }: TabProps): JSX.Element => {
  const { value: selectedTab, setValue } = useTabs();

  const active = value === selectedTab;

  return (
    <Button
      variant="text"
      className={cn(variants({ active, className }))}
      onClick={() => setValue(value)}
      testId={testId}
    >
      {children}
    </Button>
  );
};

export default Tab;
