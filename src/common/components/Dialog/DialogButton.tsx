import classNames from 'classnames';

import Button, { ButtonProps } from '../Button/Button';

/**
 * The variations of the `DialogButton` components.
 */
type DialogButtonVariant = 'primary' | 'secondary' | 'danger';

/**
 * Properties for the `DialogButton` component.
 * @param {DialogButtonVariant} variant - The variant.
 * @see {@link ButtonProps}
 */
interface DialogButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: DialogButtonVariant;
}

/**
 * The `DialogButton` is a type of `Button` specifically styled for use
 * within a `Dialog`.
 * @param {DialogButtonProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const DialogButton = ({
  className,
  variant = 'secondary',
  testId = 'dialog-button',
  ...buttonProps
}: DialogButtonProps): JSX.Element => {
  return (
    <Button
      variant="text"
      className={classNames(
        'text-sm',
        { 'font-bold text-blue-600 dark:text-blue-400': variant === 'primary' },
        { 'font-bold text-red-600': variant === 'danger' },
        className,
      )}
      testId={testId}
      {...buttonProps}
    />
  );
};

export default DialogButton;
