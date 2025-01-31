import { InputHTMLAttributes, PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { PropsWithTestId } from 'common/utils/types';

/**
 * Properties for the `Select` component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 * @see {@link InputHTMLAttributes}
 */
interface SelectProps
  extends PropsWithTestId,
    PropsWithChildren,
    InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  supportingText?: string;
}

/**
 * The `Select` component renders a HTML `select` element. It is used to capture
 * one or more values from a curated set of options.
 *
 * The `children` must contain one or more `option` or `optgroup` elements.
 * @param {SelectProps} props - Component properties.
 * @returns JSX
 */
const Select = ({
  children,
  className,
  label,
  name,
  supportingText,
  testId = 'select',
  ...props
}: SelectProps): JSX.Element => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const hasError = !!errors[name];
  const errorMessage: string = errors[name]?.message as string;
  const isDisabled = props.disabled || props.readOnly;

  return (
    <div className={className} data-testid={testId}>
      {!!label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium"
          data-testid={`${testId}-label`}
        >
          {label}
        </label>
      )}
      <select
        id={props.id || name}
        {...props}
        {...register(name)}
        className={classNames(
          'mb-1 block w-full border-b border-neutral-500/50 bg-transparent py-0.5 focus:border-blue-600',
          {
            '!border-red-600': hasError,
          },
          {
            'opacity-50': isDisabled,
          },
        )}
        data-testid={`${testId}-select`}
      >
        {children}
      </select>
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

export default Select;
