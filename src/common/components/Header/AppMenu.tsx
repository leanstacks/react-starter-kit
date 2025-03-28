import { useAuth } from 'common/hooks/useAuth';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { useTranslation } from 'react-i18next';

import logo from 'assets/img/logo.png';
import SideMenu, { SideMenuProps } from 'common/components/Menu/SideMenu/SideMenu';
import MenuNavLink from 'common/components/Menu/MenuNavLink';
import Avatar from 'common/components/Icon/Avatar';
import MenuSeparator from 'common/components/Menu/MenuSeparator';

/**
 * Properties fro the `AppMenu` component.
 * @see {@see SideMenuProps}
 */
export interface AppMenuProps extends Omit<SideMenuProps, 'headerContent'> {}

/**
 * The `AppMenu` component a `SideMenu` which contains application menu
 * items. The `AppMenu` is typically rendered at small media breakpoints.
 * @param {AppMenuProps} props - Component properties, `AppMenuProps`.
 * @returns {JSX.Element} JSX
 */
const AppMenu = ({ side = 'right', testId = 'menu-app', ...props }: AppMenuProps): JSX.Element => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { data: user } = useGetCurrentUser();

  const renderHeader = () => {
    if (isAuthenticated && user) {
      return (
        <div className="flex items-center">
          <Avatar value={user.name} className="me-2 rounded-full" />
          <div className="text-sm">{user.name}</div>
        </div>
      );
    } else {
      return <img src={logo} alt="Logo" height="32" width="32" />;
    }
  };

  return (
    <SideMenu side={side} testId={testId} headerContent={renderHeader()} {...props}>
      {isAuthenticated ? (
        <>
          <MenuNavLink to="/auth/signout" title="Sign Out" icon="rightFromBracket">
            Sign Out
          </MenuNavLink>
          <MenuSeparator />
          <MenuNavLink to="/app/settings" title="Settings" icon="sliders">
            Settings
          </MenuNavLink>
          <MenuNavLink to="/pub/components" title="Components" icon="puzzlePiece">
            Components
          </MenuNavLink>
          <MenuNavLink to="/app/tasks" title={t('tasks', { ns: 'tasks' })} icon="listCheck">
            {t('tasks', { ns: 'tasks' })}
          </MenuNavLink>
        </>
      ) : (
        <>
          <MenuNavLink to="/auth/signin" title="Sign In" icon="rightToBracket">
            Sign In
          </MenuNavLink>
          <MenuNavLink to="/auth/signin" title="Sign Up" className="text-xs">
            Need an account? Sign Up
          </MenuNavLink>
          <MenuSeparator />
          <MenuNavLink to="/pub/components" title="Components" icon="puzzlePiece">
            Components
          </MenuNavLink>
        </>
      )}
    </SideMenu>
  );
};

export default AppMenu;
