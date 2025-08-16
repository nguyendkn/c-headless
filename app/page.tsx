import {
  ArchitectureSection,
  CTASection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  IntegrationsSection,
  TechnologyStackSection,
  UseCasesSection,
} from '@/components/landing-page';

export default function Page() {
  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
      <UseCasesSection />
      <IntegrationsSection />
      <TechnologyStackSection />
      <CTASection />
      <Footer />
    </div>
  );
}
