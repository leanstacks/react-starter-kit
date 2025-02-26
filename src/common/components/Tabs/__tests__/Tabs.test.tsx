import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Tabs from '../Tabs';

describe('Tabs', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Tabs defaultValue="one"></Tabs>);
    await screen.findByTestId('tabs');

    // ASSERT
    expect(screen.getByTestId('tabs')).toBeDefined();
  });
});
