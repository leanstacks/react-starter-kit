import { createContext } from 'react';

/**
 * Defines the shape of the `TabsContext` value.
 */
export type TabsContextValue = {
  setValue: (value: string) => void;
  value: string;
};

/**
 * The `TabsContext` instance.
 */
export const TabsContext = createContext<TabsContextValue | undefined>(undefined);
