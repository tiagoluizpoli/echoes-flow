// src/components/routes/PrivateRoute.tsx

import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootLayout } from '@/layout';

export const PrivateRoute = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!isLoaded) {
    return <div>Carregando...</div>; // Ou um spinner de carregamento
  }

  if (!isSignedIn || !user) {
    return <Navigate to="/sign-in" />; // Redireciona para o login
  }

  const { publicMetadata } = user;

  if (publicMetadata.churchs.length === 0) {
    return (
      <>
        <Outlet />
        <Navigate to={'/onboarding'} />
      </>
    );
  }

  if (pathname === '/onboarding/completed') {
    navigate('/dashboard');
  }
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};
