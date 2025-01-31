import { PropsWithChildren } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

/**
 * Properties for the `WithFormProvider` test wrapper component.
 * @param [formProps] - Optional. `UseFormProps` object to supply configuration to
 * the `useForm` hook which, in turn, configures `FormProvider`.
 * @see {@link PropsWithChildren}
 */
interface WithFormProviderProps extends PropsWithChildren {
  formProps?: UseFormProps;
}

/**
 * A React test wrapper. Wraps the component under test with a bespoke set
 * of React components, typically providers.
 *
 * Wraps the component with the React Hook Form `FormProvider`
 * and nothing more. Removes other providers to minimize side effects on the
 * component under test.
 * @param {WithFormProviderProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const WithFormProvider = ({ children, formProps }: WithFormProviderProps): JSX.Element => {
  const formMethods = useForm(formProps);
  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

export default WithFormProvider;
