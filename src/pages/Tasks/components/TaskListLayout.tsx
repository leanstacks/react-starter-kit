import { useTranslation } from 'react-i18next';

import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { BaseComponentProps } from 'common/utils/types';
import TaskList from './List/TaskList';

const TaskListLayout = ({
  className,
  testId = 'layout-task-list',
}: BaseComponentProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className={className} data-testid={testId}>
      {!!currentUser && (
        <>
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
