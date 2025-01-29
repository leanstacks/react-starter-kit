import { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { PropsWithTestId } from 'common/utils/types';

/**
 * Properties for the `TextField` component.
 */
export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithTestId {
  label?: string;
  name: string;
  supportingText?: string;
}

/**
 * The `TextField` component renders an HTML `input` element. It is used to capture
 * input from a user.
 * @param {TextFieldProps} props - Component properties, `TextFieldProps`.
 * @returns {JSX.Element} JSX
 */
const TextField = ({
  className,
  label,
  supportingText,
  testId = 'field-text',
  ...props
}: TextFieldProps): JSX.Element => {
  const { formState, register, setFocus, watch } = useFormContext();
  const fieldValue = watch(props.name);
  const [showInput, setShowInput] = useState(!!fieldValue || !!props.autoFocus);
  const isDisabled = !!props.disabled || !!props.readOnly;
  const error = formState.errors[props.name];

  /**
   * Performed when the component is focused, e.g. clicked, tapped, or
   * otherwise focused.
   */
  const doFocus = () => {
    if (!isDisabled) {
      setShowInput(true);
      setFocus(props.name);
    }
  };

  return (
    <div
      className={className}
      onClick={doFocus}
      onFocus={doFocus}
      onBlur={() => setShowInput(!!fieldValue)}
      data-testid={testId}
    >
      <div
        className={classNames(
          'mb-1 flex h-16 flex-col border-b border-neutral-500/50 bg-neutral-500/10 px-4 py-2 has-[:focus]:border-blue-600',
          { 'justify-between': showInput },
          { 'justify-center': !showInput },
          {
            'border-red-600 has-[:focus]:border-red-600': !!error,
          },
          {
            'opacity-50 hover:bg-neutral-500/10': isDisabled,
          },
          {
            'hover:bg-neutral-500/25': !isDisabled,
          },
        )}
      >
        {label && (
          <label
            htmlFor={props.id ?? props.name}
            className={classNames('opacity-75', { 'text-sm': showInput })}
            data-testid={`${testId}-label`}
          >
            {label}
          </label>
        )}
        <input
          className={classNames('bg-transparent focus-visible:outline-none', {
            'size-0': !showInput,
          })}
          {...props}
          {...register(props.name)}
          data-testid={`${testId}-input`}
        />
      </div>
      {supportingText && (
        <div className="ms-4 text-sm opacity-75" data-testid={`${testId}-supporting-text`}>
          {supportingText}
        </div>
      )}
      {!!error && (
        <div className="ms-4 text-sm text-red-600" data-testid={`${testId}-error`}>
          {error.message as string}
        </div>
      )}
    </div>
  );
};

export default TextField;
