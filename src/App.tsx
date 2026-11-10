import { Nav } from "./components/Nav";
import { HeroSection, Marquee } from "./components/Hero";
import { AboutSection, ToolboxSection } from "./components/About";
import { ProjectsSection, TimelineSection } from "./components/Projects";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main className="overflow-x-clip">
        <HeroSection />
        <Marquee />
        <AboutSection />
        <ToolboxSection />
        <ProjectsSection />
        <TimelineSection />
      </main>
      <Footer />
    </>
  );
}
