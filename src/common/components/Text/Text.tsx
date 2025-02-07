import { PropsWithChildren } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * The variations of `Text` components.
 */
export type TextVariant = 'heading1' | 'heading2' | 'heading3';

/**
 * Properties for the `Text` React component.
 * @param {TextVariant} [variant] - Optional. The variant. Default: `none`
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
export interface TextProps extends BaseComponentProps, PropsWithChildren {
  variant?: TextVariant;
}

/**
 * The `Text` component renders a block of text. The text is styled to match
 * the supplied `variant`.
 * @param {TextProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Text = ({ children, className, testId = 'text', variant }: TextProps): JSX.Element => {
  return (
    <div
      className={cn(
        {
          'text-4xl': variant === 'heading1',
          'text-2xl': variant === 'heading2',
          'text-xl font-bold': variant === 'heading3',
        },
        className,
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Text;
