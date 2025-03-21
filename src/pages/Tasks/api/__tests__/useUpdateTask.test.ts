import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { queryClient } from 'test/query-client';
import { todosFixture } from '__fixtures__/todos';
import { QueryKey } from 'common/utils/constants';
import { Task } from '../useGetUserTasks';

import { useUpdateTask } from '../useUpdateTask';

describe('useUpdateTask', () => {
  it('should update task', async () => {
    // ARRANGE
    const updatedTask = todosFixture[0];
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: updatedTask },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
  });

  it('should create cached data when none exists', async () => {
    // ARRANGE
    const updatedTask = todosFixture[0];
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: updatedTask },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    expect(queryClient.getQueryData([QueryKey.Tasks, { userId: updatedTask.userId }])).toEqual([
      updatedTask,
    ]);
  });

  it('should update cached data when exists', async () => {
    // ARRANGE
    const updatedTask = todosFixture[0];
    queryClient.setQueryData([QueryKey.Tasks, { userId: updatedTask.userId }], todosFixture);
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: updatedTask },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    expect(
      queryClient.getQueryData<Task[]>([QueryKey.Tasks, { userId: updatedTask.userId }])?.length,
    ).toEqual(todosFixture.length);
  });
});
