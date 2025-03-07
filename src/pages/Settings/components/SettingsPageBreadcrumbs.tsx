import { BaseComponentProps } from 'common/utils/types';
import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';

/**
 * The `SettingsPageBreadcrumbs` component renders the `Breadcrumbs` for the settings
 * family of pages.
 */
const SettingsPageBreadcrumbs = ({
  className,
  testId = 'page-settings-breadcrumbs',
}: BaseComponentProps): JSX.Element => {
  return (
    <Breadcrumbs className={className} testId={testId}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link to="/app/settings">Settings</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
};

export default SettingsPageBreadcrumbs;
