import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import noop from 'lodash/noop';
import { animated, useSpring } from '@react-spring/web';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import FAIcon from '../Icon/FAIcon';

/**
 * Defines the shape of the `AccordionContext` value.
 */
type AccordionContextValue = {
  items: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
};

/**
 * The `AccordionContext` instance.
 */
const AccordionContext = createContext<AccordionContextValue>({
  items: [],
  addItem: noop,
  removeItem: noop,
  activeItem: '',
  setActiveItem: noop,
});

/**
 * Properties for the `Accordion` component.
 */
export interface AccordionProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Accordion` component organizes content into vertically stacked sections.
 * Each section has a heading which, when clicked, reveals the content.
 * 
 * **Example:**
 * ```
  <Accordion className="w-full">
    <Accordion.Item value="section-1">
      <Accordion.Trigger>Section 1</Accordion.Trigger>
      <Accordion.Content>Content for section 1.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="section-2">
      <Accordion.Trigger>Section 2</Accordion.Trigger>
      <Accordion.Content>Content for section 2.</Accordion.Content>
    </Accordion.Item>
  </Accordion>
 * ```
 */
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

/**
 * Defines the shape of the `AccordionItemContext` value.
 */
type AccordionItemContextValue = {
  isOpen: boolean;
  value: string;
};

/**
 * The `AccordionItemContext` instance.
 */
const AccordionItemContext = createContext<AccordionItemContextValue>({
  isOpen: false,
  value: '',
});

/**
 * Properties for the `Item` component.
 */
interface ItemProps extends BaseComponentProps, PropsWithChildren {
  value: string;
}

/**
 * The `Item` component represents a single item in the `Accordion`. It contains
 * a `Trigger` and `Content`.
 */
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

/**
 * The `Trigger` component represents the trigger for an `Item`. When clicked,
 * it will open or close the `Content`.
 */
const Trigger = ({
  children,
  className,
  testId = 'accordion-trigger',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const { setActiveItem } = useContext(AccordionContext);
  const { isOpen, value } = useContext(AccordionItemContext);
  const [springs, api] = useSpring(() => ({
    rotate: isOpen ? '180deg' : '0deg',
  }));

  /**
   * When the "isOpen" state changes, animate the rotation of the chevron.
   */
  useEffect(() => {
    api.start({ rotate: isOpen ? '180deg' : '0deg' });
  }, [isOpen]);

  /**
   * When the trigger is clicked, update the active item.
   */
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
        <animated.span style={{ ...springs }}>
          <FAIcon icon="chevronDown" size="sm" />
        </animated.span>
        {/* <FAIcon icon="chevronDown" size="sm" /> */}
      </button>
    </h5>
  );
};
Accordion.Trigger = Trigger;

/**
 * The `Content` component represents the content of an `Item`. When the `Item`
 * is open, the content will be displayed.
 */
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
