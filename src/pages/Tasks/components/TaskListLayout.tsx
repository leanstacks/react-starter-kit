import { useTranslation } from 'react-i18next';

import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { useGetUserTasks } from 'pages/Users/api/useGetUserTasks';
import { BaseComponentProps } from 'common/utils/types';
import TaskList from './List/TaskList';
import TaskStatusDonutChart from './Chart/TaskStatusDonutChart';
import Card from 'common/components/Card/Card';

const TaskListLayout = ({
  className,
  testId = 'layout-task-list',
}: BaseComponentProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetCurrentUser();
  const { data: tasks } = useGetUserTasks({ userId: currentUser?.id });

  return (
    <div className={className} data-testid={testId}>
      {!!currentUser && (
        <>
          <div className="mb-4 grid md:grid-cols-2 lg:grid-cols-3">
            {!!tasks && (
              <Card>
                <div className="text-sm font-bold">Status of Tasks</div>
                <TaskStatusDonutChart tasks={tasks} width={160} />
              </Card>
            )}
          </div>

          <TaskList
            className="mb-4"
            userId={currentUser.id}
            filterBy={{ completed: false }}
            orderBy={['title']}
            showBadge
            title={t('status.incomplete', { ns: 'tasks' })}
          />

          <TaskList
            userId={currentUser.id}
            filterBy={{ completed: true }}
            orderBy={['title']}
            showBadge
            title={t('status.complete', { ns: 'tasks' })}
          />
        </>
      )}
    </div>
  );
};

export default TaskListLayout;
