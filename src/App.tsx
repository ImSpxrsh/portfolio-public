import { Nav, ScrollProgress } from "./components/Nav";
import { HeroSection } from "./components/Hero";
import { AffiliationBand } from "./components/AffiliationBand";
import { AboutSection } from "./components/About";
import { PublicationsSection } from "./components/Publications";
import { SkillMapSection } from "./components/SkillMap";
import { ProjectsSection } from "./components/Projects";
import { ExperienceSection } from "./components/Experience";
import { ResumeSection } from "./components/Resume";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main
        className="min-h-screen bg-[#0C0C0C] font-kanit text-[#D7E2EA]"
        style={{ overflowX: "clip" }}
      >
        <HeroSection />
        <AffiliationBand />
        <AboutSection />
        <PublicationsSection />
        <SkillMapSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResumeSection />
      </main>
      <Footer />
    </>
  );
}
