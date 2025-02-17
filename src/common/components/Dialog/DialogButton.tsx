import { cva, VariantProps } from 'class-variance-authority';

import { cn } from 'common/utils/css';
import Button, { ButtonProps } from '../Button/Button';

/**
 * Define the component base and variant styles.
 */
const variants = cva('', {
  variants: {
    variant: {
      danger: 'font-bold text-red-600',
      primary: 'font-bold text-blue-600 dark:text-blue-400',
      secondary: '',
    },
  },
  defaultVariants: { variant: 'secondary' },
});

/**
 * The variant attributes of the DialogButton component.
 */
type DialogButtonVariants = VariantProps<typeof variants>;

/**
 * Properties for the `DialogButton` component.
 */
export interface DialogButtonProps extends Omit<ButtonProps, 'variant'>, DialogButtonVariants {}

/**
 * The `DialogButton` is a type of `Button` specifically styled for use
 * within a `Dialog`.
 * @param {DialogButtonProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const DialogButton = ({
  className,
  variant,
  testId = 'dialog-button',
  ...buttonProps
}: DialogButtonProps): JSX.Element => {
  return (
    <Button
      variant="text"
      size="sm"
      className={cn(variants({ variant, className }))}
      testId={testId}
      {...buttonProps}
    />
  );
};

export default DialogButton;
