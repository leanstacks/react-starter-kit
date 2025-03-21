import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import noop from 'lodash/noop';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import FAIcon from '../Icon/FAIcon';
import { animated, useSpring } from '@react-spring/web';

export interface AccordionProps extends BaseComponentProps, PropsWithChildren {}

type AccordionContextValue = {
  items: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
};

const AccordionContext = createContext<AccordionContextValue>({
  items: [],
  addItem: noop,
  removeItem: noop,
  activeItem: '',
  setActiveItem: noop,
});

const Accordion = ({ children, className, testId = 'accordion' }: AccordionProps): JSX.Element => {
  const [activeItem, setActiveItem] = useState('');
  let items: string[] = [];
  const addItem = (item: string): void => {
    if (!items.includes(item)) {
      items.push(item);
    }
  };
  const removeItem = (item: string): void => {
    items = items.filter((i) => i !== item);
  };

  return (
    <div className={cn(className)} data-testid={testId}>
      <AccordionContext.Provider value={{ items, addItem, removeItem, activeItem, setActiveItem }}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

type AccordionItemContextValue = {
  isOpen: boolean;
  value: string;
};

const AccordionItemContext = createContext<AccordionItemContextValue>({
  isOpen: false,
  value: '',
});

interface ItemProps extends BaseComponentProps, PropsWithChildren {
  value: string;
}

const Item = ({
  children,
  className,
  value,
  testId = 'accordion-item',
}: ItemProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeItem, addItem, removeItem } = useContext(AccordionContext);

  /**
   * When the component mounts, add the item to the list of items.
   */
  useEffect(() => {
    addItem(value);
    return () => {
      removeItem(value);
    };
  }, [value]);

  /**
   * When the active item changes, update the "isOpen" state.
   */
  useEffect(() => {
    if (value === activeItem) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [activeItem, value]);

  return (
    <div className={cn('border-b border-neutral-500/50', className)} data-testid={testId}>
      <AccordionItemContext.Provider value={{ isOpen, value }}>
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
};
Accordion.Item = Item;

const Trigger = ({
  children,
  className,
  testId = 'accordion-trigger',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const { setActiveItem } = useContext(AccordionContext);
  const { isOpen, value } = useContext(AccordionItemContext);

  const handleClick = () => {
    if (isOpen) {
      setActiveItem('');
    } else {
      setActiveItem(value);
    }
  };

  return (
    <h5 className={cn(className)} data-testid={testId}>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-2 py-4 font-medium hover:underline data-[state=open]:[&>svg]:rotate-180"
        onClick={handleClick}
        data-state={isOpen ? 'open' : 'closed'}
      >
        {children}
        <FAIcon icon="chevronDown" size="sm" />
      </button>
    </h5>
  );
};
Accordion.Trigger = Trigger;

const Content = ({
  children,
  className,
  testId = 'accordion-content',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [springs, api] = useSpring(() => ({
    height: 0,
  }));
  const { isOpen } = useContext(AccordionItemContext);

  /**
   * When the content changes, update the height of the content.
   */
  useEffect(() => {
    setContentHeight(contentRef.current?.scrollHeight || 0);
  }, [children]);

  /**
   * When the "isOpen" state changes, animate the height of the content.
   */
  useEffect(() => {
    api.start({
      from: { height: isOpen ? 0 : contentHeight },
      to: { height: isOpen ? contentHeight : 0 },
    });
  }, [isOpen]);

  return (
    <animated.div
      className={cn('overflow-hidden', className)}
      style={{ ...springs }}
      data-state={isOpen ? 'open' : 'closed'}
      data-testid={testId}
    >
      <div ref={contentRef} className="pb-4">
        {children}
      </div>
    </animated.div>
  );
};
Accordion.Content = Content;

export default Accordion;
