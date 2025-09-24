// src/AppRoutes.tsx
import { createBrowserRouter } from 'react-router-dom';
import {
  DashboardPage,
  EventsPage,
  MainPage,
  OnboardingPage,
} from '@/features';

// Páginas e componentes de rotas
import SignInPage from '@/features/signin-page';
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
        path: '/onboarding',
        element: <OnboardingPage />,
      },
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
