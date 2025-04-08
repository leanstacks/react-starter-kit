import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';
import FAIcon from '../Icon/FAIcon';

export interface CheckboxProps<T extends FieldValues> extends BaseComponentProps {
  control: Control<T>;
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
  supportingText?: string;
}

const Checkbox = <T extends FieldValues>({
  className,
  control,
  disabled = false,
  label,
  name,
  required = false,
  supportingText,
  testId = 'checkbox',
}: CheckboxProps<T>): JSX.Element => {
  const { field, fieldState } = useController({ control, name: name as Path<T> });
  const isChecked = field.value === true;

  // console.log(`Checkbox::${name}::`, { field, fieldState });
  // console.log(`Checkbox::${name}::error::`, fieldState.error);

  const handleClick = () => {
    if (!disabled) {
      field.onChange(!isChecked);
    }
  };

  return (
    <div className={cn(className)} data-testid={testId}>
      <div className="mb-2 flex items-center gap-2">
        <button
          type="button"
          name={name}
          className={cn(
            'flex size-4 appearance-none items-center justify-center rounded-sm',
            { 'bg-blue-600': isChecked },
            { 'bg-gray-300': !isChecked },
            { 'cursor-not-allowed opacity-50': disabled },
            {
              'cursor-pointer': !disabled,
            },
          )}
          onClick={handleClick}
          role="checkbox"
          aria-checked={field.value === true}
        >
          {isChecked && <FAIcon icon="check" size="sm" fixedWidth className="text-white" />}
        </button>
        <Label
          htmlFor={name}
          required={required}
          className="m-0 inline leading-0"
          testId={`${testId}-label`}
        >
          {label}
        </Label>
      </div>
      <div className="flex items-center">
        <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
        {supportingText && (
          <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
