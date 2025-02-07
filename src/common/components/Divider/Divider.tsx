import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `Divider` component.
 * @see {@link BaseComponentProps}
 */
export interface DividerProps extends BaseComponentProps {}

/**
 * The `Divider` component renders a horizontal line which visually separates
 * content.
 * @param {DividerProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Divider = ({ className, testId = 'divider' }: DividerProps): JSX.Element => {
  return (
    <div
      className={cn('h-0 w-full border-t border-neutral-500/50', className)}
      data-testid={testId}
    ></div>
  );
};

export default Divider;
