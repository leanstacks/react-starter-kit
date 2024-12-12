import { NavLink, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';

import { PropsWithTestId } from 'common/utils/types';
import FAIcon, { FAIconProps } from 'common/components/Icon/FAIcon';
import { PropsWithChildren } from 'react';

/**
 * Properties for the `MenuNavLink` component.
 * @param {string} [iconClassName] - Optional. Additional CSS classes to apply
 * to the `Icon`.
 * @param {boolean} [styleActive] - Optional. Indicates if active `NavLink` styles
 * should be applied. Default: `false`.
 * @see {@link NavLinkProps}
 * @see {@link FAIconProps}
 * @see {@link PropsWithTestId}
 */
interface MenuNavLinkProps
  extends Omit<NavLinkProps, 'children'>,
    Partial<Pick<FAIconProps, 'icon'>>,
    PropsWithChildren,
    PropsWithTestId {
  iconClassName?: string;
  styleActive?: boolean;
}

/**
 * `NavLinkRenderProps` from `react-router-dom`. Not exported.
 */
type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

/**
 * The `MenuNavLink` React component renders a `NavLink` with optional `Icon`.
 * For use within a `Menu` implementation, e.g. `SideMenu`.
 * @param {MenuNavLinkProps} props - Component properties, `MenuNavLinkProps`.
 * @returns {JSX.Element} JSX
 */
const MenuNavLink = ({
  children,
  className,
  icon,
  iconClassName,
  styleActive = false,
  testId = 'menu-navlink',
  ...props
}: MenuNavLinkProps): JSX.Element => {
  /**
   * Returns the list of class names to apply to the `NavLink`.
   * @param props - A `NavLinkRenderProps` object indicating the current state of the `NavLink`.
   * @returns {string | undefined} A string or `undefined` space separated list of class names.
   */
  const getClassName = (props: NavLinkRenderProps): string => {
    const classNameFromProps = typeof className === 'function' ? className(props) : className;

    return classNames(
      'flex items-center rounded-md px-2 py-1.5 text-sm hover:bg-neutral-500/25',
      { 'bg-neutral-500/10 hover:!bg-neutral-500/10': styleActive && props.isActive },
      classNameFromProps,
    );
  };

  return (
    <NavLink className={getClassName} data-testid={testId} {...props}>
      <>
        {icon && (
          <FAIcon
            icon={icon}
            size="lg"
            className={classNames('me-2', iconClassName)}
            testId={`${testId}-icon`}
          />
        )}
        {children}
      </>
    </NavLink>
  );
};

export default MenuNavLink;
