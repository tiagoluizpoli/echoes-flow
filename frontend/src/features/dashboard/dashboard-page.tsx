import { useBreadcrumbsStore } from '@/hooks';

export const DashboardPage = () => {
  const addBreadcrumbs = useBreadcrumbsStore((state) => state.addBreadcrumbs);

  addBreadcrumbs([
    {
      label: 'Dashboard',
      to: '/dashboard',
    },
  ]);
  return <div>Dashboard</div>;
};
