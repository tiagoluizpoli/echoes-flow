import { ClerkProvider } from '@clerk/clerk-react';
import { shadcn } from '@clerk/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { env } from '@/config';
import { router } from '@/routes';
import { ThemeProvider } from './theme-provider';

export const Providers = () => {
  const { VITE_CLERK_PUBLISHABLE_KEY } = env;
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ClerkProvider
        publishableKey={VITE_CLERK_PUBLISHABLE_KEY}
        appearance={{
          theme: shadcn,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <RouterProvider router={router} />
          </SidebarProvider>
        </QueryClientProvider>
      </ClerkProvider>
      <Toaster />
    </ThemeProvider>
  );
};
