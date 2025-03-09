import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import StandardLayout from 'common/components/Layout/StandardLayout';
import ErrorPage from 'pages/Error/ErrorPage';
import PrivateOutlet from './PrivateOutlet';
import LandingPage from 'pages/Landing/LandingPage';

// Auth Page Family
import SigninPage from 'pages/Auth/Signin/SigninPage';
import SignoutPage from 'pages/Auth/Signout/SignoutPage';

// Settings Page Family
import SettingsPage from 'pages/Settings/SettingsPage';
import AppearanceSettings from 'pages/Settings/components/AppearanceSettings';

// Components Page Family
import ComponentsPage from 'pages/Components/ComponentsPage';
import AlertComponents from 'pages/Components/components/AlertComponents';
import AvatarComponents from 'pages/Components/components/AvatarComponents';
import BadgeComponents from 'pages/Components/components/BadgeComponents';
import BreadcrumbsComponents from 'pages/Components/components/BreadcrumbsComponents';
import ButtonComponents from 'pages/Components/components/ButtonComponents';
import CardComponents from 'pages/Components/components/CardComponents';
import DialogComponents from 'pages/Components/components/DialogComponents';
import DropdownComponents from 'pages/Components/components/DropdownComponents';
import SearchInputComponents from 'pages/Components/components/SearchInputComponents';
import TabsComponents from 'pages/Components/components/TabsComponents';
import TextComponents from 'pages/Components/components/TextComponents';

// Tasks Page Family
import TasksPage from 'pages/Tasks/TasksPage';
import TaskListLayout from 'pages/Tasks/components/TaskListLayout';
import TaskDetailLayout from 'pages/Tasks/components/TaskDetailLayout';
import TaskAdd from 'pages/Tasks/components/Add/TaskAdd';
import TaskEdit from 'pages/Tasks/components/Edit/TaskEdit';

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
            element: <SigninPage />,
          },
          {
            path: 'signout',
            element: <SignoutPage />,
          },
        ],
      },
      {
        path: 'pub',
        children: [
          { index: true, element: <Navigate to="components" replace /> },
          {
            path: 'components',
            element: <ComponentsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="alert" replace />,
              },
              {
                path: 'alert',
                element: <AlertComponents />,
              },
              {
                path: 'avatar',
                element: <AvatarComponents />,
              },
              {
                path: 'badge',
                element: <BadgeComponents />,
              },
              {
                path: 'breadcrumbs',
                element: <BreadcrumbsComponents />,
              },
              {
                path: 'button',
                element: <ButtonComponents />,
              },
              {
                path: 'card',
                element: <CardComponents />,
              },
              {
                path: 'dialog',
                element: <DialogComponents />,
              },
              {
                path: 'dropdown',
                element: <DropdownComponents />,
              },
              {
                path: 'search-input',
                element: <SearchInputComponents />,
              },
              {
                path: 'tabs',
                element: <TabsComponents />,
              },
              {
                path: 'text',
                element: <TextComponents />,
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
            element: <SettingsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="appearance" replace />,
              },
              {
                path: 'appearance',
                element: <AppearanceSettings />,
              },
            ],
          },
          {
            path: 'tasks',
            element: <TasksPage />,
            children: [
              {
                index: true,
                element: <TaskListLayout />,
              },
              {
                path: 'add',
                element: <TaskAdd />,
              },
              {
                path: ':taskId',
                children: [
                  {
                    index: true,
                    element: <TaskDetailLayout />,
                  },
                  {
                    path: 'edit',
                    element: <TaskEdit />,
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
