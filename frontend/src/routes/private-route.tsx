// src/components/routes/PrivateRoute.tsx

import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootLayout } from '@/layout';

export const PrivateRoute = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Carregando...</div>; // Ou um spinner de carregamento
  }

  if (!isSignedIn || !user) {
    return <Navigate to="/sign-in" />; // Redireciona para o login
  }

  const { organizationMemberships } = user;

  if (!organizationMemberships.length) {
    return (
      <>
        <Outlet />
        <Navigate to={'/onboarding/completed'} />
      </>
    );
  }

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ); // Renderiza a rota filha se estiver autenticado
};
