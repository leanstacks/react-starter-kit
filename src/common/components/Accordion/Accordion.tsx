import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import noop from 'lodash/noop';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import FAIcon from '../Icon/FAIcon';

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

interface ItemProps extends BaseComponentProps, PropsWithChildren {
  value: string;
}

type AccordionItemContextValue = {
  value: string;
};

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: '',
});

const Item = ({
  children,
  className,
  value,
  testId = 'accordion-item',
}: ItemProps): JSX.Element => {
  const { addItem, removeItem } = useContext(AccordionContext);
  useEffect(() => {
    addItem(value);
    return () => {
      removeItem(value);
    };
  }, [value]);

  return (
    <div className={cn('border-b border-neutral-500/50', className)} data-testid={testId}>
      <AccordionItemContext.Provider value={{ value }}>{children}</AccordionItemContext.Provider>
    </div>
  );
};
Accordion.Item = Item;

const Trigger = ({
  children,
  className,
  testId = 'accordion-trigger',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const { activeItem, setActiveItem } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);
  const isOpen = activeItem === value;

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
  const { activeItem } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);
  const isOpen = activeItem === value;

  return (
    <div
      className={cn('pb-4', { hidden: !isOpen }, className)}
      data-state={isOpen ? 'open' : 'closed'}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
Accordion.Content = Content;

export default Accordion;
