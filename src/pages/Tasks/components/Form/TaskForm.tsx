import { useState } from 'react';
import { boolean, InferType, number, object, string } from 'yup';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useCreateTask } from 'pages/Tasks/api/useCreateTask';
import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import Input from 'common/components/Form/Input';
import Button from 'common/components/Button/Button';
import Toggle from 'common/components/Form/Toggle';
import Alert from 'common/components/Alert/Alert';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * Task form validation schema.
 */
const validationSchema = object({
  userId: number().required(t('validation.required')),
  title: string()
    .required(t('validation.required'))
    .max(50, t('validation.max', { count: 50 })),
  completed: boolean().required(t('validation.required')).default(false),
});

/**
 * Task form values.
 */
type TaskFormValues = InferType<typeof validationSchema>;

/**
 * Properties for the `TaskForm` component.
 * @param {function} onCancel - Optional. Function invoked when the form is cancelled.
 * @param {function} onSubmit - Optional. Function invoked when the form is
 * successfully submitted.
 * @param {Partial<Task>} [task] - Optional. Task data used to initialize the form.
 * @see {@link BaseComponentProps}
 */
export interface TaskFormProps extends BaseComponentProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  task?: Partial<Task>;
}

/**
 * The `TaskForm` component renders a form for creating and updating `Task` objects.
 *
 * Upon successful submission, navigates back to the previous page.
 *
 * Upon cancellation, navigates back to the previous page.
 *
 * Upon error, displays a message.
 *
 * @param {TaskFormProps} props - Component properties.
 * @returns JSX
 */
const TaskForm = ({
  className,
  onCancel,
  onSubmit,
  task,
  testId = 'task-form',
}: TaskFormProps): JSX.Element => {
  const [error, setError] = useState('');
  const { mutate: createTask } = useCreateTask();

  /**
   * Initializes management of the form.
   */
  const { control, formState, handleSubmit } = useForm<TaskFormValues>({
    defaultValues: {
      userId: task?.userId || 0,
      title: task?.title || '',
      completed: task?.completed || false,
    },
    resolver: yupResolver(validationSchema),
  });

  /**
   * Handles form cancellation.
   */
  const onFormCancel = () => {
    onCancel?.();
  };

  /**
   * Handles form submission.
   * @param {TaskFormValues} data - Form data values.
   */
  const onFormSubmit = (data: TaskFormValues) => {
    setError('');
    createTask(
      { task: data },
      {
        onSuccess: () => {
          onSubmit?.();
        },
        onError: (err: Error) => {
          setError(err.message);
        },
      },
    );
  };

  return (
    <div className={cn('lg:w-2/3 xl:w-1/2', className)} data-testid={testId}>
      {error && (
        <Alert variant="error" className="mb-4 rounded-none" testId={`${testId}-error`}>
          <FAIcon icon="circleExclamation" size="lg" />
          {`${t('errors.unable-to-process')} ${error}`}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Input
          control={control}
          name="title"
          label={t('label.title', { ns: 'tasks' })}
          className="mb-4"
          autoFocus
          autoComplete="off"
          required
          disabled={formState.isSubmitting}
          testId={`${testId}-input-title`}
        />

        <Toggle
          control={control}
          name="completed"
          label={t('label.completed', { ns: 'tasks' })}
          className="mb-4"
          disabled={formState.isSubmitting}
          testId={`${testId}-input-completed`}
        />

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="my-8 w-1/2 sm:w-40"
            onClick={() => onFormCancel()}
            disabled={formState.isSubmitting}
            testId={`${testId}-button-cancel`}
          >
            {t('label.cancel')}
          </Button>
          <Button
            type="submit"
            className="w-1/2 sm:w-40"
            disabled={formState.isSubmitting}
            testId={`${testId}-button-submit`}
          >
            {t('label.save')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
