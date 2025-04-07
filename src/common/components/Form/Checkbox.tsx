import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { PropsWithTestId } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';

export interface CheckboxProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithTestId {
  control: Control<T>;
  label: string;
  name: string;
  supportingText?: string;
}

const Checkbox = <T extends FieldValues>({
  className,
  control,
  label,
  name,
  supportingText,
  testId = 'checkbox',
  ...props
}: CheckboxProps<T>): JSX.Element => {
  const { field, fieldState } = useController({ control, name: name as Path<T> });
  const isDisabled = props.disabled || props.readOnly;

  console.log('Checkbox fieldState:', fieldState);
  console.log('Checkbox field:', field);

  return (
    <div className={cn(className)} data-testid={testId}>
      <div className="mb-2 flex items-center gap-2">
        <input
          type="checkbox"
          id={props.id || name}
          {...props}
          {...field}
          checked={field.value === true}
          className={cn('size-4 appearance-none rounded-sm bg-gray-300 checked:bg-blue-600', {
            'cursor-pointer': !isDisabled,
            'cursor-not-allowed opacity-50': isDisabled,
          })}
          data-testid={`${testId}-input`}
        />
        <Label
          htmlFor={name}
          required={props.required}
          className="m-0 inline leading-0"
          testId={`${testId}-label`}
        >
          {label}
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
        {supportingText && (
          <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
