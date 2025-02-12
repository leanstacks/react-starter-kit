import { useNavigate } from 'react-router-dom';

import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { BaseComponentProps } from 'common/utils/types';
import TaskForm from '../Form/TaskForm';

/**
 * Properties for the `TaskAdd` component.
 * @see {@link BaseComponentProps}
 */
export interface TaskAddProps extends BaseComponentProps {}

/**
 * The `TaskAdd` component renders the layout for creating a new Task including
 * headings, the task form, etc.
 * @param {TaskAddProps} props - Component properties.
 * @returns JSX
 */
const TaskAdd = ({ className, testId = 'task-add' }: TaskAddProps): JSX.Element => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUser();

  return (
    <div className={className} data-testid={testId}>
      {/* heading */}
      <h2 className="mb-8 border-b border-neutral-500/10 pb-1 text-lg font-bold">Add a new task</h2>

      {/* form */}
      {!!user && (
        <TaskForm
          task={{ userId: user.id }}
          onCancel={() => navigate(-1)}
          onSubmit={() => navigate(-1)}
        />
      )}
    </div>
  );
};

export default TaskAdd;
