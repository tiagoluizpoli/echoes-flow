// src/AppRoutes.tsx
import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage, EventsPage, MainPage } from '@/pages';

// Páginas e componentes de rotas
import SignInPage from '@/pages/signin-page';
import { PrivateRoute } from './private-route';
import { PublicOnlyRoute } from './public-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
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
        element: <DashboardPage />,
      },
      {
        path: '/events',
        element: <EventsPage />,
      },
    ],
  },
]);

// O componente AppRoutes.tsx não é mais necessário neste formato
// A renderização será feita no main.tsx
