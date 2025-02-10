import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { cn } from 'common/utils/css';
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
export interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithTestId {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  supportingText?: string;
}

/**
 * The `Input` component renders an HTML `input` element. It is used to capture
 * single line text input from a user.
 * @param {InputProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Input = <T extends FieldValues>({
  className,
  control,
  label,
  name,
  supportingText,
  testId = 'input',
  ...props
}: InputProps<T>): JSX.Element => {
  const { field, fieldState } = useController({ control, name });
  const isDisabled = props.disabled || props.readOnly;

  return (
    <div className={cn(className)} data-testid={testId}>
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
        {...field}
        className={cn(
          'mb-1 block w-full border-b border-neutral-500/50 bg-transparent py-0.5 focus:border-blue-600 focus-visible:outline-none',
          {
            '!border-red-600': fieldState.error,
          },
          {
            'opacity-50': isDisabled,
          },
        )}
        data-testid={`${testId}-input`}
      />
      {fieldState.error && (
        <div className="me-1 inline text-sm text-red-600" data-testid={`${testId}-error`}>
          {fieldState.error.message}
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
