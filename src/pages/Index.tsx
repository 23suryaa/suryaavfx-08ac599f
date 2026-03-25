import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
      <footer className="py-8 text-center text-sm text-muted-foreground font-body border-t border-border">
        © {new Date().getFullYear()} suryaavfx. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
