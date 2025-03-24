import { createContext, PropsWithChildren, useContext, useState } from 'react';
import noop from 'lodash/noop';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import Backdrop from '../Backdrop/Backdrop';
import Button, { ButtonProps } from '../Button/Button';

type PopoverContextValue = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const PopoverContext = createContext<PopoverContextValue>({
  isOpen: false,
  setIsOpen: noop,
});

export interface PopoverProps extends BaseComponentProps, PropsWithChildren {}

const Popover = ({ children, className, testId = 'popover' }: PopoverProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative', className)} data-testid={testId}>
      <PopoverContext.Provider value={{ isOpen, setIsOpen }}>{children}</PopoverContext.Provider>
    </div>
  );
};

const Trigger = ({
  children,
  className,
  size = 'icon',
  variant = 'text',
  testId = 'popover-trigger',
}: ButtonProps): JSX.Element => {
  const { isOpen, setIsOpen } = useContext(PopoverContext);

  return (
    <Button
      className={className}
      onClick={() => setIsOpen(!isOpen)}
      size={size}
      variant={variant}
      data-testid={testId}
    >
      {children}
    </Button>
  );
};
Popover.Trigger = Trigger;

const Content = ({
  children,
  className,
  testId = 'popover-content',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const { isOpen, setIsOpen } = useContext(PopoverContext);

  return (
    <>
      <Backdrop
        className={cn('bg-transparent', { hidden: !isOpen })}
        onClick={() => setIsOpen(false)}
        testId={`${testId}-backdrop`}
      />
      <div className={cn('absolute z-1001', { hidden: !isOpen }, className)} data-testid={testId}>
        {children}
      </div>
    </>
  );
};
Popover.Content = Content;

export default Popover;
