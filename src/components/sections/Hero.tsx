import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowRight, Cpu, Zap, Wrench, BookOpen, Rocket, Brain, DollarSign, Newspaper, Settings } from 'lucide-react';

const TICKER_ITEMS = [
  { label: 'Claude Code', color: '#c084fc' },
  { label: 'Cursor', color: '#60a5fa' },
  { label: 'Claude Opus 4.6', color: '#c084fc' },
  { label: 'Gemini 3.1 Pro', color: '#34d399' },
  { label: 'Windsurf', color: '#38bdf8' },
  { label: '/agent-designer', color: '#e879f9' },
  { label: 'MCP Tools', color: '#fbbf24' },
  { label: 'GPT-5.4', color: '#6ee7b7' },
  { label: 'GitHub Copilot', color: '#818cf8' },
  { label: '/sparc-orchestrator', color: '#f472b6' },
  { label: 'Google Antigravity', color: '#34d399' },
  { label: 'PLANNING.md', color: '#10b981' },
  { label: 'Devin 2.0', color: '#f472b6' },
  { label: 'Kimi K2.5', color: '#fbbf24' },
  { label: '/commit', color: '#6ee7b7' },
  { label: 'Repomix', color: '#a78bfa' },
  { label: 'DeepSeek V3.2', color: '#38bdf8' },
  { label: 'sequential-thinking', color: '#a78bfa' },
  { label: 'Bolt.new', color: '#fbbf24' },
  { label: 'Context7', color: '#4ade80' },
];

const TERMINAL_LINES = [
  { text: '> /agent-designer: build a RAG pipeline for codebase Q&A', color: '#a5f3fc', delay: 0 },
  { text: '⠋ Spawning architecture agent...', color: '#a78bfa', delay: 900 },
  { text: '✓ Vector store: Chroma + BGE-M3 embeddings', color: '#10b981', delay: 1800 },
  { text: '✓ Retrieval: HyDE + MMR reranking', color: '#10b981', delay: 2600 },
  { text: '✓ Generated 3 files, 0 errors  [2.4s]', color: '#10b981', delay: 3400 },
  { text: '> /commit', color: '#a5f3fc', delay: 4200 },
  { text: '✓ feat: add RAG pipeline for codebase Q&A', color: '#6ee7b7', delay: 5000 },
];

const SHORTCUTS = [
  { href: '#models', icon: Brain, labelEn: 'Which model is best?', labelFr: 'Quel modèle choisir ?', color: '#c084fc' },
  { href: '#agents', icon: Zap, labelEn: 'Pick my coding agent', labelFr: 'Choisir mon agent', color: '#f472b6' },
  { href: '#automation', icon: Rocket, labelEn: 'Automate everything', labelFr: 'Tout automatiser', color: '#10b981' },
  { href: '#power-setup', icon: Settings, labelEn: 'Power user setup', labelFr: 'Setup de pro', color: '#f97316' },
  { href: '#mcp', icon: Wrench, labelEn: 'Supercharge with MCPs', labelFr: 'Booster avec les MCPs', color: '#fbbf24' },
  { href: '#skills', icon: BookOpen, labelEn: 'Unlock slash commands', labelFr: 'Débloquer les slash commands', color: '#a78bfa' },
  { href: '#token-tips', icon: DollarSign, labelEn: 'Save tokens & money', labelFr: 'Économiser tokens & argent', color: '#34d399' },
  { href: '#apis', icon: Cpu, labelEn: 'Free API access', labelFr: 'APIs gratuites', color: '#38bdf8' },
  { href: '#sources', icon: Newspaper, labelEn: 'Stay in the loop', labelFr: 'Rester à jour', color: '#fb923c' },
];

const FEATURES = [
  { icon: Cpu, labelEn: '9 AI models ranked by real benchmarks', labelFr: '9 modèles IA classés par vrais benchmarks', color: '#c084fc' },
  { icon: Zap, labelEn: '9 coding agents compared side-by-side', labelFr: '9 agents de code comparés côte à côte', color: '#f472b6' },
  { icon: Wrench, labelEn: '12 MCP tools with install commands', labelFr: '12 outils MCP avec commandes d\'install', color: '#fbbf24' },
  { icon: BookOpen, labelEn: '40+ slash commands & token-saving tips', labelFr: '40+ slash commands et tips pour économiser des tokens', color: '#10b981' },
];

