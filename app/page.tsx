import {
  ArchitectureSection,
  CTASection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  IntegrationsSection,
  PainPointsSection,
  SellingPointsSection,
  TechnologyStackSection,
  UseCasesSection,
} from '@/components/landing-page';

export default function Page() {
  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
      <Header />
      <HeroSection />
      <PainPointsSection />
      <SellingPointsSection />
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
