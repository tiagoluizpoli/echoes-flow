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
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                <Icon icon={'et:clock'} className="!size-5" />

                <span className="text-base font-semibold">CBDG Timer</span>
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
