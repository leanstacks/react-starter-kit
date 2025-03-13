import { lazy } from 'react';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import { withSuspense } from 'common/utils/suspense';
import StandardLayout from 'common/components/Layout/StandardLayout';
import ErrorPage from 'pages/Error/ErrorPage';
import PrivateOutlet from './PrivateOutlet';

// Landing Page Family
import LandingPage from 'pages/Landing/LandingPage';

// Auth Page Family
const SigninPage = lazy(() => import('pages/Auth/Signin/SigninPage'));
const SignoutPage = lazy(() => import('pages/Auth/Signout/SignoutPage'));

// Settings Page Family
const SettingsPage = lazy(() => import('pages/Settings/SettingsPage'));
const AppearanceSettings = lazy(() => import('pages/Settings/components/AppearanceSettings'));

// Components Page Family
const ComponentsPage = lazy(() => import('pages/Components/ComponentsPage'));
const AlertComponents = lazy(() => import('pages/Components/components/AlertComponents'));
const AvatarComponents = lazy(() => import('pages/Components/components/AvatarComponents'));
const BadgeComponents = lazy(() => import('pages/Components/components/BadgeComponents'));
const BreadcrumbsComponents = lazy(
  () => import('pages/Components/components/BreadcrumbsComponents'),
);
const ButtonComponents = lazy(() => import('pages/Components/components/ButtonComponents'));
const CardComponents = lazy(() => import('pages/Components/components/CardComponents'));
const ColumnComponents = lazy(() => import('pages/Components/components/ColumnsComponents'));
const ContainerComponents = lazy(() => import('pages/Components/components/ContainerComponents'));
const DialogComponents = lazy(() => import('pages/Components/components/DialogComponents'));
const DividerComponents = lazy(() => import('pages/Components/components/DividerComponents'));
const DropdownComponents = lazy(() => import('pages/Components/components/DropdownComponents'));
const HeadingComponents = lazy(() => import('pages/Components/components/HeadingComponents'));
const IconComponents = lazy(() => import('pages/Components/components/IconComponents'));
const InputComponents = lazy(() => import('pages/Components/components/InputComponents'));
const LabelComponents = lazy(() => import('pages/Components/components/LabelComponents'));
const PageComponents = lazy(() => import('pages/Components/components/PageComponents'));
const SearchInputComponents = lazy(
  () => import('pages/Components/components/SearchInputComponents'),
);
const TabsComponents = lazy(() => import('pages/Components/components/TabsComponents'));
const TextComponents = lazy(() => import('pages/Components/components/TextComponents'));
const TextareaComponents = lazy(() => import('pages/Components/components/TextareaComponents'));

// Tasks Page Family
const TasksPage = lazy(() => import('pages/Tasks/TasksPage'));
const TaskListLayout = lazy(() => import('pages/Tasks/components/TaskListLayout'));
const TaskDetailLayout = lazy(() => import('pages/Tasks/components/TaskDetailLayout'));
const TaskAdd = lazy(() => import('pages/Tasks/components/Add/TaskAdd'));
const TaskEdit = lazy(() => import('pages/Tasks/components/Edit/TaskEdit'));

/**
 * The React Router configuration. An array of `RouteObject`.
 * @see {@link RouteObject}
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <StandardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'auth',
        children: [
          { index: true, element: <Navigate to="signin" replace /> },
          {
            path: 'signin',
            element: withSuspense(<SigninPage />),
          },
          {
            path: 'signout',
            element: withSuspense(<SignoutPage />),
          },
        ],
      },
      {
        path: 'pub',
        children: [
          { index: true, element: <Navigate to="components" replace /> },
          {
            path: 'components',
            element: withSuspense(<ComponentsPage />),
            children: [
              {
                index: true,
                element: <Navigate to="alert" replace />,
              },
              {
                path: 'alert',
                element: withSuspense(<AlertComponents />),
              },
              {
                path: 'avatar',
                element: withSuspense(<AvatarComponents />),
              },
              {
                path: 'badge',
                element: withSuspense(<BadgeComponents />),
              },
              {
                path: 'breadcrumbs',
                element: withSuspense(<BreadcrumbsComponents />),
              },
              {
                path: 'button',
                element: withSuspense(<ButtonComponents />),
              },
              {
                path: 'card',
                element: withSuspense(<CardComponents />),
              },
              {
                path: 'columns',
                element: withSuspense(<ColumnComponents />),
              },
              {
                path: 'container',
                element: withSuspense(<ContainerComponents />),
              },
              {
                path: 'dialog',
                element: withSuspense(<DialogComponents />),
              },
              {
                path: 'divider',
                element: withSuspense(<DividerComponents />),
              },
              {
                path: 'dropdown',
                element: withSuspense(<DropdownComponents />),
              },
              {
                path: 'heading',
                element: withSuspense(<HeadingComponents />),
              },
              {
                path: 'icon',
                element: withSuspense(<IconComponents />),
              },
              {
                path: 'input',
                element: withSuspense(<InputComponents />),
              },
              {
                path: 'label',
                element: withSuspense(<LabelComponents />),
              },
              {
                path: 'page',
                element: withSuspense(<PageComponents />),
              },
              {
                path: 'search-input',
                element: withSuspense(<SearchInputComponents />),
              },
              {
                path: 'tabs',
                element: withSuspense(<TabsComponents />),
              },
              {
                path: 'text',
                element: withSuspense(<TextComponents />),
              },
              {
                path: 'textarea',
                element: withSuspense(<TextareaComponents />),
              },
            ],
          },
        ],
      },
      {
        path: 'app',
        element: <PrivateOutlet />,
        children: [
          { index: true, element: <Navigate to="tasks" replace /> },
          {
            path: 'settings',
            element: withSuspense(<SettingsPage />),
            children: [
              {
                index: true,
                element: <Navigate to="appearance" replace />,
              },
              {
                path: 'appearance',
                element: withSuspense(<AppearanceSettings />),
              },
            ],
          },
          {
            path: 'tasks',
            element: withSuspense(<TasksPage />),
            children: [
              {
                index: true,
                element: withSuspense(<TaskListLayout />),
              },
              {
                path: 'add',
                element: withSuspense(<TaskAdd />),
              },
              {
                path: ':taskId',
                children: [
                  {
                    index: true,
                    element: withSuspense(<TaskDetailLayout />),
                  },
                  {
                    path: 'edit',
                    element: withSuspense(<TaskEdit />),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * The application `Router`. A React Router instance.
 */
export const router = createBrowserRouter(routes);
