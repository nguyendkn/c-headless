import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  Bot,
  CheckCircle,
  Globe,
  Share2,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

export function IntegrationsSection() {
  return (
    <section id='integrations' className='py-20 bg-white dark:bg-neutral-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <Badge variant='secondary' className='mb-6'>
            <Sparkles className='w-3 h-3 mr-1' />
            Coming Soon
          </Badge>
          <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4'>
            Future Integrations
          </h2>
          <p className='max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300'>
            Exciting new capabilities are on the horizon. Discover the
            powerful integrations that will extend your content management
            workflow beyond creation.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Social Media Integration */}
          <Card className='bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700'>
            <CardHeader>
              <div className='w-16 h-16 bg-neutral-900 dark:bg-neutral-100 rounded-2xl flex items-center justify-center mb-6'>
                <Share2 className='w-8 h-8 text-white dark:text-neutral-900' />
              </div>
              <CardTitle className='text-xl'>
                Social Media Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Seamlessly connect your content creation workflow with major
                social media platforms for automated publishing and
                cross-platform distribution.
              </p>
              <ul className='space-y-3 text-neutral-600 dark:text-neutral-300'>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Multi-platform publishing
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Automated scheduling
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Content adaptation
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Cross-platform sync
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Performance Management */}
          <Card className='bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700'>
            <CardHeader>
              <div className='w-16 h-16 bg-neutral-900 dark:bg-neutral-100 rounded-2xl flex items-center justify-center mb-6'>
                <TrendingUp className='w-8 h-8 text-white dark:text-neutral-900' />
              </div>
              <CardTitle className='text-xl'>
                Content Performance Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Advanced tools to monitor, analyze, and optimize your content
                performance across all channels with intelligent
                recommendations.
              </p>
              <ul className='space-y-3 text-neutral-600 dark:text-neutral-300'>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Performance tracking
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  A/B testing tools
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Optimization suggestions
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Content lifecycle management
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Analytics and Reporting */}
          <Card className='bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700'>
            <CardHeader>
              <div className='w-16 h-16 bg-neutral-900 dark:bg-neutral-100 rounded-2xl flex items-center justify-center mb-6'>
                <BarChart3 className='w-8 h-8 text-white dark:text-neutral-900' />
              </div>
              <CardTitle className='text-xl'>Analytics & Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-neutral-600 dark:text-neutral-300 mb-4'>
                Comprehensive analytics dashboard with detailed insights and
                statistical reports when content is deployed across social
                media and other channels.
              </p>
              <ul className='space-y-3 text-neutral-600 dark:text-neutral-300'>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Real-time analytics
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Custom reporting
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  Cross-platform insights
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='w-4 h-4 text-neutral-500 mt-0.5 mr-3 flex-shrink-0' />
                  ROI measurement
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className='mt-16 text-center'>
          <Card className='max-w-4xl mx-auto bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700'>
            <CardContent className='p-8'>
              <h3 className='text-2xl font-bold text-neutral-900 dark:text-white mb-4'>
                Complete Content Ecosystem
              </h3>
              <p className='text-lg text-neutral-600 dark:text-neutral-300 mb-6'>
                These upcoming integrations will transform C-Headless CMS into
                a complete content ecosystem, taking you from creation to
                distribution, optimization, and analysis—all in one unified
                platform.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Badge variant='secondary' className='text-sm px-4 py-2'>
                  <Globe className='w-3 h-3 mr-2' />
                  Multi-Channel Distribution
                </Badge>
                <Badge variant='secondary' className='text-sm px-4 py-2'>
                  <Bot className='w-3 h-3 mr-2' />
                  AI-Powered Insights
                </Badge>
                <Badge variant='secondary' className='text-sm px-4 py-2'>
                  <Zap className='w-3 h-3 mr-2' />
                  Automated Workflows
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
