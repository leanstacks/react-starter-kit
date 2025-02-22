import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import Alert from '../Alert';

describe('Alert', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Alert />);
    await screen.findByTestId('alert');

    // ASSERT
    expect(screen.getByTestId('alert')).toBeDefined();
  });

  it('should use custom test ID', async () => {
    // ARRANGE
    render(<Alert testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    expect(screen.queryByTestId('alert')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Alert className="custom-class" />);
    await screen.findByTestId('alert');

    // ASSERT
    expect(screen.getByTestId('alert').classList).toContain('custom-class');
  });

  it('should render the Info variant', async () => {
    // ARRANGE
    render(<Alert variant="info" />);
    await screen.findByTestId('alert');

    // ASSERT
    expect(screen.getByTestId('alert').classList).toContain('bg-neutral-200/90');
  });

  it('should render the Warning variant', async () => {
    // ARRANGE
    render(<Alert variant="warning" />);
    await screen.findByTestId('alert');

    // ASSERT
    expect(screen.getByTestId('alert').classList).toContain('bg-amber-400/90');
  });

  it('should render the Danger variant', async () => {
    // ARRANGE
    render(<Alert variant="danger" />);
    await screen.findByTestId('alert');

    // ASSERT
    expect(screen.getByTestId('alert').classList).toContain('bg-red-800/90');
  });

  it('should render the Success variant', async () => {
    // ARRANGE
    render(<Alert variant="success" />);
    await screen.findByTestId('alert');

    // ASSERT
    expect(screen.getByTestId('alert').classList).toContain('bg-green-800/90');
  });

  it('should render the Info variant when variant not specified', async () => {
    // ARRANGE
    render(<Alert />);
    await screen.findByTestId('alert');

    // ASSERT
    expect(screen.getByTestId('alert').classList).toContain('bg-neutral-200/90');
  });

  it('should have role=alert', async () => {
    // ARRANGE
    render(<Alert />);
    await screen.findByTestId('alert');

    // ASSERT
    expect(screen.getByTestId('alert').getAttribute('role')).toBe('alert');
  });
});
