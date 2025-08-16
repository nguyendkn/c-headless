'use client';

import { Braces, Building2, Zap } from 'lucide-react';
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={data.workspaces} />
      </SidebarHeader>
      <SidebarContent>
        <NavFeatures />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
