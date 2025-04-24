import { createContext, InputHTMLAttributes, useContext } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import noop from 'lodash/noop';

import { PropsWithTestId } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';
import FAIcon from '../Icon/FAIcon';

type RadioGroupContextValue = {
  disabled?: boolean;
  name: string;
  setValue: (val: string) => void;
  value?: string;
};

const RadioGroupContext = createContext<RadioGroupContextValue>({
  disabled: false,
  name: '',
  setValue: noop,
  value: undefined,
});

export interface RadioGroupProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithTestId {
  control: Control<T>;
  label?: string;
  name: string;
  supportingText?: string;
}

const RadioGroup = <T extends FieldValues>({
  children,
  className,
  control,
  label,
  name,
  supportingText,
  testId = 'radio-group',
  ...props
}: RadioGroupProps<T>) => {
  const { field, fieldState } = useController({ control, name: name as Path<T> });
  console.log('field', field);
  console.log('fieldState', fieldState);

  return (
    <div className={cn(className)} data-testid={testId}>
      {!!label && (
        <Label htmlFor={name} className="mb-2" required={props.required} testId={`${testId}-label`}>
          {label}
        </Label>
      )}
      <RadioGroupContext.Provider
        value={{
          disabled: props.disabled,
          name,
          setValue: field.onChange,
          value: field.value,
        }}
      >
        <div className="flex flex-col gap-2">{children}</div>
      </RadioGroupContext.Provider>
      <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
      {!!supportingText && (
        <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>
      )}
    </div>
  );
};

interface RadioGroupItemProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      'className' | 'disabled' | 'required' | 'value'
    >,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id'>>,
    PropsWithTestId {
  label: string;
}

const Item = ({
  className,
  disabled,
  id,
  testId = 'radio-group-item',
  ...props
}: RadioGroupItemProps) => {
  const {
    disabled: groupDisabled,
    name,
    setValue,
    value: currentValue,
  } = useContext(RadioGroupContext);
  const isChecked = currentValue === props.value;
  const isDisabled = disabled || groupDisabled;

  const handleChange = () => {
    if (!isDisabled) {
      setValue(props.value as string);
    }
  };

  return (
    <div className="flex items-center" data-testid={testId} onClick={handleChange}>
      <input
        type="radio"
        id={id}
        name={name}
        className={cn('size-0', className)}
        disabled={isDisabled}
        data-testid={`${testId}-input`}
        onChange={handleChange}
        checked={isChecked}
        aria-checked={isChecked}
        {...props}
      />
      <FAIcon
        icon={isChecked ? 'circleDot' : 'circle'}
        className={cn('me-2', { 'text-blue-600': isChecked }, { 'text-neutral-500': !isChecked })}
      />
      <label htmlFor={id} data-testid={`${testId}-label`}>
        {props.label}
      </label>
    </div>
  );
};
RadioGroup.Item = Item;

export default RadioGroup;
