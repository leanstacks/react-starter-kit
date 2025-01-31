import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { PropsWithTestId } from 'common/utils/types';

/**
 * Properties for the `Input` component.
 * @param {string} [label] - Optional. The text to display. If omitted, the
 * `value` is displayed.
 * @param {string} name - Name of the form control.
 * @param {string} [supportingText] - Optional. Help text or instructions.
 * @see {@link PropsWithTestId}
 * @see {@link InputHTMLAttributes}
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithTestId {
  label?: string;
  name: string;
  supportingText?: string;
}

/**
 * The `Input` component renders an HTML `input` element. It is used to capture
 * single line text input from a user.
 * @param {InputProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Input = ({
  className,
  label,
  name,
  supportingText,
  testId = 'input',
  ...props
}: InputProps): JSX.Element => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const hasError = !!errors[name];
  const errorMessage: string = errors[name]?.message as string;
  const isDisabled = props.disabled || props.readOnly;

  return (
    <div className={classNames(className)} data-testid={testId}>
      {!!label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium"
          data-testid={`${testId}-label`}
        >
          {label}
        </label>
      )}
      <input
        id={props.id || name}
        {...props}
        {...register(name)}
        className={classNames(
          'mb-1 block w-full border-b border-neutral-500/50 bg-transparent py-0.5 focus:border-blue-600 focus-visible:outline-none',
          {
            '!border-red-600': hasError,
          },
          {
            'opacity-50': isDisabled,
          },
        )}
        data-testid={`${testId}-input`}
      />
      {hasError && (
        <div className="me-1 inline text-sm text-red-600" data-testid={`${testId}-error`}>
          {errorMessage}
        </div>
      )}
      {!!supportingText && (
        <div className="inline text-sm font-light" data-testid={`${testId}-supporting-text`}>
          {supportingText}
        </div>
      )}
    </div>
  );
};

export default Input;
