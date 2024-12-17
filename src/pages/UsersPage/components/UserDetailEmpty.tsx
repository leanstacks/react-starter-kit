import { BaseComponentProps } from 'common/utils/types';
import MessageCard from 'common/components/Card/MessageCard';

/**
 * Properties for the `UserDetailEmpty` component.
 * @see {@link BaseComponentProps}
 */
interface UserDetailEmptyProps extends BaseComponentProps {}

/**
 * The `UserDetailEmpty` component renders a message when there is no specific
 * `User` selected.
 * @param {UserDetailEmptyProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserDetailEmpty = ({
  className,
  testId = 'user-detail-empty',
}: UserDetailEmptyProps): JSX.Element => {
  return (
    <div className={className} data-testid={testId}>
      <MessageCard
        className="mx-auto"
        iconProps={{ icon: 'circleInfo', size: '2x' }}
        message="Select a user from the list to view details."
        testId={`${testId}-card-message`}
      />
    </div>
  );
};

export default UserDetailEmpty;
