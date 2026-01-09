import { lazy } from 'react';
const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage/CategoryPage'));
const CartPage = lazy(() => import('@/pages/CartPage/CartPage'));
const ProductDetailPage = lazy(() => import('../../pages/ProductPage/ProductDetailPage'));

export const PublicAppRouter = [
  {
    path: '/',
    element: <HomePage />,
  },
];

export const PrivateAppRouter = [
  {
    path: '/cart/',
    element: <CartPage />,
    handle: {
      headerVariant: 'cart',
    },
  },
  {
    path: '/category/:id',
    element: <CategoryPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
  },
];
