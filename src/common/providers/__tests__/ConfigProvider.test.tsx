import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import ConfigContextProvider from 'common/providers/ConfigProvider';

describe('ConfigProvider', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <ConfigContextProvider>
        <div data-testid="provider-config"></div>
      </ConfigContextProvider>,
    );
    await screen.findByTestId('provider-config');

    // ASSERT
    expect(screen.getByTestId('provider-config')).toBeDefined();
  });
});
