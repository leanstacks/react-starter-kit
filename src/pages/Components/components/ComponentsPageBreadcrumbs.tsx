import { BaseComponentProps } from 'common/utils/types';
import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';

/**
 * The `ComponentsPageBreadcrumbs` component renders the `Breadcrumbs` for the components
 * family of pages.
 */
const ComponentsPageBreadcrumbs = ({
  className,
  testId = 'page-settings-breadcrumbs',
}: BaseComponentProps): JSX.Element => {
  const location = useLocation();
  const pathElements = location.pathname.split('/');

  return (
    <Breadcrumbs className={className} testId={testId}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link to="/app/components">Components</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        {!!pathElements[3] && (
          <>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
              <Breadcrumbs.Page className="capitalize">
                {pathElements[3].replace('-', ' ')}
              </Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </>
        )}
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
};

export default ComponentsPageBreadcrumbs;
