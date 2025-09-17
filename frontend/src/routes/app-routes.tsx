// src/AppRoutes.tsx
import { createBrowserRouter } from 'react-router-dom';

// Páginas e componentes de rotas
import SignInPage from '@/pages/signin-page';
import { PrivateRoute } from './private-route';
import { PublicOnlyRoute } from './public-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Main page</div>,
  },
  {
    path: '/landing-page',
    element: <div>Landing Page</div>,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/dashboard',
        element: <div>Dashboard</div>,
      },
      {
        path: '/events',
        element: <div>Events</div>,
      },
    ],
  },
]);

// O componente AppRoutes.tsx não é mais necessário neste formato
// A renderização será feita no main.tsx
