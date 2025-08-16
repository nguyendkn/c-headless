import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Database, Layers } from 'lucide-react';

export function ArchitectureSection() {
  return (
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
  );
}
