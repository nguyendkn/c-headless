import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Code, Palette, Shield, Zap } from 'lucide-react';

export function TechnologyStackSection() {
  return (
    <section className='py-20 bg-neutral-50 dark:bg-neutral-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
            Modern Technology Stack
          </h2>
          <p className='max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
            Built with cutting-edge technologies to ensure optimal performance,
            scalability, and developer experience.
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
  );
}
