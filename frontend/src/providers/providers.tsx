import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { env } from '@/config';
import { router } from '@/routes';

export const Providers = () => {
  const { VITE_CLERK_PUBLISHABLE_KEY } = env;
  const queryClient = new QueryClient();

  return (
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};
