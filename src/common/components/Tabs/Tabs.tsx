import { PropsWithChildren, useState } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { TabsContext, TabsContextValue } from 'common/providers/TabsContext';

/**
 * Properties for the `TabsProvider` component.
 */
interface TabsProviderProps extends PropsWithChildren, Pick<TabsContextValue, 'value'> {}

/**
 * The `TabsProvider` component renders a React Context Provider which provides access
 * to the the value of the `TabsContext`, i.e. the `TabsContextValue`.
 */
const TabsProvider = ({ children, value }: TabsProviderProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>(value);

  const contextValue: TabsContextValue = {
    setValue: setSelectedTab,
    value: selectedTab,
  };
  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
};

/**
 * Properties for the `Tabs` component.
 * @param defaultValue - The default (or initial) active tab.
 */
export interface TabsProps extends BaseComponentProps, PropsWithChildren {
  defaultValue: string;
}

/**
 * The `Tabs` component is a wrapper for rendering tabbed content. Compose tabbed
 * content using: `Tabs`, `TabList`, `Tab`, and `TabContent` as illustrated in
 * the example.
 *
 * Note: The `defaultValue` property must match the `value` of one of the Tab
 * components.
 *
 * *Example:*
 * ```
 * <Tabs defaultValue="list" className="w-full">
 *   <TabList>
 *     <Tab value="list">List</Tab>
 *     <Tab value="detail">Detail</Tab>
 *   </TabList>
 *   <TabContent value="list" className="py-8">
 *     <div className="font-bold">I am the LIST tab.</div>
 *   </TabContent>
 *   <TabContent value="detail" className="py-8">
 *     <div className="font-bold">I am the DETAIL tab.</div>
 *   </TabContent>
 * </Tabs>
 * ```
 */
const Tabs = ({ children, className, defaultValue, testId = 'tabs' }: TabsProps): JSX.Element => {
  return (
    <div className={cn(className)} data-testid={testId}>
      <TabsProvider value={defaultValue}>{children}</TabsProvider>
    </div>
  );
};

export default Tabs;
