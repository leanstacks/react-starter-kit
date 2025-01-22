import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { BaseComponentProps } from 'common/utils/types';
import { useGetUsers } from '../api/useGetUsers';
import UserListItem from './UserListItem';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

/**
 * Properties for the `UserList` component.
 * @see {@link BaseComponentProps}
 */
interface UserListProps extends BaseComponentProps {}

/**
 * The `UserList` React component renders a list of `User` objects with the
 * `UserListItem` component.
 * @param {UserListProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserList = ({ className, testId = 'list-users' }: UserListProps): JSX.Element => {
  const { userId } = useParams();
  const { data: users, error, isPending } = useGetUsers();

  return (
    <div
      className={classNames('flex h-full flex-col overflow-y-auto', className)}
      data-testid={testId}
    >
      {isPending && (
        <>
          <LoaderSkeleton className="my-2 h-16" />
          <LoaderSkeleton className="my-2 h-16" />
          <LoaderSkeleton className="my-2 h-16" />
          <LoaderSkeleton className="my-2 h-16" />
          <LoaderSkeleton className="my-2 h-16" />
        </>
      )}
      {users &&
        users.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            isActive={user.id === Number(userId)}
            testId={`list-item-user-${user.id}`}
          />
        ))}
      {!!error && (
        <div className="text-red-600" data-testid={`${testId}-error`}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default UserList;
