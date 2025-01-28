import classNames from 'classnames';
import Link from 'common/components/Link/Link';

import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import TaskCompleteToggle from 'pages/Tasks/components/Edit/TaskCompleteToggle';

/**
 * Properties for the `TaskListItem` component.
 * @param task - A `Task` object.
 * @see {@link BaseComponentProps}
 */
interface TaskListItemProps extends BaseComponentProps {
  task: Task;
}

/**
 * The `TaskListItem` component renders a single `Task` within a `TaskList`.
 * @param {TaskListItemProps} props - Component properties.
 * @returns JSX
 */
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
