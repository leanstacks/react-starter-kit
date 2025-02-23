import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import AlertHeader from '../AlertHeader';

describe('AlertHeader', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AlertHeader>children</AlertHeader>);
    await screen.findByTestId('alert-header');

    // ASSERT
    expect(screen.getByTestId('alert-header')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<AlertHeader testId="component">children</AlertHeader>);
    await screen.findByTestId('component');

    // ASSERT
    expect(screen.getByTestId('component')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<AlertHeader className="class-name">children</AlertHeader>);
    await screen.findByTestId('alert-header');

    // ASSERT
    expect(screen.getByTestId('alert-header')).toHaveClass('class-name');
  });

  it('should render children', async () => {
    // ARRANGE
    render(<AlertHeader>children</AlertHeader>);
    await screen.findByTestId('alert-header');

    // ASSERT
    expect(screen.getByTestId('alert-header')).toHaveTextContent('children');
  });
});
