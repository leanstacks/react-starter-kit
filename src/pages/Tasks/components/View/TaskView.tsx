import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Users/api/useGetUserTasks';
import { useGetUser } from 'common/api/useGetUser';
import Badge from 'common/components/Badge/Badge';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

interface TaskViewProps extends BaseComponentProps {
  task: Task;
}

const TaskView = ({ className, task, testId = 'task-view' }: TaskViewProps): JSX.Element => {
  const { t } = useTranslation();
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUser({ userId: task.userId });

  return (
    <div className={className} data-testid={testId}>
      <div className="mt-4">
        <div className="text-xs font-bold uppercase">Title</div>
        <div className="text-lg" data-testid={`${testId}-title`}>
          {task.title}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-bold uppercase">Assignee</div>
        <div>
          {isLoadingUser && (
            <LoaderSkeleton className="h-4 w-40" testId={`${testId}-user-loading`} />
          )}
          {isErrorUser && (
            <span data-testid={`${testId}-user-error`}>{t('unable-to-find-short')}</span>
          )}
          {user && <span data-testid={`${testId}-user-name`}>{user.name}</span>}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-bold uppercase">Status</div>
        <Badge
          className={classNames('inline', { '!bg-blue-600': task.completed })}
          testId={`${testId}-status`}
        >
          {task.completed ? 'COMPLETE' : 'INCOMPLETE'}
        </Badge>
      </div>
    </div>
  );
};

export default TaskView;
