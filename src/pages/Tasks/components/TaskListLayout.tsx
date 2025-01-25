import { useTranslation } from 'react-i18next';

import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { BaseComponentProps } from 'common/utils/types';
import TaskList from './TaskList';

const TaskListLayout = ({
  className,
  testId = 'layout-list-task',
}: BaseComponentProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className={className} data-testid={testId}>
      {currentUser && (
        <>
          <h2 className="text-lg font-bold">{t('status.incomplete', { ns: 'tasks' })}</h2>
          <TaskList
            className="mb-4"
            userId={currentUser.id}
            filterBy={{ completed: false }}
            orderBy={['title']}
          />

          <h2 className="text-lg font-bold">{t('status.complete', { ns: 'tasks' })}</h2>
          <TaskList userId={currentUser.id} filterBy={{ completed: true }} orderBy={['title']} />
        </>
      )}
    </div>
  );
};

export default TaskListLayout;
