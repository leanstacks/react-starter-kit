import { useState } from 'react';
import { InferType, object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { useSignin } from '../api/useSignin';
import Input from 'common/components/Form/Input';
import FAIcon from 'common/components/Icon/FAIcon';
import Alert from 'common/components/Alert/Alert';
import Button from 'common/components/Button/Button';

/**
 * Signin form validation schema.
 */
const validationSchema = object({
  password: string().required(t('validation.required')),
  username: string()
    .required(t('validation.required'))
    .max(30, t('validation.max', { count: 30 })),
});

/**
 * Signin form values.
 */

type SigninFormValues = InferType<typeof validationSchema>;

/**
 * The `SigninForm` component renders a form for user authentication.
 *
 * Upon successful authentication, navigates the user to the authenticated
 * landing page of the application.
 *
 * Upon error, displays messages.
 *
 * @param {BaseComponentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SigninForm = ({ className, testId = 'form-signin' }: BaseComponentProps): JSX.Element => {
  const [error, setError] = useState<string>('');
  const { mutate: signin } = useSignin();
  const navigate = useNavigate();

  /**
   * Initialize management of the form.
   */
  const { control, formState, handleSubmit } = useForm<SigninFormValues>({
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(validationSchema),
  });

  /**
   * Handles the form submission.
   */
  const onFormSubmit = (data: SigninFormValues) => {
    setError('');
    signin(data.username, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (err: Error) => {
        setError(err.message);
      },
    });
  };

  return (
    <div className={cn('lg:w-2/3 xl:w-1/2', className)} data-testid={testId}>
      {error && (
        <Alert variant="error" className="mb-4 rounded-none" testId={`${testId}-alert`}>
          <FAIcon icon="circleExclamation" size="lg" />
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Input
          control={control}
          name="username"
          label="Username"
          supportingText="Use any username from {JSON}Placeholder, e.g. Bret or Samantha."
          className="mb-4"
          autoFocus
          autoComplete="off"
          maxLength={30}
          required
          disabled={formState.isSubmitting}
          testId={`${testId}-input-username`}
        />

        <Input
          control={control}
          type="password"
          name="password"
          label="Password"
          className="mb-4"
          autoComplete="off"
          maxLength={30}
          required
          disabled={formState.isSubmitting}
          testId={`${testId}-input-password`}
        />

        <Button
          type="submit"
          className="w-full sm:w-40"
          disabled={formState.isSubmitting || !formState.isDirty}
          testId={`${testId}-button-submit`}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
