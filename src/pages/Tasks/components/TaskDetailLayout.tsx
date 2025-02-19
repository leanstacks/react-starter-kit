import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { useGetTask } from '../api/useGetTask';
import { useDeleteTask } from '../api/useDeleteTask';
import { useToasts } from 'common/hooks/useToasts';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import FAIcon from 'common/components/Icon/FAIcon';
import TaskDeleteDialog from './Delete/TaskDeleteDialog';
import Button from 'common/components/Button/Button';
import Alert from 'common/components/Alert/Alert';
import TaskView from './View/TaskView';

/**
 * Properties for the `TaskDetailLayout` component.
 * @see {@link BaseComponentProps}
 */
interface TaskDetailLayoutProps extends BaseComponentProps {}

/**
 * The `TaskDetailLayout` component renders a layout for viewing and maintaining
 * a single `Task`. Provides buttons and navigation to perform actions on the Task.
 * @param {TaskDetailLayoutProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const TaskDetailLayout = ({
  className,
  testId = 'layout-task-detail',
}: TaskDetailLayoutProps): JSX.Element => {
  const { t } = useTranslation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { createToast } = useToasts();

  const {
    data: task,
    error: taskError,
    isLoading: isLoadingTask,
  } = useGetTask({ taskId: Number(taskId) });

  const { mutate: deleteTask, isPending: isDeletePending, error: deleteError } = useDeleteTask();

  const doDelete = (task: Task) => {
    setIsDeleteDialogOpen(false);
    deleteTask(
      { task },
      {
        onSuccess: () => {
          createToast({
            text: `Deleted task ${task.id}`,
            isAutoDismiss: true,
          });
          navigate(-1);
        },
      },
    );
  };

  return (
    <div className={className} data-testid={testId}>
      {/* Heading */}
      <div className="mb-1 flex items-center gap-4 border-b border-neutral-500/10 pb-1">
        {!!task && (
          <div className="flex min-w-0 flex-nowrap items-center gap-2">
            <FAIcon icon="check" size="lg" />
            <h2 className="truncate text-lg font-bold">
              {t('task', { ns: 'tasks' })}: {task.title}
            </h2>
          </div>
        )}
        {isLoadingTask && <LoaderSkeleton className="h-7 w-32" />}

        {/* Menu */}
        <div className="ms-auto flex items-center gap-4">
          <Button
            variant="text"
            size="icon"
            title="Edit"
            onClick={() => navigate('edit')}
            testId={`${testId}-button-edit`}
          >
            <FAIcon icon="pencil" />
          </Button>
          <Button
            variant="text"
            size="icon"
            title="Delete"
            onClick={() => setIsDeleteDialogOpen(true)}
            testId={`${testId}-button-delete`}
          >
            <FAIcon icon="trash" />
          </Button>
          <Button
            variant="text"
            size="icon"
            title="Close"
            onClick={() => navigate(-1)}
            testId={`${testId}-button-close`}
          >
            <FAIcon icon="xmark" />
          </Button>
        </div>
      </div>

      {taskError && (
        <Alert variant="error" className="my-4" testId={`${testId}-error-task`}>
          <FAIcon icon="circleExclamation" />
          {`Unable to retrieve task. Detail: ${taskError.message}`}
        </Alert>
      )}

      {deleteError && (
        <Alert variant="error" className="my-4" testId={`${testId}-error-delete`}>
          <FAIcon icon="circleExclamation" />
          {`Unable to delete task. Detail: ${deleteError.message}`}
        </Alert>
      )}

      {(isLoadingTask || isDeletePending) && (
        <div data-testid={`${testId}-loading`}>
          <div className="mt-4">
            <LoaderSkeleton className="mb-2 h-4 w-12" />
            <LoaderSkeleton className="h-5 w-80" />
          </div>
          <div className="mt-4">
            <LoaderSkeleton className="mb-2 h-4 w-12" />
            <LoaderSkeleton className="h-5 w-80" />
          </div>
          <div className="mt-4">
            <LoaderSkeleton className="mb-2 h-4 w-12" />
            <LoaderSkeleton className="h-5 w-80" />
          </div>
        </div>
      )}

      {task && !isDeletePending && (
        <div data-testid={`${testId}-task`}>
          <TaskView task={task} testId={`${testId}-task-view`} />

          <TaskDeleteDialog
            isOpen={isDeleteDialogOpen}
            onCancel={() => setIsDeleteDialogOpen(false)}
            onClose={() => setIsDeleteDialogOpen(false)}
            onDelete={() => doDelete(task)}
            task={task}
          />
        </div>
      )}
    </div>
  );
};

export default TaskDetailLayout;
