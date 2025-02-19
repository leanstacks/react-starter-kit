import { cva, VariantProps } from 'class-variance-authority';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Define the component base and variant styles.
 */
const variants = cva(
  'flex items-center justify-center border-b-2 px-2 py-1 text-sm font-bold uppercase cursor-pointer',
  {
    variants: {
      align: {
        start: '',
        stretch: 'grow',
      },
      isActive: {
        false: 'border-transparent',
        true: 'border-blue-300 dark:border-blue-600',
      },
    },
    defaultVariants: { align: 'start', isActive: false },
  },
);

/**
 * The variant attributes of the Tab component.
 */
type TabVariants = VariantProps<typeof variants>;

/**
 * Properties for the `Tab` React component.
 */
export interface TabProps extends BaseComponentProps, TabVariants {
  label: string;
  onClick?: () => void;
}

/**
 * The `Tab` component renders a single tab for the display of tabbed content.
 *
 * A `Tab` is typically not rendered outside of the `Tabs` component, but rather
 * the `TabProps` are supplied to the `Tabs` component so that the `Tabs` component
 * may render one or more `Tab` components.
 *
 * @param {TabProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Tab = ({
  align,
  className,
  isActive,
  label,
  onClick,
  testId = 'tab',
}: TabProps): JSX.Element => {
  /**
   * Handles tab click events.
   */
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      className={cn(variants({ align, isActive, className }))}
      onClick={handleClick}
      data-testid={testId}
    >
      {label}
    </div>
  );
};

export default Tab;
