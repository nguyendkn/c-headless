import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
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
              href='#integrations'
              className='text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors'
            >
              Integrations
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
  );
}
