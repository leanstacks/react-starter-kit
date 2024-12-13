import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { BaseComponentProps } from 'common/utils/types';
import { useSettings } from 'common/hooks/useSettings';

/**
 * Properties for the `Theme` component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
interface ThemeProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Theme` component uses the user settings (preferences) and renders the
 * CSS for the preferred theme.
 * @param props - Component properties, `ThemeProps`.
 * @returns {JSX.Element} JSX
 */
const Theme = ({ className, children, testId = 'theme' }: ThemeProps): JSX.Element => {
  const settings = useSettings();

  return (
    <div className={settings.theme} data-testid={testId}>
      <div
        className={classNames(
          'min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Theme;
