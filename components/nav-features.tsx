'use client';

import {
  Bot,
  Braces,
  ChevronRight,
  Database,
  LayoutTemplate,
  Settings2,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

const features = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutTemplate,
    isActive: true,
  },
  {
    title: 'Content',
    url: '/dashboard/tables',
    icon: Database,
    items: [
      {
        title: 'Tables',
        url: '/dashboard/tables',
      },
      {
        title: 'Views',
        url: '/dashboard/views',
      },
      {
        title: 'Forms',
        url: '/dashboard/forms',
      },
    ],
  },
  {
    title: 'Builder',
    icon: Braces,
    items: [
      {
        title: 'Templates',
        url: '/builder/templates',
      },
      {
        title: 'Components',
        url: '/builder/components',
      },
      {
        title: 'Workflows',
        url: '/builder/workflows',
      },
    ],
  },
  {
    title: 'AI Assistant',
    url: '/dashboard/ai',
    icon: Bot,
    items: [
      {
        title: 'Models',
        url: '/dashboard/ai/models',
      },
      {
        title: 'Workflows',
        url: '/dashboard/ai/workflows',
      },
    ],
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings2,
    items: [
      {
        title: 'General',
        url: '/dashboard/settings/general',
      },
      {
        title: 'Users',
        url: '/dashboard/settings/users',
      },
      {
        title: 'API',
        url: '/dashboard/settings/api',
      },
    ],
  },
];

export function NavFeatures() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {features.map(item =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(subItem => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
