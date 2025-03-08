import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PropsWithTestId } from 'common/utils/types';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import Page from 'common/components/Page/Page';
import TasksPageBreadcrumbs from './components/TasksPageBreadcrumbs';
import UserInfo from './components/UserInfo';
import Card from 'common/components/Card/Card';
import FAIcon from 'common/components/Icon/FAIcon';
import Button from 'common/components/Button/Button';

/**
 * The `TasksPage` component renders the layout for the tasks family of pages.
 * It provides an `Outlet` for displaying sub-pages.
 * @param {PropsWithTestId} props - Component properties.
 * @returns JSX
 */
const TasksPage = ({ testId = 'page-tasks' }: PropsWithTestId): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUser();

  return (
    <Page testId={testId}>
      <div className="container mx-auto my-4 min-h-[75vh]">
        <TasksPageBreadcrumbs className="mb-4" />

        {/* page heading */}
        <div className="mb-4 flex items-center justify-between border-b border-neutral-500/50 pb-2">
          <h1 className="text-4xl">{t('tasks', { ns: 'tasks' })}</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="text"
              size="icon"
              title="Add task"
              onClick={() => navigate('/app/tasks/add')}
              data-testid={`${testId}-button-add`}
            >
              <FAIcon icon="plus" size="lg" fixedWidth />
            </Button>
          </div>
        </div>

        {currentUser && (
          <div data-testid={`${testId}-content`}>
            <Card className="mb-4">
              <UserInfo userId={currentUser.id} />
            </Card>

            <Outlet />
          </div>
        )}
      </div>
    </Page>
  );
};

export default TasksPage;
