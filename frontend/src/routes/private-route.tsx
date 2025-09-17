// src/components/routes/PrivateRoute.tsx

import { useAuth } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootLayout } from '@/layout';

export const PrivateRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Carregando...</div>; // Ou um spinner de carregamento
  }

  if (isSignedIn) {
    return (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ); // Renderiza a rota filha se estiver autenticado
  }

  return <Navigate to="/sign-in" />; // Redireciona para o login
};
