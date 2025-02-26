import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Backdrop from '../Backdrop/Backdrop';
import Divider, { DividerProps } from '../Divider/Divider';

type DropdownMenuContextValue = {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | undefined>(undefined);

const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('The useDropdownMenu hook must be used within a DropdownMenu.');
  }

  return context;
};

export interface DropdownMenuProps extends BaseComponentProps, PropsWithChildren {}

const DropdownMenu = ({
  children,
  className,
  testId = 'dropdown-menu',
}: DropdownMenuProps): JSX.Element => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={cn('relative', className)} data-testid={testId}>
      <DropdownMenuContext.Provider value={{ isHidden, setIsHidden }}>
        {children}
      </DropdownMenuContext.Provider>
    </div>
  );
};

const Trigger = ({
  children,
  className,
  testId = 'dropdown-menu-trigger',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  const { isHidden, setIsHidden } = useDropdownMenu();

  return (
    <div
      role="button"
      className={cn('cursor-pointer hover:opacity-80', className)}
      onClick={() => setIsHidden(!isHidden)}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
DropdownMenu.Trigger = Trigger;

const Content = ({
  children,
  className,
  testId = 'dropdown-menu-content',
}: BaseComponentProps & PropsWithChildren) => {
  const { isHidden, setIsHidden } = useDropdownMenu();

  return (
    <>
      <Backdrop
        className={cn('bg-transparent', { hidden: isHidden })}
        onClick={() => setIsHidden(true)}
        testId={`${testId}-backdrop`}
      />
      <div
        role="menu"
        className={cn(
          'absolute right-0 z-1001 min-w-32 rounded-md border border-neutral-500 bg-white p-1 dark:bg-neutral-800',
          { hidden: isHidden },
          className,
        )}
        data-testid={testId}
      >
        {children}
      </div>
    </>
  );
};
DropdownMenu.Content = Content;

interface ItemProps extends BaseComponentProps, PropsWithChildren {
  onClick?: () => void;
}

const Item = ({
  children,
  className,
  onClick,
  testId = 'dropdown-menu-item',
}: ItemProps): JSX.Element => {
  const { isHidden, setIsHidden } = useDropdownMenu();

  const handleClick = () => {
    onClick?.();
    setIsHidden(!isHidden);
  };

  return (
    <div
      role="menuitem"
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-500/25',
        className,
      )}
      onClick={handleClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
DropdownMenu.Item = Item;

const Heading = ({
  children,
  className,
  testId = 'dropdown-menu-heading',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <div className={cn('px-2 py-1.5 text-sm font-bold', className)} data-testid={testId}>
      {children}
    </div>
  );
};
DropdownMenu.Heading = Heading;

const Separator = ({
  className,
  testId = 'dropdown-menu-separator',
}: DividerProps): JSX.Element => {
  return <Divider className={cn('-mx-1 my-1', className)} testId={testId} />;
};
DropdownMenu.Separator = Separator;

export default DropdownMenu;
