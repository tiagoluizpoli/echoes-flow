import { Icon } from '@iconify/react';
import { Link, type LinkProps } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface MenuItem {
  title: string;
  icon: string;
  to: LinkProps['to'];
}

export const AppSidebar = () => {
  const menuItems: MenuItem[] = [
    {
      icon: 'basil:clock-outline',
      title: 'Dashboard',
      to: '/dashboard',
    },
    {
      icon: 'bx:file',
      title: 'Eventos',
      to: '/events',
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2"
            >
              <Link
                to="/dashboard"
                className="flex items-center flex-col gap-2 h-28"
              >
                <Icon icon={'arcticons:godsdjsradio'} className="!size-16" />

                <span className="text-base font-semibold">Echoes Flow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={`${item.title}-${index}`}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <Icon icon={item.icon} />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* <SidebarFooter>
        <div className="p-1">
          <ModeToggle />
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
};

export default AppSidebar;
