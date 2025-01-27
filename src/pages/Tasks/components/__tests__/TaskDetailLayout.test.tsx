import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import * as UseDeleteTask from 'pages/Tasks/api/useDeleteTask';
import * as UseGetTask from 'pages/Tasks/api/useGetTask';
import { Task } from 'pages/Tasks/api/useGetUserTasks';

import TaskDetailLayout from '../TaskDetailLayout';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useParams: () => ({
      taskId: '1',
    }),
  };
});

describe('TaskDetail', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskDetailLayout />);
    await screen.findByTestId('layout-task-detail');

    // ASSERT
    expect(screen.getByTestId('layout-task-detail')).toBeDefined();
  });

  it('should display a task', async () => {
    // ARRANGE
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-task-view');

    // ASSERT
    expect(screen.getByTestId('component-task-view')).toBeDefined();
  });

  it('should display task error', async () => {
    // ARRANGE
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: undefined,
      error: new Error(),
      isLoading: false,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-error-task');

    // ASSERT
    expect(screen.getByTestId('component-error-task')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-loading');

    // ASSERT
    expect(screen.getByTestId('component-loading')).toBeDefined();
  });

  it('should navigate back using close button', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-button-close');

    // ACT
    await user.click(screen.getByTestId('component-button-close'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should display task delete error', async () => {
    // ARRANGE
    const useDeleteTaskSpy = vi.spyOn(UseDeleteTask, 'useDeleteTask');
    useDeleteTaskSpy.mockReturnValue({
      data: undefined,
      error: new Error(),
      isLoading: false,
    } as unknown as UseMutationResult<void, Error, UseDeleteTask.DeleteTaskVariables>);
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-error-delete');

    // ASSERT
    expect(screen.getByTestId('component-error-delete')).toBeDefined();
  });

  it('should show the delete dialog', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('dialog-task-delete');
    expect(screen.getByTestId('dialog-task-delete')).toHaveClass('hidden');

    // ACT
    await user.click(screen.getByTestId('component-button-delete'));

    // ASSERT
    expect(screen.getByTestId('dialog-task-delete')).not.toHaveClass('hidden');
  });

  it('should hide the delete dialog when cancel clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('dialog-task-delete');
    expect(screen.getByTestId('dialog-task-delete')).toHaveClass('hidden');

    // ACT
    await user.click(screen.getByTestId('component-button-delete'));
    expect(screen.getByTestId('dialog-task-delete')).not.toHaveClass('hidden');

    await user.click(screen.getByTestId('dialog-task-delete-button-cancel'));

    // ASSERT
    expect(screen.getByTestId('dialog-task-delete')).toHaveClass('hidden');
  });

  it('should hide the delete dialog when backdrop clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('dialog-task-delete');
    expect(screen.getByTestId('dialog-task-delete')).toHaveClass('hidden');

    // ACT
    await user.click(screen.getByTestId('component-button-delete'));
    expect(screen.getByTestId('dialog-task-delete')).not.toHaveClass('hidden');

    await user.click(screen.getByTestId('dialog-task-delete-backdrop'));

    // ASSERT
    expect(screen.getByTestId('dialog-task-delete')).toHaveClass('hidden');
  });

  it('should delete a task', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-button-delete');

    // ACT
    await user.click(screen.getByTestId('component-button-delete'));
    await user.click(screen.getByTestId('dialog-task-delete-button-delete'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
