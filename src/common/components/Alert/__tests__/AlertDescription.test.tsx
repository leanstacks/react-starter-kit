import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import AlertDescription from '../AlertDescription';

describe('AlertDescription', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AlertDescription>children</AlertDescription>);
    await screen.findByTestId('alert-description');

    // ASSERT
    expect(screen.getByTestId('alert-description')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<AlertDescription testId="component">children</AlertDescription>);
    await screen.findByTestId('component');

    // ASSERT
    expect(screen.getByTestId('component')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<AlertDescription className="class-name">children</AlertDescription>);
    await screen.findByTestId('alert-description');

    // ASSERT
    expect(screen.getByTestId('alert-description')).toHaveClass('class-name');
  });

  it('should render children', async () => {
    // ARRANGE
    render(<AlertDescription>children</AlertDescription>);
    await screen.findByTestId('alert-description');

    // ASSERT
    expect(screen.getByTestId('alert-description')).toHaveTextContent('children');
  });
});
