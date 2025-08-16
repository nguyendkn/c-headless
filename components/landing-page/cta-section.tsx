import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
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
  );
}
