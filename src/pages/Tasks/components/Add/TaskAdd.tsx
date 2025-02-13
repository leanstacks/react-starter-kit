import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useToasts } from 'common/hooks/useToasts';
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createToast } = useToasts();
  const { data: user } = useGetCurrentUser();

  const onTaskCreated = () => {
    createToast({ text: t('createdTask', { ns: 'tasks' }), isAutoDismiss: true });
    navigate(-1);
  };

  return (
    <div className={className} data-testid={testId}>
      {/* heading */}
      <h2 className="mb-8 border-b border-neutral-500/10 pb-1 text-lg font-bold">
        {t('addTask', { ns: 'tasks' })}
      </h2>

      {/* form */}
      {!!user && (
        <TaskForm
          task={{ userId: user.id }}
          onCancel={() => navigate(-1)}
          onSubmit={onTaskCreated}
        />
      )}
    </div>
  );
};

export default TaskAdd;
