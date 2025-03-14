import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import noop from 'lodash/noop';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';
import FAIcon, { FAIconProps } from '../Icon/FAIcon';
import Backdrop from '../Backdrop/Backdrop';
import Divider, { DividerProps } from '../Divider/Divider';

type SelectValue = boolean | number | string;

type SelectContextValue = {
  isDisabled: boolean;
  isError: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setValue: (val: SelectValue) => void;
  value?: SelectValue;
};

const SelectContext = createContext<SelectContextValue>({
  isDisabled: false,
  isError: false,
  isOpen: false,
  setIsOpen: noop,
  setValue: noop,
  value: undefined,
});

/**
 * Properties for the `Select` component.
 * @param {Control} control - Object containing methods for registering components
 * into React Hook Form.
 * @param {boolean} [disabled] - Optional. Indicates if the control is disabled.
 * Defaults to `false`.
 * @param {string} [label] - Optional. The text to display. If omitted, the
 * `value` is displayed.
 * @param {string} name - Name of the form control.
 * @param {boolean} [required] - Optional. Indicates if a value is required.
 * Defaults to `false`.
 * @param {string} [supportingText] - Optional. Help text or instructions.
 */
export interface SelectProps<T extends FieldValues> extends BaseComponentProps, PropsWithChildren {
  control: Control<T>;
  disabled?: boolean;
  label?: string;
  name: string;
  required?: boolean;
  supportingText?: string;
}

/**
 * The `Select` component renders a HTML `select` element. It is used to capture
 * one or more values from a curated set of options.
 *
 * The `children` must contain one or more `option` or `optgroup` elements.
 */
const Select = <T extends FieldValues>({
  children,
  className,
  control,
  disabled = false,
  label,
  name,
  required = false,
  supportingText,
  testId = 'select',
}: SelectProps<T>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { field, fieldState } = useController({ control, name: name as Path<T> });

  return (
    <div className={cn('relative', className)} data-testid={testId}>
      {!!label && (
        <Label htmlFor={name} required={required} testId={`${testId}-label`}>
          {label}
        </Label>
      )}
      <SelectContext.Provider
        value={{
          isDisabled: disabled,
          isError: !!fieldState.error,
          isOpen,
          setIsOpen,
          setValue: field.onChange,
          value: field.value,
        }}
      >
        {children}
      </SelectContext.Provider>
      <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
      {!!supportingText && (
        <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>
      )}
    </div>
  );
};

const Trigger = ({
  children,
  className,
  testId = 'select-trigger',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const { isDisabled, isError, isOpen, setIsOpen } = useContext(SelectContext);

  const handleClick = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 border-b py-0.5',
        { 'border-neutral-500/50 focus:border-blue-600': !isError },
        { 'border-red-600': isError },
        { 'opacity-50': isDisabled },
        { 'cursor-pointer': !isDisabled },
        className,
      )}
      onClick={handleClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
Select.Trigger = Trigger;

interface ValueProps extends BaseComponentProps {
  placeholder?: string;
}

const Value = ({ className, placeholder, testId = 'select-value' }: ValueProps): JSX.Element => {
  const { value } = useContext(SelectContext);

  return (
    <div className={cn('grow truncate', className)} data-testid={testId}>
      {value}
      {!value && <span className="opacity-75">{placeholder}</span>}
    </div>
  );
};
Select.Value = Value;

const Icon = ({
  icon = 'chevronDown',
  testId = 'select-icon',
  ...props
}: Omit<FAIconProps, 'icon'> & Partial<Pick<FAIconProps, 'icon'>>): JSX.Element => {
  return <FAIcon icon={icon} testId={testId} {...props} />;
};
Select.Icon = Icon;

const Options = ({
  children,
  className,
  testId = 'select-options',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const { isOpen, setIsOpen } = useContext(SelectContext);

  return (
    <>
      <Backdrop
        className={cn('bg-transparent', { hidden: !isOpen })}
        onClick={() => setIsOpen(!isOpen)}
        testId={`${testId}-backdrop`}
      />
      <div
        className={cn(
          'absolute right-0 z-1001 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-neutral-500 bg-white p-1 dark:bg-neutral-800',
          { hidden: !isOpen },
          className,
        )}
        data-testid={testId}
      >
        {children}
      </div>
    </>
  );
};
Select.Options = Options;

interface OptionProps extends BaseComponentProps, PropsWithChildren {
  value: SelectValue;
}

const Option = ({
  children,
  className,
  testId = 'select-option',
  value,
}: OptionProps): JSX.Element => {
  const { setIsOpen, value: currentValue, setValue } = useContext(SelectContext);
  const isSelected = value === currentValue;

  const handleClick = () => {
    setValue(value);
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm not-last:mb-1',
        { 'bg-neutral-500/25': isSelected },
        { 'cursor-pointer hover:bg-neutral-500/25': !isSelected },
        className,
      )}
      onClick={handleClick}
      aria-selected={isSelected}
      data-testid={testId}
    >
      {children}
      {isSelected && (
        <FAIcon icon="check" size="sm" className="ml-auto" testId={`${testId}-selected`} />
      )}
    </div>
  );
};
Select.Option = Option;

const Heading = ({
  children,
  className,
  testId = 'select-heading',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <h5 className={cn('px-2 py-1.5 text-sm font-bold', className)} data-testid={testId}>
      {children}
    </h5>
  );
};
Select.Heading = Heading;

const Separator = ({ className, testId = 'select-separator' }: DividerProps): JSX.Element => {
  return <Divider className={cn('-mx-1 my-1', className)} testId={testId} />;
};
Select.Separator = Separator;

export default Select;
