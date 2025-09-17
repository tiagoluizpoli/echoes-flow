// src/components/routes/PublicOnlyRoute.tsx
import { useAuth } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicOnlyRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" />; // Redireciona para o dashboard se já estiver autenticado
  }

  return <Outlet />; // Renderiza a rota filha se não estiver autenticado
};
