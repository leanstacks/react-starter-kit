import { InputHTMLAttributes, PropsWithChildren } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { cn } from 'common/utils/css';
import { PropsWithTestId } from 'common/utils/types';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';

/**
 * Properties for the `Select` component.
 * @param {Control} control - Object containing methods for registering components
 * into React Hook Form.
 * @param {string} [label] - Optional. The text to display. If omitted, the
 * `value` is displayed.
 * @param {string} name - Name of the form control.
 * @param {string} [supportingText] - Optional. Help text or instructions.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 * @see {@link InputHTMLAttributes}
 */
export interface SelectProps<T extends FieldValues>
  extends PropsWithTestId,
    PropsWithChildren,
    InputHTMLAttributes<HTMLSelectElement> {
  control: Control<T>;
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
const Select = <T extends FieldValues>({
  children,
  className,
  control,
  label,
  name,
  supportingText,
  testId = 'select',
  ...props
}: SelectProps<T>): JSX.Element => {
  const { field, fieldState } = useController({ control, name: name as Path<T> });
  const isDisabled = props.disabled || props.readOnly;

  return (
    <div className={className} data-testid={testId}>
      {!!label && (
        <Label htmlFor={name} required={props.required} testId={`${testId}-label`}>
          {label}
        </Label>
      )}
      <select
        id={props.id || name}
        {...props}
        {...field}
        className={cn(
          'mb-1 block w-full border-b border-neutral-500/50 bg-transparent py-0.5 focus:border-blue-600',
          {
            'border-red-600!': fieldState.error,
          },
          {
            'opacity-50': isDisabled,
          },
        )}
        data-testid={`${testId}-select`}
      >
        {children}
      </select>
      <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
      {!!supportingText && (
        <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>
      )}
    </div>
  );
};

export default Select;
