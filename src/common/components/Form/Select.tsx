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

/**
 * The type of value for the select form control.
 */
type SelectValue = boolean | number | string;

/**
 * Defines the attributes of the SelectContext value.
 */
type SelectContextValue = {
  isDisabled: boolean;
  isError: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setValue: (val: SelectValue) => void;
  value?: SelectValue;
};

/**
 * The SelectContext instance.
 */
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
 * The `Select` component renders a list of options from which a user may select.
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

/**
 * The `Trigger` component wraps the element used to open the Select Options.
 * There should be 1 Trigger within a Select.
 */
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
        'flex w-full items-center gap-2 border-b py-0.5',
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

/**
 * Properties for the Value component.
 */
interface ValueProps extends BaseComponentProps {
  placeholder?: string;
}

/**
 * The `Value` component displays either the current Select value. If there is no value
 * and "placeholder" is supplied, the placeholder is displayed.
 *
 * The Value component is a child of the Select Trigger.
 */
const Value = ({ className, placeholder, testId = 'select-value' }: ValueProps): JSX.Element => {
  const { value } = useContext(SelectContext);

  return (
    <div className={cn('grow truncate text-left', className)} data-testid={testId}>
      {value}
      {!value && <span className="opacity-75">{placeholder}</span>}
    </div>
  );
};
Select.Value = Value;

/**
 * The `Icon` component displays the icon within a Select Trigger.  By default,
 * the chevron down icon is displayed; however, the icon may be overridden.
 */
const Icon = ({
  icon = 'chevronDown',
  testId = 'select-icon',
  ...props
}: Omit<FAIconProps, 'icon'> & Partial<Pick<FAIconProps, 'icon'>>): JSX.Element => {
  return <FAIcon icon={icon} testId={testId} {...props} />;
};
Select.Icon = Icon;

/**
 * The `Options` component wraps the individual Select Option, Header,
 * and Separator components. There should be 1 Options within a Select.
 */
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

/**
 * Properties for the Option component.
 */
interface OptionProps extends BaseComponentProps, PropsWithChildren {
  value: SelectValue;
}

/**
 * The `Option` component renders an individual Option. The "value" property
 * specifies the value which will be updated in the form context when this Option
 * is selected.
 */
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

/**
 * The `Heading` component renders a heading within the Options list. A Heading
 * is useful for categorizing a group of related Option components.
 */
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

/**
 * The `Separator` component renders a horizontal divider within Select Options.
 * This is useful to organize and separate groups of related options.
 */
const Separator = ({ className, testId = 'select-separator' }: DividerProps): JSX.Element => {
  return <Divider className={cn('-mx-1 my-1', className)} testId={testId} />;
};
Select.Separator = Separator;

export default Select;
