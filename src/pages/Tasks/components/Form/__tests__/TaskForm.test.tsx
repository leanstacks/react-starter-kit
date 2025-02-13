import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import TaskForm from '../TaskForm';

describe('TaskForm', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskForm />);
    await screen.findByTestId('task-form');

    // ASSERT
    expect(screen.getByTestId('task-form')).toBeDefined();
  });

  it('should call onCancel when cancelled', async () => {
    // ARRANGE
    const onCancelSpy = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm onCancel={onCancelSpy} />);
    await screen.findByTestId('task-form-button-cancel');

    // ACT
    await user.click(screen.getByTestId('task-form-button-cancel'));

    // ASSERT
    expect(onCancelSpy).toHaveBeenCalled();
  });

  it('should call onSubmit when cancelled', async () => {
    // ARRANGE
    const onSubmitSpy = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm onSubmit={onSubmitSpy} />);
    await screen.findByTestId('task-form-button-submit');

    // ACT
    await user.type(screen.getByTestId('task-form-input-title-input'), 'do this thing');
    await user.click(screen.getByTestId('task-form-button-submit'));

    // ASSERT
    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should display error', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskForm task={{ title: '500' }} />);
    await screen.findByTestId('task-form-button-submit');

    // ACT
    await user.click(screen.getByTestId('task-form-button-submit'));

    // ASSERT
    expect(screen.getByTestId('task-form-error')).toBeDefined();
  });
});
