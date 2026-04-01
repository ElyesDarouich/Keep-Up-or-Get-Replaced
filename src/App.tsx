import './i18n';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { ModelsSection } from './components/sections/ModelsSection';
import { AgentsSection } from './components/sections/AgentsSection';
import { AutomationSection } from './components/sections/AutomationSection';
import { MCPSection } from './components/sections/MCPSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ApisSection } from './components/sections/ApisSection';
import { SourcesSection } from './components/sections/SourcesSection';
import { TokenTipsSection } from './components/sections/TokenTipsSection';
import { PowerSetupSection } from './components/sections/PowerSetupSection';

export default function App() {
  return (
    <div style={{ background: '#09090b', minHeight: '100vh' }}>
      <Header />
      <main>
        <Hero />
        <ModelsSection />
        <AgentsSection />
        <AutomationSection />
        <PowerSetupSection />
        <MCPSection />
        <SkillsSection />
        <TokenTipsSection />
        <ApisSection />
        <SourcesSection />
      </main>
      <Footer />
    </div>
  );
}
