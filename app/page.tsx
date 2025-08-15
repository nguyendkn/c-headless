import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building,
  CheckCircle,
  Code,
  Database,
  Globe,
  Layers,
  Palette,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
      {/* Header */}
      <header className='sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center'>
                <span className='text-white dark:text-neutral-900 font-bold text-sm'>
                  C
                </span>
              </div>
              <span className='text-xl font-bold text-neutral-900 dark:text-white'>
                C-Headless
              </span>
            </div>

            <nav className='hidden md:flex items-center space-x-8'>
              <Link
                href='#features'
                className='text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors'
              >
                Features
              </Link>
              <Link
                href='#architecture'
                className='text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors'
              >
                Architecture
              </Link>
              <Link
                href='#use-cases'
                className='text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors'
              >
                Use Cases
              </Link>
              <Link
                href='#docs'
                className='text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors'
              >
                Docs
              </Link>
            </nav>

            <div className='flex items-center space-x-4'>
              <Link href='/auth/sign-in'>
                <Button variant='ghost' size='sm'>
                  Sign In
                </Button>
              </Link>
              <Link href='/auth/sign-up'>
                <Button size='sm'>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative overflow-hidden py-20 sm:py-32'>
        <div className='absolute inset-0 bg-gradient-to-r from-neutral-100/50 to-neutral-200/50 dark:from-neutral-900/50 dark:to-neutral-800/50' />
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <Badge variant='secondary' className='mb-6'>
              <Sparkles className='w-3 h-3 mr-1' />
              AI-Powered CMS Platform
            </Badge>

            <h1 className='text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6'>
              <span className='block'>Build faster with</span>
              <span className='block bg-gradient-to-r from-neutral-600 to-neutral-900 dark:from-neutral-300 dark:to-neutral-100 bg-clip-text text-transparent'>
                C-Headless CMS
              </span>
            </h1>

            <p className='max-w-3xl mx-auto text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 mb-10 leading-relaxed'>
              The modern headless CMS with AI integration, visual template
              builder, and unlimited customization for next-generation
              applications.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
              <Link href='/auth/sign-up'>
                <Button size='lg' className='group'>
                  <Zap className='w-4 h-4 mr-2' />
                  Start Building Free
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Button>
              </Link>
              <Button variant='outline' size='lg'>
                <Code className='w-4 h-4 mr-2' />
                View Documentation
              </Button>
            </div>

            {/* Hero Visual */}
            <div className='relative max-w-5xl mx-auto'>
              <Card className='overflow-hidden shadow-2xl'>
                <div className='bg-neutral-100 dark:bg-neutral-800 px-4 py-3 flex items-center space-x-2 border-b'>
                  <div className='w-3 h-3 bg-red-500 rounded-full' />
                  <div className='w-3 h-3 bg-yellow-500 rounded-full' />
                  <div className='w-3 h-3 bg-green-500 rounded-full' />
                  <div className='ml-4 text-sm text-neutral-500 dark:text-neutral-400'>
                    C-Headless CMS Dashboard
                  </div>
                </div>
                <CardContent className='p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 min-h-[400px] flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='w-24 h-24 bg-neutral-900 dark:bg-neutral-100 rounded-2xl mx-auto mb-4 flex items-center justify-center'>
                      <span className='text-white dark:text-neutral-900 text-3xl font-bold'>
                        C
                      </span>
                    </div>
                    <p className='text-neutral-600 dark:text-neutral-300 text-lg'>
                      Dashboard Preview
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Architecture Overview */}
      <section
        id='architecture'
        className='py-20 bg-neutral-50 dark:bg-neutral-900'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
              System Architecture
            </h2>
            <p className='max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
              Modular and scalable design with optimized core components for
              maximum flexibility and performance.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Architecture Diagram */}
            <div className='order-2 lg:order-1'>
              <Card className='p-8'>
                <CardHeader>
                  <CardTitle className='text-center'>Core Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {/* Project Layer */}
                    <div className='bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg p-4'>
                      <div className='text-center'>
                        <div className='text-neutral-700 dark:text-neutral-300 font-semibold flex items-center justify-center'>
                          <Layers className='w-4 h-4 mr-2' />
                          Project
                        </div>
                        <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                          Main Container
                        </div>
                      </div>
                    </div>

                    {/* Data Layer */}
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg p-3'>
                        <div className='text-center'>
                          <div className='text-neutral-700 dark:text-neutral-300 font-semibold text-sm flex items-center justify-center'>
                            <Database className='w-3 h-3 mr-1' />
                            Table
                          </div>
                          <div className='text-xs text-neutral-500 dark:text-neutral-400'>
                            Schema
                          </div>
                        </div>
                      </div>
                      <div className='bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg p-3'>
                        <div className='text-center'>
                          <div className='text-neutral-700 dark:text-neutral-300 font-semibold text-sm flex items-center justify-center'>
                            <Database className='w-3 h-3 mr-1' />
                            Entity
                          </div>
                          <div className='text-xs text-neutral-500 dark:text-neutral-400'>
                            Data
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interface Layer */}
                    <div className='grid grid-cols-3 gap-2'>
                      <div className='bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2'>
                        <div className='text-center'>
                          <div className='text-neutral-700 dark:text-neutral-300 font-semibold text-xs'>
                            View
                          </div>
                        </div>
                      </div>
                      <div className='bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2'>
                        <div className='text-center'>
                          <div className='text-neutral-700 dark:text-neutral-300 font-semibold text-xs'>
                            Form
                          </div>
                        </div>
                      </div>
                      <div className='bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2'>
                        <div className='text-center'>
                          <div className='text-neutral-700 dark:text-neutral-300 font-semibold text-xs'>
                            Template
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Layer */}
                    <div className='bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg p-4'>
                      <div className='text-center'>
                        <div className='text-neutral-700 dark:text-neutral-300 font-semibold flex items-center justify-center'>
                          <Bot className='w-4 h-4 mr-2' />
                          AI System
                        </div>
                        <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                          Agents • Workflows • Prompts
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Architecture Details */}
            <div className='order-1 lg:order-2 space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg flex items-center'>
                    <span className='w-2 h-2 bg-neutral-500 rounded-full mr-3' />
                    Data Layer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-neutral-600 dark:text-neutral-300 text-sm'>
                    <strong>Table</strong> defines schema and data structure.
                    <strong>Entity</strong> contains actual data with validation
                    and relationships for robust data management.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='text-lg flex items-center'>
                    <span className='w-2 h-2 bg-neutral-500 rounded-full mr-3' />
                    Interface Layer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-neutral-600 dark:text-neutral-300 text-sm'>
                    <strong>View</strong> displays data, <strong>Form</strong>{' '}
                    handles input, and <strong>Template</strong> from the
                    builder system with drag & drop functionality.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='text-lg flex items-center'>
                    <span className='w-2 h-2 bg-neutral-500 rounded-full mr-3' />
                    AI Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-neutral-600 dark:text-neutral-300 text-sm'>
                    AI system with multi-provider support, intelligent agents,
                    and workflow automation deeply integrated into the core
                    system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id='use-cases' className='py-20 bg-white dark:bg-neutral-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
              Real-World Applications
            </h2>
            <p className='max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
              C-Headless CMS adapts to projects of all sizes, from simple
              websites to complex enterprise applications.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Content Management */}
            <Card className='bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700'>
              <CardHeader>
                <div className='w-16 h-16 bg-neutral-900 dark:bg-neutral-100 rounded-2xl flex items-center justify-center mb-6'>
                  <Globe className='w-8 h-8 text-white dark:text-neutral-900' />
                </div>
                <CardTitle className='text-xl'>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3 text-neutral-600 dark:text-neutral-300'>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Website & Blog management
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    E-commerce product catalog
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Portfolio & gallery
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Multi-language content
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Business Applications */}
            <Card className='bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700'>
              <CardHeader>
                <div className='w-16 h-16 bg-neutral-900 dark:bg-neutral-100 rounded-2xl flex items-center justify-center mb-6'>
                  <Users className='w-8 h-8 text-white dark:text-neutral-900' />
                </div>
                <CardTitle className='text-xl'>Business Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3 text-neutral-600 dark:text-neutral-300'>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    CRM & Customer management
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Project management tools
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Inventory management
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Event management
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data-Driven Apps */}
            <Card className='bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700'>
              <CardHeader>
                <div className='w-16 h-16 bg-neutral-900 dark:bg-neutral-100 rounded-2xl flex items-center justify-center mb-6'>
                  <BarChart3 className='w-8 h-8 text-white dark:text-neutral-900' />
                </div>
                <CardTitle className='text-xl'>
                  Data-Driven Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3 text-neutral-600 dark:text-neutral-300'>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Analytics dashboards
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Reporting systems
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Survey & form builders
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                    Knowledge management
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className='py-20 bg-neutral-50 dark:bg-neutral-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
              Modern Technology Stack
            </h2>
            <p className='max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
              Built with cutting-edge technologies to ensure optimal
              performance, scalability, and developer experience.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {/* Next.js */}
            <Card className='text-center group hover:shadow-lg transition-all duration-300'>
              <CardContent className='p-6'>
                <div className='w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <Zap className='w-10 h-10 text-neutral-600 dark:text-neutral-400' />
                </div>
                <h3 className='font-semibold text-neutral-900 dark:text-white mb-2'>
                  Next.js 15
                </h3>
                <p className='text-sm text-neutral-600 dark:text-neutral-300'>
                  React Framework
                </p>
              </CardContent>
            </Card>

            {/* React */}
            <Card className='text-center group hover:shadow-lg transition-all duration-300'>
              <CardContent className='p-6'>
                <div className='w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <Code className='w-10 h-10 text-neutral-600 dark:text-neutral-400' />
                </div>
                <h3 className='font-semibold text-neutral-900 dark:text-white mb-2'>
                  React 19
                </h3>
                <p className='text-sm text-neutral-600 dark:text-neutral-300'>
                  UI Library
                </p>
              </CardContent>
            </Card>

            {/* TypeScript */}
            <Card className='text-center group hover:shadow-lg transition-all duration-300'>
              <CardContent className='p-6'>
                <div className='w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <Shield className='w-10 h-10 text-neutral-600 dark:text-neutral-400' />
                </div>
                <h3 className='font-semibold text-neutral-900 dark:text-white mb-2'>
                  TypeScript
                </h3>
                <p className='text-sm text-neutral-600 dark:text-neutral-300'>
                  Type Safety
                </p>
              </CardContent>
            </Card>

            {/* Tailwind CSS */}
            <Card className='text-center group hover:shadow-lg transition-all duration-300'>
              <CardContent className='p-6'>
                <div className='w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <Palette className='w-10 h-10 text-neutral-600 dark:text-neutral-400' />
                </div>
                <h3 className='font-semibold text-neutral-900 dark:text-white mb-2'>
                  Tailwind CSS
                </h3>
                <p className='text-sm text-neutral-600 dark:text-neutral-300'>
                  Styling
                </p>
              </CardContent>
            </Card>
          </div>

          <div className='mt-12 text-center'>
            <Badge variant='secondary' className='text-base px-6 py-3'>
              <CheckCircle className='w-4 h-4 mr-2' />
              Powered by Modern Web Standards
            </Badge>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-neutral-950 dark:to-neutral-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-white mb-6'>
            Ready to build with C-Headless CMS?
          </h2>
          <p className='text-xl text-neutral-300 mb-8 max-w-2xl mx-auto'>
            Join thousands of developers using C-Headless CMS to build amazing
            applications with AI integration and powerful template builder.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link href='/auth/sign-up'>
              <Button
                size='lg'
                className='bg-white text-neutral-900 hover:bg-neutral-100 group shadow-lg'
              >
                <Zap className='w-4 h-4 mr-2' />
                Start Building Free
                <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Button>
            </Link>
            <Button
              variant='outline'
              size='lg'
              className='bg-white text-neutral-900 hover:bg-neutral-100 group shadow-lg'
            >
              <Users className='w-4 h-4 mr-2' />
              Contact Sales
            </Button>
          </div>

          <div className='mt-8 flex flex-wrap justify-center items-center gap-8 text-neutral-300'>
            <div className='flex items-center space-x-2'>
              <CheckCircle className='w-4 h-4 text-green-400' />
              <span>30-day free trial</span>
            </div>
            <div className='flex items-center space-x-2'>
              <CheckCircle className='w-4 h-4 text-green-400' />
              <span>No credit card required</span>
            </div>
            <div className='flex items-center space-x-2'>
              <CheckCircle className='w-4 h-4 text-green-400' />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-neutral-900 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Company Info */}
            <div className='col-span-1 md:col-span-2'>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center'>
                  <span className='text-neutral-900 font-bold text-sm'>C</span>
                </div>
                <span className='text-xl font-bold'>C-Headless CMS</span>
              </div>
              <p className='text-neutral-400 mb-6 max-w-md'>
                The modern headless CMS with AI integration, visual template
                builder, and unlimited customization for next-generation
                applications.
              </p>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='text-neutral-400 hover:text-white transition-colors'
                >
                  <span className='sr-only'>GitHub</span>
                  <Code className='w-5 h-5' />
                </a>
                <a
                  href='#'
                  className='text-neutral-400 hover:text-white transition-colors'
                >
                  <span className='sr-only'>Twitter</span>
                  <Globe className='w-5 h-5' />
                </a>
                <a
                  href='#'
                  className='text-neutral-400 hover:text-white transition-colors'
                >
                  <span className='sr-only'>LinkedIn</span>
                  <Building className='w-5 h-5' />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className='font-semibold mb-4'>Product</h3>
              <ul className='space-y-2 text-neutral-400'>
                <li>
                  <a
                    href='#features'
                    className='hover:text-white transition-colors'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#architecture'
                    className='hover:text-white transition-colors'
                  >
                    Architecture
                  </a>
                </li>
                <li>
                  <a
                    href='#use-cases'
                    className='hover:text-white transition-colors'
                  >
                    Use Cases
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className='font-semibold mb-4'>Support</h3>
              <ul className='space-y-2 text-neutral-400'>
                <li>
                  <a
                    href='#docs'
                    className='hover:text-white transition-colors'
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    API Reference
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Community
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Support
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className='my-8 bg-neutral-800' />

          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-neutral-400 text-sm'>
              © 2024 C-Headless CMS. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <a
                href='#'
                className='text-neutral-400 hover:text-white text-sm transition-colors'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-neutral-400 hover:text-white text-sm transition-colors'
              >
                Terms of Service
              </a>
              <a
                href='#'
                className='text-neutral-400 hover:text-white text-sm transition-colors'
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
