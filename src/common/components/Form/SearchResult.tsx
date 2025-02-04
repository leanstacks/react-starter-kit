import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `SearchResult` React component.
 * @param {function} onClick - Function invoked when this `SearchResult` is clicked.
 * @see {@link PropsWithChildren}
 * @see {@link BaseComponentProps}
 */
export interface SearchResultProps extends BaseComponentProps, PropsWithChildren {
  onClick: () => void;
}

/**
 * The `SearchResult` component renders a single result item for a `SearchField`.
 *
 * This component is **always** used in conjunction with a `SearchField`,
 * specifically in the `renderSearchResults` render function.
 * @param {SearchResultProps} props - Component properties, `SearchResultProps`.
 * @returns {JSX.Element} JSX
 */
const SearchResult = ({
  children,
  className,
  onClick,
  testId = 'search-result',
}: SearchResultProps): JSX.Element => {
  return (
    <div
      className={classNames(
        'flex cursor-pointer items-center px-2 py-1 hover:bg-neutral-500/25',
        className,
      )}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default SearchResult;
