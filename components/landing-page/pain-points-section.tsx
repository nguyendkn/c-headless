import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertTriangle,
  Clock,
  Lock,
  Settings,
  TrendingDown,
  Users,
} from 'lucide-react';

export function PainPointsSection() {
  return (
    <section className='py-20 bg-red-50 dark:bg-red-950/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-6'>
            <AlertTriangle className='w-4 h-4 text-red-600 dark:text-red-400 mr-2' />
            <span className='text-red-700 dark:text-red-300 font-medium text-sm'>
              The Problem
            </span>
          </div>
          <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
            Traditional CMS Platforms Are{' '}
            <span className='text-red-600 dark:text-red-400'>
              Holding You Back
            </span>
          </h2>
          <p className='max-w-3xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
            Developers and content teams are struggling with outdated CMS
            solutions that create more problems than they solve.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Pain Point 1: Vendor Lock-in */}
          <Card className='border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300'>
            <CardHeader>
              <div className='w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4'>
                <Lock className='w-6 h-6 text-red-600 dark:text-red-400' />
              </div>
              <CardTitle className='text-xl text-neutral-900 dark:text-white'>
                Vendor Lock-in Nightmare
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Trapped in proprietary ecosystems with expensive licensing,
                limited customization, and no freedom to migrate your content
                and workflows.
              </p>
              <div className='space-y-2 text-sm text-red-600 dark:text-red-400'>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Expensive recurring fees
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Difficult data migration
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Limited API access
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pain Point 2: Poor Developer Experience */}
          <Card className='border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300'>
            <CardHeader>
              <div className='w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4'>
                <TrendingDown className='w-6 h-6 text-red-600 dark:text-red-400' />
              </div>
              <CardTitle className='text-xl text-neutral-900 dark:text-white'>
                Terrible Developer Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Outdated APIs, poor documentation, and clunky interfaces that
                slow down development and frustrate your team.
              </p>
              <div className='space-y-2 text-sm text-red-600 dark:text-red-400'>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Legacy REST APIs only
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Poor TypeScript support
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Outdated tech stack
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pain Point 3: Limited Customization */}
          <Card className='border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300'>
            <CardHeader>
              <div className='w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4'>
                <Settings className='w-6 h-6 text-red-600 dark:text-red-400' />
              </div>
              <CardTitle className='text-xl text-neutral-900 dark:text-white'>
                Zero Customization Freedom
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Rigid templates and limited field types force you to compromise
                your vision and settle for generic solutions.
              </p>
              <div className='space-y-2 text-sm text-red-600 dark:text-red-400'>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Fixed content models
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  No custom fields
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Limited UI customization
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pain Point 4: Performance Issues */}
          <Card className='border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300'>
            <CardHeader>
              <div className='w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4'>
                <Clock className='w-6 h-6 text-red-600 dark:text-red-400' />
              </div>
              <CardTitle className='text-xl text-neutral-900 dark:text-white'>
                Sluggish Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Slow loading times, heavy admin interfaces, and poor
                optimization hurt both user experience and SEO rankings.
              </p>
              <div className='space-y-2 text-sm text-red-600 dark:text-red-400'>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Slow API responses
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Heavy admin dashboard
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Poor mobile performance
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pain Point 5: Complex Deployments */}
          <Card className='border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300'>
            <CardHeader>
              <div className='w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4'>
                <AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400' />
              </div>
              <CardTitle className='text-xl text-neutral-900 dark:text-white'>
                Deployment Headaches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Complex server requirements, manual configurations, and fragile
                deployment processes that break at the worst possible moments.
              </p>
              <div className='space-y-2 text-sm text-red-600 dark:text-red-400'>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Manual server setup
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Complex dependencies
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  No auto-scaling
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pain Point 6: Poor Collaboration */}
          <Card className='border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300'>
            <CardHeader>
              <div className='w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4'>
                <Users className='w-6 h-6 text-red-600 dark:text-red-400' />
              </div>
              <CardTitle className='text-xl text-neutral-900 dark:text-white'>
                Broken Team Workflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Developers and content creators work in silos with no real-time
                collaboration, version conflicts, and communication breakdowns.
              </p>
              <div className='space-y-2 text-sm text-red-600 dark:text-red-400'>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  No real-time editing
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Poor version control
                </div>
                <div className='flex items-center'>
                  <span className='w-1.5 h-1.5 bg-red-500 rounded-full mr-2' />
                  Limited role management
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='text-center mt-16'>
          <p className='text-lg text-neutral-600 dark:text-neutral-300 mb-4'>
            Sound familiar? You&apos;re not alone.
          </p>
          <p className='text-xl font-semibold text-neutral-900 dark:text-white'>
            <span className='text-red-600 dark:text-red-400'>
              73% of developers
            </span>{' '}
            report frustration with their current CMS
          </p>
        </div>
      </div>
    </section>
  );
}
