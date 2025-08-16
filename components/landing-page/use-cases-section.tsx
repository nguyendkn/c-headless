import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, CheckCircle, Globe, Users } from 'lucide-react';

export function UseCasesSection() {
  return (
    <section id='use-cases' className='py-20 bg-white dark:bg-neutral-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
            Real-World Applications
          </h2>
          <p className='max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
            C-Headless CMS adapts to projects of all sizes, from simple websites
            to complex enterprise applications.
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
  );
}
