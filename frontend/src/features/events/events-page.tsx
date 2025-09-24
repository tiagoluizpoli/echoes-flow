import { useBreadcrumbsStore } from '@/hooks';

export const EventsPage = () => {
  const addBreadcrumbs = useBreadcrumbsStore((state) => state.addBreadcrumbs);

  addBreadcrumbs([
    {
      label: 'Eventos',
      to: '/events',
    },
  ]);

  return <div>Events</div>;
};
