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
import AvatarComponents from 'pages/Components/components/AvatarComponents';
import TextComponents from 'pages/Components/components/TextComponents';
import ButtonComponents from 'pages/Components/components/ButtonComponents';
import BadgeComponents from 'pages/Components/components/BadgeComponents';
import CardComponents from 'pages/Components/components/CardComponents';
import SearchInputComponents from 'pages/Components/components/SearchInputComponents';
import TabsComponents from 'pages/Components/components/TabsComponents';

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
          { index: true, element: <Navigate to="signin" /> },
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
        path: 'app',
        element: <PrivateOutlet />,
        children: [
          { index: true, element: <Navigate to="tasks" /> },
          {
            path: 'settings',
            element: <SettingsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="appearance" />,
              },
              {
                path: 'appearance',
                element: <AppearanceSettings />,
              },
            ],
          },
          {
            path: 'components',
            element: <ComponentsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="avatar" />,
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
                path: 'button',
                element: <ButtonComponents />,
              },
              {
                path: 'card',
                element: <CardComponents />,
              },
              {
                path: 'searchinput',
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
