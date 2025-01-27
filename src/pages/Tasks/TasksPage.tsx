import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import Page from 'common/components/Page/Page';
import UserInfo from './components/UserInfo';
import Card from 'common/components/Card/Card';
import { PropsWithTestId } from 'common/utils/types';

const TasksPage = ({ testId = 'page-tasks' }: PropsWithTestId): JSX.Element => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetCurrentUser();

  return (
    <Page testId={testId}>
      <div className="container mx-auto my-4 min-h-[75vh]">
        <h1 className="mb-4 border-b border-neutral-500/50 pb-2 text-4xl">
          {t('tasks', { ns: 'tasks' })}
        </h1>

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
