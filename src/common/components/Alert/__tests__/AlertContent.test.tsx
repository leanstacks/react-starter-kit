import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import AlertContent from '../AlertContent';

describe('AlertContent', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AlertContent />);
    await screen.findByTestId('alert-content');

    // ASSERT
    expect(screen.getByTestId('alert-content')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<AlertContent testId="component" />);
    await screen.findByTestId('component');

    // ASSERT
    expect(screen.getByTestId('component')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<AlertContent className="class-name" />);
    await screen.findByTestId('alert-content');

    // ASSERT
    expect(screen.getByTestId('alert-content')).toHaveClass('class-name');
  });
});
