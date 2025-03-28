import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import noop from 'lodash/noop';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import Backdrop from '../Backdrop/Backdrop';

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
    <div className={cn(className)} data-testid={testId}>
      <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRect, setTriggerRect }}>
        {children}
      </PopoverContext.Provider>
    </div>
  );
};

const Trigger = ({
  children,
  className,
  testId = 'popover-trigger',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const { isOpen, setIsOpen, setTriggerRect } = useContext(PopoverContext);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const updateTriggerRect = () => {
    if (triggerRef.current) {
      const { top, left, height, width } = triggerRef.current.getBoundingClientRect();
      setTriggerRect({ top, left, height, width });
    }
  };

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      window.addEventListener('resize', updateTriggerRect);
      window.addEventListener('scroll', updateTriggerRect);
    } else {
      window.removeEventListener('resize', updateTriggerRect);
      window.removeEventListener('scroll', updateTriggerRect);
    }

    return () => {
      window.removeEventListener('resize', updateTriggerRect);
      window.removeEventListener('scroll', updateTriggerRect);
    };
  }, [isOpen, triggerRef.current]);

  const handleClick = () => {
    updateTriggerRect();
    setIsOpen(!isOpen);
  };

  return (
    <button
      className={cn('hover:cursor-pointer', className)}
      onClick={handleClick}
      ref={triggerRef}
      data-testid={testId}
    >
      {children}
    </button>
  );
};
Popover.Trigger = Trigger;

interface ContentProps extends BaseComponentProps, PropsWithChildren {
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}

const Content = ({
  children,
  className,
  side = 'bottom',
  sideOffset = 8,
  testId = 'popover-content',
}: ContentProps): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentRect, setContentRect] = useState<Pick<DOMRect, 'height' | 'width'>>({
    height: 0,
    width: 0,
  });
  const { height: contentHeight, width: contentWidth } = contentRect;
  const { isOpen, setIsOpen, triggerRect } = useContext(PopoverContext);
  const {
    top: triggerTop,
    left: triggerLeft,
    height: triggerHeight,
    width: triggerWidth,
  } = triggerRect;

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const { height, width } = contentRef.current.getBoundingClientRect();
      setContentRect({ height, width });
    }
  }, [isOpen, contentRef.current]);

  const { top, left } = useMemo(() => {
    switch (side) {
      case 'top':
        return {
          top: triggerTop - contentHeight - sideOffset,
          left: triggerLeft + (triggerWidth - contentWidth) / 2,
        };
      case 'right': {
        return {
          top: triggerTop + (triggerHeight - contentHeight) / 2,
          left: triggerLeft + triggerWidth + sideOffset,
        };
      }
      case 'left': {
        return {
          top: triggerTop + (triggerHeight - contentHeight) / 2,
          left: triggerLeft - contentWidth - sideOffset,
        };
      }
      case 'bottom':
      default: {
        return {
          top: triggerTop + triggerHeight + sideOffset,
          left: triggerLeft + (triggerWidth - contentWidth) / 2,
        };
      }
    }
  }, [
    triggerTop,
    triggerLeft,
    triggerHeight,
    triggerWidth,
    contentHeight,
    contentWidth,
    side,
    sideOffset,
  ]);

  const isHidden = !isOpen;
  const isVisible = isOpen && contentHeight > 0 && contentWidth > 0;

  return (
    <>
      <Backdrop
        className={cn('bg-transparent', { hidden: isHidden })}
        onClick={() => setIsOpen(false)}
        testId={`${testId}-backdrop`}
      />
      <div
        className={cn(
          'fixed top-0 left-0 z-1001',
          { hidden: isHidden },
          { invisible: !isVisible },
          className,
        )}
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
