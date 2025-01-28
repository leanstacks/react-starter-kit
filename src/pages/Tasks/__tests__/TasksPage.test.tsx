import { render, screen } from 'test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import * as UseGetCurrentUser from 'common/api/useGetCurrentUser';
import { User } from 'common/api/useGetUser';
import { userFixture1 } from '__fixtures__/users';

import TasksPage from '../TasksPage';

describe('TasksPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TasksPage />);
    await screen.findByTestId('page-tasks');

    // ASSERT
    expect(screen.getByTestId('page-tasks')).toBeDefined();
  });

  it('should content when user loaded', async () => {
    // ARRANGE
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
      error: null,
      isLoading: false,
    } as unknown as UseQueryResult<User, Error>);
    render(<TasksPage />);
    await screen.findByTestId('page-tasks-content');

    // ASSERT
    expect(screen.getByTestId('page-tasks-content')).toBeDefined();
  });
});
