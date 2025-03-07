import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import { default as CommonLink, LinkProps as CommonLinkProps } from 'common/components/Link/Link';
import FAIcon, { FAIconProps } from '../Icon/FAIcon';

/**
 * The `Breadcrumbs` component renders a heirarchy of links as a path to the
 * current route.
 */
const Breadcrumbs = ({
  children,
  className,
  testId = 'breadcrumbs',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <nav className={cn(className)} aria-label="breadcrumbs" data-testid={testId}>
      {children}
    </nav>
  );
};

const List = ({
  children,
  className,
  testId = 'breadcrumbs-list',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <ol
      className={cn('flex flex-wrap items-center gap-2 text-sm break-words sm:gap-3', className)}
      data-testid={testId}
    >
      {children}
    </ol>
  );
};
Breadcrumbs.List = List;

const Item = ({
  children,
  className,
  testId = 'breadcrumbs-item',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <li className={cn(className)} data-testid={testId}>
      {children}
    </li>
  );
};
Breadcrumbs.Item = Item;

const Link = ({
  children,
  className,
  testId = 'breadcrumbs-link',
  ...props
}: CommonLinkProps): JSX.Element => {
  return (
    <CommonLink
      className={cn(
        'text-light-text dark:text-dark-text block max-w-40 truncate opacity-90',
        className,
      )}
      data-testid={testId}
      {...props}
    >
      {children}
    </CommonLink>
  );
};
Breadcrumbs.Link = Link;

const Page = ({
  children,
  className,
  testId = 'breadcrumbs-page',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <span className={cn('block max-w-40 truncate font-bold', className)} data-testid={testId}>
      {children}
    </span>
  );
};
Breadcrumbs.Page = Page;

const Separator = ({
  className,
  icon = 'chevronRight',
  size = 'sm',
  testId = 'breadcrumbs-separator',
  ...iconProps
}: BaseComponentProps &
  Omit<FAIconProps, 'icon'> &
  Partial<Pick<FAIconProps, 'icon'>>): JSX.Element => {
  return (
    <li className={cn(className)} data-testid={testId}>
      <FAIcon icon={icon} size={size} className="size-4" {...iconProps} testId={`${testId}-icon`} />
    </li>
  );
};
Breadcrumbs.Separator = Separator;

const Ellipsis = ({
  className,
  testId = 'breadcrumbs-ellipsis',
}: BaseComponentProps): JSX.Element => {
  return (
    <span className={cn(className)} data-testid={testId}>
      <FAIcon icon="ellipsis" className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
};
Breadcrumbs.Ellipsis = Ellipsis;

export default Breadcrumbs;
