import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { PrivateAppRouter, PublicAppRouter } from './AppRoutes';
import { Login, Register } from '@/components';
const AuthenticationLayout = lazy(() => import('@/components/layouts/AuthLayout/AuthenticationLayout'));
const MainLayout = lazy(() => import('@/components/layouts/MainLayout/MainLayout'));
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [...PublicAppRouter, ...PrivateAppRouter],
  },
  {
    element: <AuthenticationLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
        handle: {
          headerVariant: 'login',
        },
      },
      {
        path: '/register',
        element: <Register />,
        handle: {
          headerVariant: 'register',
        },
      },
    ],
  },
]);
