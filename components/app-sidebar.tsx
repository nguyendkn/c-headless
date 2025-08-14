'use client';

import {
  Bot,
  Braces,
  Building2,
  Database,
  LayoutTemplate,
  Settings2,
  Zap,
} from 'lucide-react';
import * as React from 'react';

import { NavFeatures } from '@/components/nav-features';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';

// CMS navigation data based on application vision
const data = {
  workspaces: [
    {
      name: 'C-Headless CMS',
      logo: Braces,
      plan: 'Enterprise',
    },
    {
      name: 'Development',
      logo: Building2,
      plan: 'Pro',
    },
    {
      name: 'Staging',
      logo: Zap,
      plan: 'Pro',
    },
  ],
  features: [
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
      url: '/dashboard/builder',
      icon: Braces,
      items: [
        {
          title: 'Templates',
          url: '/dashboard/builder/templates',
        },
        {
          title: 'Components',
          url: '/dashboard/builder/components',
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={data.workspaces} />
      </SidebarHeader>
      <SidebarContent>
        <NavFeatures items={data.features} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
