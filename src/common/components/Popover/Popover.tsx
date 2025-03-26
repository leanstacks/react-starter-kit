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
    console.log(
      `Trigger::setTriggerPosition::top: ${top}::left: ${left}::height: ${height}::width: ${width}`,
    );
    setTriggerRect({ top, left, height, width });
  };

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      window.addEventListener('resize', setTriggerPosition);
      window.addEventListener('scroll', setTriggerPosition);
      // setTriggerPosition();
    } else {
      window.removeEventListener('resize', setTriggerPosition);
      window.removeEventListener('scroll', setTriggerPosition);
    }

    return () => {
      window.removeEventListener('resize', setTriggerPosition);
      window.removeEventListener('scroll', setTriggerPosition);
    };
  }, [isOpen, triggerRef.current]);

  const handleClick = () => {
    console.log('Trigger::handleClick');
    setTriggerPosition();
    setIsOpen(!isOpen);
  };

  return (
    <div ref={triggerRef}>
      <Button
        className={className}
        onClick={handleClick}
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
    console.log('Content::useEffect');
    const { height, width } = contentRef.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
    };
    setContentRect({ height, width });
  }, [isOpen, contentRef.current]);

  const { top, left } = useMemo(() => {
    console.log(
      `Content::useMemo::triggerTop: ${triggerTop}::triggerLeft: ${triggerLeft}::triggerHeight: ${triggerHeight}::triggerWidth: ${triggerWidth}::contentHeight: ${contentHeight}::contentWidth: ${contentWidth}::side: ${side}`,
    );
    switch (side) {
      case 'top':
        return {
          top: triggerTop - contentHeight - 8,
          left: triggerLeft,
        };
      case 'right': {
        return {
          top: triggerTop,
          left: triggerLeft + triggerWidth + 8,
        };
      }
      case 'left': {
        return {
          top: triggerTop,
          left: triggerLeft - contentWidth - 8,
        };
      }
      case 'bottom':
      default: {
        return {
          top: triggerTop + triggerHeight + 8,
          left: triggerLeft,
        };
      }
    }
  }, [triggerTop, triggerLeft, triggerHeight, triggerWidth, contentHeight, contentWidth, side]);

  const isHidden = !isOpen;
  const isVisible = isOpen && contentHeight > 0 && contentWidth > 0;
  console.log(`Content::isHidden: ${isHidden}`);
  console.log(`Content::top: ${top}`);
  console.log(`Content::left: ${left}`);

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
