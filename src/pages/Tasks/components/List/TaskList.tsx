import { useTranslation } from 'react-i18next';
import { filter } from 'lodash';
import { orderBy as order } from 'lodash';
import { times } from 'lodash';

import { Task, useGetUserTasks } from 'pages/Users/api/useGetUserTasks';
import { BaseComponentProps } from 'common/utils/types';
import Alert from 'common/components/Alert/Alert';
import FAIcon from 'common/components/Icon/FAIcon';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import TaskListItem from './TaskListItem';

type OrderDir = 'asc' | 'desc';

type TaskKeys = keyof Task;

interface TaskListProps extends BaseComponentProps {
  filterBy?: Partial<Task>;
  orderBy?: TaskKeys[];
  orderDir?: OrderDir[];
  userId: number;
}

const TaskList = ({
  className,
  filterBy = {},
  orderBy = [],
  orderDir = [],
  testId = 'list-task',
  userId,
}: TaskListProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: tasks, isLoading, isError } = useGetUserTasks({ userId });
  const isEmpty = !isLoading && (!tasks || tasks?.length === 0);

  const filteredTasks = filter(tasks, filterBy);

  const orderedTasks = order(filteredTasks, orderBy, orderDir);

  return (
    <div className={className} data-testid={testId}>
      {isError && (
        <Alert variant="error" className="mb-4 rounded-none" testId={`${testId}-error`}>
          <FAIcon icon="circleExclamation" size="lg" />
          {t('errors.unable-to-retrieve')}
        </Alert>
      )}

      {isLoading && (
        <div data-testid={`${testId}-loading`}>
          {times(3, (index) => (
            <LoaderSkeleton key={`loader-${index}`} className="mb-2 h-6" />
          ))}
        </div>
      )}

      {isEmpty && <div data-testid={`${testId}-empty`}>{t('tasks-empty', { ns: 'tasks' })}</div>}

      {orderedTasks && (
        <div data-testid={`${testId}-content`}>
          {orderedTasks.map((task, index) => (
            <TaskListItem key={`task-${index}`} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
