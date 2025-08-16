import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bot,
  CheckCircle,
  Code2,
  Layers,
  Palette,
  Rocket,
  Sparkles,
  Zap,
} from 'lucide-react';

export function SellingPointsSection() {
  return (
    <section className='py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6'>
            <Sparkles className='w-4 h-4 text-blue-600 dark:text-blue-400 mr-2' />
            <span className='text-blue-700 dark:text-blue-300 font-medium text-sm'>
              The Solution
            </span>
          </div>
          <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
            Why C-Headless CMS is{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Different
            </span>
          </h2>
          <p className='max-w-3xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
            Built from the ground up to solve real developer problems with
            cutting-edge technology and AI-powered features.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
          {/* Main Selling Point 1: AI-First Architecture */}
          <Card className='border-blue-200 dark:border-blue-800 bg-gradient-to-br from-white to-blue-50 dark:from-neutral-900 dark:to-blue-950/30 hover:shadow-xl transition-all duration-300'>
            <CardHeader>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4'>
                  <Bot className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                </div>
                <Badge
                  variant='secondary'
                  className='bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                >
                  AI-Powered
                </Badge>
              </div>
              <CardTitle className='text-2xl text-neutral-900 dark:text-white mb-4'>
                First CMS with Native AI Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-6'>
                Revolutionary AI system with multi-provider support, intelligent
                agents, and workflow automation that transforms how you create
                and manage content.
              </p>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      OpenAI, Anthropic, AWS Bedrock
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Agent-to-agent communication
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Smart content generation
                    </span>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Workflow automation
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Cost tracking & monitoring
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Natural language queries
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Selling Point 2: Visual Template Builder */}
          <Card className='border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-white to-indigo-50 dark:from-neutral-900 dark:to-indigo-950/30 hover:shadow-xl transition-all duration-300'>
            <CardHeader>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mr-4'>
                  <Palette className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
                </div>
                <Badge
                  variant='secondary'
                  className='bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                >
                  Visual Builder
                </Badge>
              </div>
              <CardTitle className='text-2xl text-neutral-900 dark:text-white mb-4'>
                Advanced Visual Template Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-6'>
                Professional drag & drop interface with 25+ components,
                responsive design, and real-time collaboration for designers and
                developers.
              </p>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      25+ component library
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Responsive breakpoints
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Real-time collaboration
                    </span>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Dynamic data binding
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      Theme system
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                    <span className='text-neutral-600 dark:text-neutral-300'>
                      SEO optimization
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Selling Points Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Modern Tech Stack */}
          <Card className='text-center hover:shadow-lg transition-all duration-300 border-green-200 dark:border-green-800'>
            <CardHeader>
              <div className='w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <Code2 className='w-8 h-8 text-green-600 dark:text-green-400' />
              </div>
              <CardTitle className='text-lg text-neutral-900 dark:text-white'>
                Modern Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-neutral-600 dark:text-neutral-300 mb-4'>
                Built with Next.js 15, React 19, and TypeScript for optimal
                performance and developer experience.
              </p>
              <div className='space-y-2 text-xs text-green-600 dark:text-green-400'>
                <div>✓ Next.js 15 & React 19</div>
                <div>✓ Full TypeScript support</div>
                <div>✓ Modern API design</div>
              </div>
            </CardContent>
          </Card>

          {/* Multiple Views */}
          <Card className='text-center hover:shadow-lg transition-all duration-300 border-purple-200 dark:border-purple-800'>
            <CardHeader>
              <div className='w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <Layers className='w-8 h-8 text-purple-600 dark:text-purple-400' />
              </div>
              <CardTitle className='text-lg text-neutral-900 dark:text-white'>
                Multiple View System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-neutral-600 dark:text-neutral-300 mb-4'>
                Display data in tables, charts, kanban boards, calendars, and
                maps for comprehensive visualization.
              </p>
              <div className='space-y-2 text-xs text-purple-600 dark:text-purple-400'>
                <div>✓ Table & Form views</div>
                <div>✓ Charts & Analytics</div>
                <div>✓ Kanban & Calendar</div>
              </div>
            </CardContent>
          </Card>

          {/* High Performance */}
          <Card className='text-center hover:shadow-lg transition-all duration-300 border-orange-200 dark:border-orange-800'>
            <CardHeader>
              <div className='w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <Zap className='w-8 h-8 text-orange-600 dark:text-orange-400' />
              </div>
              <CardTitle className='text-lg text-neutral-900 dark:text-white'>
                Lightning Fast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-neutral-600 dark:text-neutral-300 mb-4'>
                Optimized for speed with edge caching, lazy loading, and
                performance monitoring built-in.
              </p>
              <div className='space-y-2 text-xs text-orange-600 dark:text-orange-400'>
                <div>✓ Edge optimization</div>
                <div>✓ Real-time monitoring</div>
                <div>✓ Auto-scaling</div>
              </div>
            </CardContent>
          </Card>

          {/* Easy Deployment */}
          <Card className='text-center hover:shadow-lg transition-all duration-300 border-teal-200 dark:border-teal-800'>
            <CardHeader>
              <div className='w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <Rocket className='w-8 h-8 text-teal-600 dark:text-teal-400' />
              </div>
              <CardTitle className='text-lg text-neutral-900 dark:text-white'>
                One-Click Deploy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-neutral-600 dark:text-neutral-300 mb-4'>
                Deploy anywhere with Docker, Vercel, or your own infrastructure.
                No complex setup required.
              </p>
              <div className='space-y-2 text-xs text-teal-600 dark:text-teal-400'>
                <div>✓ Docker ready</div>
                <div>✓ Cloud deployment</div>
                <div>✓ Self-hosted option</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className='text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl'>
          <h3 className='text-2xl font-bold text-white mb-4'>
            Ready to Experience the Difference?
          </h3>
          <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
            Join thousands of developers who&apos;ve already made the switch to
            a modern, AI-powered CMS that actually works.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <div className='text-white text-sm'>
              <span className='font-semibold'>🚀 Free to start</span> •{' '}
              <span className='font-semibold'>⚡ 5-minute setup</span> •{' '}
              <span className='font-semibold'>🔒 Enterprise ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
