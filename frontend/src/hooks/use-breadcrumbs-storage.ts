import { create } from 'zustand';

export type BreadcrumbType = {
  label: string;
  to: string;
};

interface BreadcrumbStoreType {
  breadcrumbs: BreadcrumbType[];
  addBreadcrumbs: (breadcrumbs: BreadcrumbType[]) => void;
  clearBreadcrumbs: () => void;
}

export const useBreadcrumbsStore = create<BreadcrumbStoreType>((set) => ({
  breadcrumbs: [],
  addBreadcrumbs: (newBreadcrumbs) =>
    set(() => ({
      breadcrumbs: newBreadcrumbs,
    })),
  clearBreadcrumbs: () =>
    set(() => ({
      breadcrumbs: [],
    })),
}));
