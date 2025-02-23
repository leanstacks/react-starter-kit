import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import AlertTitle from '../AlertTitle';

describe('AlertTitle', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AlertTitle>children</AlertTitle>);
    await screen.findByTestId('alert-title');

    // ASSERT
    expect(screen.getByTestId('alert-title')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<AlertTitle testId="component">children</AlertTitle>);
    await screen.findByTestId('component');

    // ASSERT
    expect(screen.getByTestId('component')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<AlertTitle className="class-name">children</AlertTitle>);
    await screen.findByTestId('alert-title');

    // ASSERT
    expect(screen.getByTestId('alert-title')).toHaveClass('class-name');
  });

  it('should render children', async () => {
    // ARRANGE
    render(<AlertTitle>children</AlertTitle>);
    await screen.findByTestId('alert-title');

    // ASSERT
    expect(screen.getByTestId('alert-title')).toHaveTextContent('children');
  });
});
