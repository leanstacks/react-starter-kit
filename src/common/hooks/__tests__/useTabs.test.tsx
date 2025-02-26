import { PropsWithChildren } from 'react';
import { describe, expect, it } from 'vitest';
import { renderHook as renderHookWithoutWrapper } from '@testing-library/react';

import { renderHook, waitFor } from 'test/test-utils';
import Tabs from 'common/components/Tabs/Tabs';

import { useTabs } from '../useTabs';

const TabsWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  return <Tabs defaultValue="one">{children}</Tabs>;
};

describe('useTabs', () => {
  it('should return the context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useTabs(), { wrapper: TabsWrapper });
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.value).toBe('one');
    expect(result.current.setValue).toBeDefined();
    expect(typeof result.current.setValue).toBe('function');
  });

  it('should throw an error when used outside of Tabs', async () => {
    // ASSERT
    expect(() => renderHookWithoutWrapper(() => useTabs())).toThrow(
      /useTabs hook must be used in a child of the Tabs component/i,
    );
  });
});
