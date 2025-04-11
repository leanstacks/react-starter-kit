import { LabelHTMLAttributes } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `Label` component.
 * @param {boolean} [required] - Optional. Indicates if the label is for a required field.
 * Default: `false`
 * @see {@link BaseComponentProps}
 * @see {@link LabelHTMLAttributes}
 */
export interface LabelProps extends BaseComponentProps, LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/**
 * The `Label` component renders a HTML `label` element. It is used to describe
 * a form control.
 * @param {LabelProps} props - Component properties.
 * @returns JSX
 */
const Label = ({
  className,
  required = false,
  testId = 'label',
  ...props
}: LabelProps): JSX.Element => {
  return (
    <label
      className={cn(
        'mb-1 block text-sm font-medium',
        { 'font-bold after:content-["*"]': required },
        className,
      )}
      data-testid={testId}
      {...props}
    />
  );
};

export default Label;
