import classNames from 'classnames';
import Link from 'common/components/Link/Link';

import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Users/api/useGetUserTasks';
import TaskCompleteToggle from 'pages/Users/Tasks/components/TaskCompleteToggle';

interface TaskListItemProps extends BaseComponentProps {
  task: Task;
}

const TaskListItem = ({
  className,
  task,
  testId = 'list-task-item',
}: TaskListItemProps): JSX.Element => {
  return (
    <div className={classNames('flex items-center gap-4 py-0.5', className)} data-testid={testId}>
      <TaskCompleteToggle task={task} testId={`${testId}-complete-toggle`} />
      <Link to={`${task.id}`}>{task.title}</Link>
    </div>
  );
};

export default TaskListItem;
