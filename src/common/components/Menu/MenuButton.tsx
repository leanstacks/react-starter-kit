import { ComponentType, useState } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { MenuProps } from './Menu';
import Button from 'common/components/Button/Button';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * Properties for the `MenuButton` component.
 * @param {ComponentType<MenuProps>} Menu - The Menu component to be rendered
 * when the button is clicked. Any component whose properties include `MenuProps`.
 * @param {string} [title] - Optional. The button title attribute value.
 * @see {@link BaseComponentProps}
 */
export interface MenuButtonProps extends BaseComponentProps {
  Menu: ComponentType<MenuProps>;
  title?: string;
}

/**
 * The `MenuButton` React component renders a `Button` which toggles rendering
 * the supplied `Menu` when clicked.
 * @param {MenuButtonProps} props - Component properties, `MenuButtonProps`.
 * @returns {JSX.Element} JSX
 */
const MenuButton = ({
  className,
  Menu,
  testId = 'button-menu',
  title = 'Menu',
}: MenuButtonProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant="text"
        size="icon"
        className={cn('text-light-text dark:text-dark-text', className)}
        onClick={() => setIsMenuOpen(true)}
        title={title}
        testId={testId}
      >
        <FAIcon icon="bars" size="xl" testId={`${testId}-icon`} />
      </Button>
      {isMenuOpen && <Menu close={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default MenuButton;
