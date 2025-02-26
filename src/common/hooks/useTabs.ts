import { useContext } from 'react';

import { TabsContext, TabsContextValue } from 'common/providers/TabsContext';

export const useTabs = (): TabsContextValue => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('The useTabs hook must be used in a child of the Tabs component.');
  }
  return context;
};
