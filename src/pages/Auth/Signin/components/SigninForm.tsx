import { useState } from 'react';
import classNames from 'classnames';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { BaseComponentProps } from 'common/utils/types';
import { useSignin } from '../api/useSignin';
import Input from 'common/components/Form/Input';
import FAIcon from 'common/components/Icon/FAIcon';
import Alert from 'common/components/Alert/Alert';
import Button from 'common/components/Button/Button';

/**
 * Signin form values.
 */
interface SigninFormValues {
  username: string;
  password: string;
}

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
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');
  const { mutate: signin } = useSignin();
  const navigate = useNavigate();

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
   * Initialize management of the form.
   */
  const formMethods = useForm<SigninFormValues>({
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(validationSchema),
  });

  /**
   * Handles the form submission.
   */
  const handleFormSubmit = formMethods.handleSubmit((data: SigninFormValues) => {
    console.log(`handleFormSubmit::${JSON.stringify(data)}`);
    setError('');
    signin(data.username, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (err: Error) => {
        setError(err.message);
      },
    });
  });

  return (
    <div className={classNames('lg:w-2/3 xl:w-1/2', className)} data-testid={testId}>
      {error && (
        <Alert variant="error" className="mb-4 rounded-none" testId={`${testId}-alert`}>
          <FAIcon icon="circleExclamation" size="lg" />
          {error}
        </Alert>
      )}

      <FormProvider {...formMethods}>
        <form onSubmit={handleFormSubmit}>
          <Input
            name="username"
            label="Username"
            supportingText="Use any username from {JSON}Placeholder, e.g. Bret or Samantha."
            className="mb-4"
            autoFocus
            autoComplete="off"
            maxLength={30}
            disabled={formMethods.formState.isSubmitting}
            testId={`${testId}-input-username`}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            className="mb-4"
            autoComplete="off"
            maxLength={30}
            disabled={formMethods.formState.isSubmitting}
            testId={`${testId}-input-password`}
          />

          <Button
            type="submit"
            className="w-full sm:w-40"
            disabled={formMethods.formState.isSubmitting || !formMethods.formState.isDirty}
            testId={`${testId}-button-submit`}
          >
            Sign In
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SigninForm;
