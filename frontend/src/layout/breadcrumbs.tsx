import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { type BreadcrumbType, useBreadcrumbsStore } from '@/hooks';

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbsStore((state) => state.breadcrumbs);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbsItem
            key={`${breadcrumb.label}-${index}`}
            breadcrumb={breadcrumb}
            last={index === breadcrumbs.length - 1}
          />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface Props {
  breadcrumb: BreadcrumbType;
  last?: boolean;
}
const BreadcrumbsItem = ({ breadcrumb, last = false }: Props) => {
  if (last) {
    return (
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href={breadcrumb.to}>{breadcrumb.label}</BreadcrumbLink>
      </BreadcrumbItem>
    );
  }
  return (
    <>
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href={breadcrumb.to}>{breadcrumb.label}</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator />
    </>
  );
};