function TerminalPreview() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < TERMINAL_LINES.length) {
        const gap = i === 0 ? 600 : TERMINAL_LINES[i].delay - TERMINAL_LINES[i - 1].delay;
        const timer = setTimeout(() => {
          setVisibleLines(prev => prev + 1);
          i++;
          tick();
        }, gap);
        return timer;
      }
    };
    const t = tick();
    return () => { if (t) clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (visibleLines === TERMINAL_LINES.length) {
      const t = setTimeout(() => setVisibleLines(0), 3000);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <div className="rounded-2xl overflow-hidden h-full" style={{ background: '#0d0d0f', border: '1px solid #1c1c1f' }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #1c1c1f', background: '#111113' }}>
        {['#ef4444', '#fbbf24', '#10b981'].map(c => (
          <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="text-xs ml-2 font-mono" style={{ color: '#3f3f46' }}>claude-code — ~/my-project</span>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed min-h-[140px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="mb-1" style={{ color: line.color }}>
            {line.text}
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-3.5 align-middle animate-pulse" style={{ background: '#a5f3fc', opacity: 0.7 }} />
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-dots opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)' }} aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-8"
          style={{ borderColor: '#3f3f46', color: '#a1a1aa', background: 'rgba(39,39,42,0.5)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {isFr ? 'Sans hype. Juste les outils.' : 'No hype. Just tools.'}
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
          <span className="text-white">{isFr ? "L'IA en 2026, " : 'AI in 2026, '}</span>
          <span className="gradient-text">{isFr ? 'vraiment expliquée.' : 'actually explained.'}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: '#71717a' }}>
          {isFr
            ? "Un guide pratique pour les curieux qui veulent comprendre ce qui se passe avec l'IA — sans le bruit des influenceurs. Vrais outils, vrais setups, avis honnêtes."
            : "A practical guide for curious people who want to understand what's happening with AI — without the influencer noise. Real tools, real setups, honest takes."}
        </p>

        {/* Jump-to shortcut buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-4 max-w-3xl mx-auto">
          {SHORTCUTS.map(({ href, icon: Icon, labelEn, labelFr, color }) => (
            <a
              key={href}
              href={href}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: `${color}10`,
                color,
                border: `1px solid ${color}25`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${color}20`;
                (e.currentTarget as HTMLElement).style.borderColor = `${color}50`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${color}20`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = `${color}10`;
                (e.currentTarget as HTMLElement).style.borderColor = `${color}25`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <Icon size={14} />
              <span>{isFr ? labelFr : labelEn}</span>
              <ArrowRight size={12} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
            </a>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-10 mt-10 w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex gap-3 ticker-scroll">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border whitespace-nowrap"
              style={{ background: `${item.color}12`, color: item.color, borderColor: `${item.color}30` }}>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Bento grid */}
      <div className="relative z-10 mt-8 w-full max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="sm:col-span-3">
            <TerminalPreview />
          </div>
          <div className="sm:col-span-2 rounded-2xl border p-5 flex flex-col gap-3"
            style={{ background: '#111113', borderColor: '#27272a' }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#52525b' }}>
              {isFr ? 'Ce que tu vas maîtriser' : "What you'll master"}
            </div>
            {FEATURES.map(({ icon: Icon, labelEn, labelFr, color }) => (
              <div key={labelEn} className="flex items-start gap-3">
                <div className="mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${color}18` }}>
                  <Icon size={13} style={{ color }} />
                </div>
                <span className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
                  {isFr ? labelFr : labelEn}
                </span>
              </div>
            ))}
            <div className="mt-auto pt-3 flex items-center gap-2" style={{ borderTop: '1px solid #1c1c1f' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-xs" style={{ color: '#52525b' }}>
                {isFr ? 'Données en temps réel · Mise à jour mars 2026' : 'Live data · Updated March 2026'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs animate-bounce"
        style={{ color: '#3f3f46' }}>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
