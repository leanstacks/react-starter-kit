import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import StandardLayout from 'common/components/Layout/StandardLayout';
import ErrorPage from 'pages/Error/ErrorPage';
import PrivateOutlet from './PrivateOutlet';
import LandingPage from 'pages/Landing/LandingPage';
import SigninPage from 'pages/Auth/Signin/SigninPage';
import SignoutPage from 'pages/Auth/Signout/SignoutPage';
import DashboardPage from 'pages/Dashboard/DashboardPage';
import SettingsPage from 'pages/Settings/SettingsPage';
import AppearanceSettings from 'pages/Settings/components/AppearanceSettings';
import ComponentsPage from 'pages/Components/ComponentsPage';
import AvatarComponents from 'pages/Components/components/AvatarComponents';
import TextComponents from 'pages/Components/components/TextComponents';
import ButtonComponents from 'pages/Components/components/ButtonComponents';
import BadgeComponents from 'pages/Components/components/BadgeComponents';
import CardComponents from 'pages/Components/components/CardComponents';
import UsersPage from 'pages/Users/UsersPage';
import UserDetailLayout from 'pages/Users/components/UserDetailLayout';
import UserDetail from 'pages/Users/components/UserDetail';
import UserDetailEmpty from 'pages/Users/components/UserDetailEmpty';
import UserTaskList from 'pages/Users/components/UserTaskList';
import TaskDetail from 'pages/Users/Tasks/components/TaskDetail';

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
        path: 'auth/signin',
        element: <SigninPage />,
      },
      {
        path: 'auth/signout',
        element: <SignoutPage />,
      },
      {
        path: 'app',
        element: <PrivateOutlet />,
        children: [
          { index: true, element: <DashboardPage /> },
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
                path: 'text',
                element: <TextComponents />,
              },
            ],
          },
          {
            path: 'users',
            element: <UsersPage />,
            children: [
              {
                index: true,
                element: <UserDetailEmpty />,
              },
              {
                path: ':userId',
                element: <UserDetailLayout />,
                children: [
                  { index: true, element: <UserDetail /> },
                  {
                    path: 'tasks',
                    element: <UserTaskList />,
                  },
                  {
                    path: 'tasks/:taskId',
                    element: <TaskDetail />,
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
