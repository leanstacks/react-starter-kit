import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Label from '../Label';

describe('Label', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Label>Label Value</Label>);
    await screen.findByTestId('label');

    // ASSERT
    expect(screen.getByTestId('label')).toBeDefined();
  });
});
