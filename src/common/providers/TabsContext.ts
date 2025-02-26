import { createContext } from 'react';

export type TabsContextValue = {
  setValue: (value: string) => void;
  value: string;
};

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);
