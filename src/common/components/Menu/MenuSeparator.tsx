import classNames from 'classnames';

import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `MenuSeparator` component.
 * @see {@link BaseComponentProps}
 */
export interface MenuSeparatorProps extends BaseComponentProps {}

/**
 * The `MenuSeparator` component renders a separator to deliniate the boundary
 * between sections of a `Menu`.
 * @param {MenuSeparatorProps} props - Component properties, `MenuSeparatorProps`.
 * @returns {JSX.Element} JSX
 */
const MenuSeparator = ({
  className,
  testId = 'menu-separator',
}: MenuSeparatorProps): JSX.Element => {
  return (
    <div
      className={classNames('my-2 border-t border-neutral-500', className)}
      data-testid={testId}
    />
  );
};

export default MenuSeparator;
