import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  Bot,
  CheckCircle,
  Database,
  Palette,
  Shield,
  Zap,
} from 'lucide-react';

export function FeaturesSection() {
  return (
    <section id='features' className='py-20 bg-white dark:bg-neutral-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
            Powerful Features
          </h2>
          <p className='max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
            Discover the powerful features that help you build modern
            applications with ease and efficiency.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Feature 1: Dynamic Data Management */}
          <Card className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <CardHeader>
              <div className='w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <Database className='w-6 h-6 text-neutral-600 dark:text-neutral-400' />
              </div>
              <CardTitle className='text-xl'>
                Dynamic Data Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Create and manage data tables with flexible schemas,
                supporting multiple field types and complex relationships.
              </p>
              <ul className='text-sm text-neutral-500 dark:text-neutral-400 space-y-1'>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Custom schemas
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Smart validation
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Audit trail
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 2: Template Builder */}
          <Card className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <CardHeader>
              <div className='w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <Palette className='w-6 h-6 text-neutral-600 dark:text-neutral-400' />
              </div>
              <CardTitle className='text-xl'>
                Visual Template Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Intuitive drag & drop tool with 25+ components and responsive
                design capabilities.
              </p>
              <ul className='text-sm text-neutral-500 dark:text-neutral-400 space-y-1'>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Drag & Drop Builder
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  25+ Components
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Responsive Design
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 3: AI Integration */}
          <Card className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <CardHeader>
              <div className='w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <Bot className='w-6 h-6 text-neutral-600 dark:text-neutral-400' />
              </div>
              <CardTitle className='text-xl'>AI Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Multi-provider AI support with intelligent agents and workflow
                automation capabilities.
              </p>
              <ul className='text-sm text-neutral-500 dark:text-neutral-400 space-y-1'>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Multi-Provider Support
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  AI Agents & MCP
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Workflow Automation
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 4: Multiple Views */}
          <Card className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <CardHeader>
              <div className='w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <BarChart3 className='w-6 h-6 text-neutral-600 dark:text-neutral-400' />
              </div>
              <CardTitle className='text-xl'>Multiple View System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Display data in multiple ways: tables, charts, kanban boards,
                calendars, and maps for comprehensive visualization.
              </p>
              <ul className='text-sm text-neutral-500 dark:text-neutral-400 space-y-1'>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Table & Form Views
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Charts & Visualization
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Kanban & Calendar
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 5: Security */}
          <Card className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <CardHeader>
              <div className='w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <Shield className='w-6 h-6 text-neutral-600 dark:text-neutral-400' />
              </div>
              <CardTitle className='text-xl'>
                Security & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Enterprise-grade security with RBAC, field-level permissions,
                API security, and data encryption.
              </p>
              <ul className='text-sm text-neutral-500 dark:text-neutral-400 space-y-1'>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Role-Based Access
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Field-Level Security
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Data Encryption
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 6: Performance */}
          <Card className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <CardHeader>
              <div className='w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <Zap className='w-6 h-6 text-neutral-600 dark:text-neutral-400' />
              </div>
              <CardTitle className='text-xl'>High Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Built with Next.js 15, React 19, and TypeScript for optimal
                performance and developer experience.
              </p>
              <ul className='text-sm text-neutral-500 dark:text-neutral-400 space-y-1'>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Next.js 15 & React 19
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  TypeScript Support
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='w-3 h-3 mr-2' />
                  Optimized Performance
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
