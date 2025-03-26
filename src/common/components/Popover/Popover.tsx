import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import noop from 'lodash/noop';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import Backdrop from '../Backdrop/Backdrop';
import Button, { ButtonProps } from '../Button/Button';

type PopoverContextValue = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  triggerRect: Pick<DOMRect, 'top' | 'left' | 'height' | 'width'>;
  setTriggerRect: (rect: Pick<DOMRect, 'top' | 'left' | 'height' | 'width'>) => void;
};

const PopoverContext = createContext<PopoverContextValue>({
  isOpen: false,
  setIsOpen: noop,
  triggerRect: { top: 0, left: 0, height: 0, width: 0 },
  setTriggerRect: noop,
});

export interface PopoverProps extends BaseComponentProps, PropsWithChildren {}

const Popover = ({ children, className, testId = 'popover' }: PopoverProps): JSX.Element => {
  console.log('Popover');
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<
    Pick<DOMRect, 'top' | 'left' | 'height' | 'width'>
  >({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });

  return (
    <div className={cn('', className)} data-testid={testId}>
      <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRect, setTriggerRect }}>
        {children}
      </PopoverContext.Provider>
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
  console.log('Trigger');
  const { isOpen, setIsOpen, setTriggerRect } = useContext(PopoverContext);
  const triggerRef = useRef<HTMLDivElement>(null);

  const setTriggerPosition = () => {
    const {
      top = 0,
      left = 0,
      height = 0,
      width = 0,
    } = triggerRef.current?.getBoundingClientRect() || {};
    setTriggerRect({ top, left, height, width });
  };

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      window.addEventListener('resize', setTriggerPosition);
      window.addEventListener('scroll', setTriggerPosition);
      setTriggerPosition();
    } else {
      window.removeEventListener('resize', setTriggerPosition);
      window.removeEventListener('scroll', setTriggerPosition);
    }

    return () => {
      window.removeEventListener('resize', setTriggerPosition);
      window.removeEventListener('scroll', setTriggerPosition);
    };
  }, [isOpen, triggerRef.current]);

  return (
    <div ref={triggerRef}>
      <Button
        className={className}
        onClick={() => setIsOpen(!isOpen)}
        size={size}
        variant={variant}
        data-testid={testId}
      >
        {children}
      </Button>
    </div>
  );
};
Popover.Trigger = Trigger;

interface ContentProps extends BaseComponentProps, PropsWithChildren {
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const Content = ({
  children,
  className,
  side = 'bottom',
  testId = 'popover-content',
}: ContentProps): JSX.Element => {
  console.log('Content');
  const { isOpen, setIsOpen, triggerRect } = useContext(PopoverContext);
  const contentRef = useRef<HTMLDivElement>(null);

  const contentRect = contentRef.current?.getBoundingClientRect() || {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  };
  console.log(`Content::triggerRect: ${JSON.stringify(triggerRect)}`);
  console.log(`Content::contentRect: ${JSON.stringify(contentRect)}`);

  const calculatePosition = () => {
    switch (side) {
      case 'top':
        return {
          top: triggerRect.top - contentRect.height - 8,
          left: triggerRect.left,
        };
      case 'right': {
        return {
          top: triggerRect.top,
          left: triggerRect.left + triggerRect.width + 8,
        };
      }
      case 'left': {
        return {
          top: triggerRect.top,
          left: triggerRect.left - contentRect.width - 8,
        };
      }
      case 'bottom':
      default: {
        return {
          top: triggerRect.top + triggerRect.height + 8,
          left: triggerRect.left,
        };
      }
    }
  };

  const { top, left } = calculatePosition();
  console.log(`Content::top: ${top}`);
  console.log(`Content::left: ${left}`);

  return (
    <>
      <Backdrop
        className={cn('bg-transparent', { hidden: !isOpen })}
        onClick={() => setIsOpen(false)}
        testId={`${testId}-backdrop`}
      />
      <div
        className={cn('fixed top-0 left-0 z-1001', { hidden: !isOpen }, className)}
        style={{ transform: `translate(${left}px, ${top}px)` }}
        ref={contentRef}
        data-testid={testId}
      >
        {children}
      </div>
    </>
  );
};
Popover.Content = Content;

export default Popover;
