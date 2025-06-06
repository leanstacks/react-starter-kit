import { useMutation, useQueryClient } from '@tanstack/react-query';
import reject from 'lodash/reject';

import { QueryKey } from 'common/utils/constants';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { useConfig } from 'common/hooks/useConfig';
import { useAxios } from 'common/hooks/useAxios';

/**
 * The `useUpdateTask` mutation function variables.
 */
export type UpdateTaskVariables = {
  task: Task;
};

/**
 * An API hook which updates a single `Task`. Returns a `UseMutationResult`
 * object whose `mutate` attribute is a function to update a `Task`.
 *
 * When successful, the hook updates cached `Task` query data.
 * @returns Returns a `UseMutationResult`.
 */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const config = useConfig();
  const axios = useAxios();

  /**
   * Update a `Task`.
   * @param {UpdateTaskVariables} variables - The mutation function variables.
   * @returns The updated `Task` object.
   */
  const updateTask = async ({ task }: UpdateTaskVariables): Promise<Task> => {
    const response = await axios.request({
      method: 'put',
      url: `${config.VITE_BASE_URL_API}/todos/${task.id}`,
      data: task,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (data, variables) => {
      // update the cached task list
      queryClient.setQueryData<Task[]>(
        [QueryKey.Tasks, { userId: variables.task.userId }],
        (cachedTasks) => (cachedTasks ? [...reject(cachedTasks, { id: data.id }), data] : [data]),
      );
      // update the cache for this task
      queryClient.setQueryData<Task>([QueryKey.Tasks, data.id], () => data);
    },
  });
};
