import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useToasts } from 'common/hooks/useToasts';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { useCreateTask } from 'pages/Tasks/api/useCreateTask';
import { BaseComponentProps } from 'common/utils/types';
import TaskForm, { TaskFormValues } from '../Form/TaskForm';
import Alert from 'common/components/Alert/Alert';
import FAIcon from 'common/components/Icon/FAIcon';

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
  const [taskCreateError, setTaskCreateError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createToast } = useToasts();
  const { data: user } = useGetCurrentUser();
  const { mutate: createTask } = useCreateTask();

  /**
   * Form cancellation callback function.
   */
  const onFormCancel = () => {
    navigate(-1);
  };

  /**
   * Form submission callback function.
   * @param data - The submitted form data.
   * @returns A Promise which resolves empty when the mutation function completes.
   */
  const onFormSubmit = (data: TaskFormValues): Promise<void> => {
    return new Promise<void>((resolve) => {
      createTask(
        { task: data },
        {
          onSuccess: () => {
            createToast({ text: t('createdTask', { ns: 'tasks' }), isAutoDismiss: true });
            navigate(-1);
          },
          onError: (err) => {
            setTaskCreateError(err.message);
          },
          onSettled: () => {
            resolve();
          },
        },
      );
    });
  };

  return (
    <div className={className} data-testid={testId}>
      {/* heading */}
      <h2 className="mb-8 border-b border-neutral-500/10 pb-1 text-lg font-bold">
        {t('addTask', { ns: 'tasks' })}
      </h2>

      {/* error state */}
      {!!taskCreateError && (
        <Alert variant="error" className="mb-4 rounded-none" testId={`${testId}-error-create`}>
          <FAIcon icon="circleExclamation" size="lg" />
          {`${t('errors.unable-to-process')} ${taskCreateError}`}
        </Alert>
      )}

      {/* form */}
      {!!user && (
        <TaskForm task={{ userId: user.id }} onCancel={onFormCancel} onSubmit={onFormSubmit} />
      )}
    </div>
  );
};

export default TaskAdd;
