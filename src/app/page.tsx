import Hero            from '@/components/sections/Hero';
import SocialProofBar   from '@/components/sections/SocialProofBar';
import ServicesGrid     from '@/components/sections/ServicesGrid';
import PortfolioPreview from '@/components/sections/PortfolioPreview';
import AIShowcase       from '@/components/sections/AIShowcase';
import HowIWork         from '@/components/sections/HowIWork';
import WhyJosh          from '@/components/sections/WhyJosh';
import FinalCTA         from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <div>
      <Hero />
      <SocialProofBar />
      <ServicesGrid />
      <PortfolioPreview />
      <AIShowcase />
      <HowIWork />
      <WhyJosh />
      <FinalCTA />
    </div>
  );
}

