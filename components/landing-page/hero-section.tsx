import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
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
  );
}
