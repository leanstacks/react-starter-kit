import { useContext } from 'react';

import { TabsContext, TabsContextValue } from 'common/providers/TabsContext';

/**
 * The `useTabs` hook returns the current `TabsContextValue` value. This hook
 * is used within the `Tabs` family of components to access and mutate the
 * shared state of the tabs.
 * @returns {TabsContextValue} The current `TabsContextValue` value.
 */
export const useTabs = (): TabsContextValue => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('The useTabs hook must be used in a child of the Tabs component.');
  }

  return context;
};
