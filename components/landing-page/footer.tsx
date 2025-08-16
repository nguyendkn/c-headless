import { Separator } from '@/components/ui/separator';
import { Building, Code, Globe } from 'lucide-react';

export function Footer() {
  return (
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
                <a
                  href='#integrations'
                  className='hover:text-white transition-colors'
                >
                  Integrations
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
  );
}
