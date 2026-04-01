import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { powerTips, powerCategories, type PowerTip } from '../../data/powerTips';
import { SectionTag } from '../ui/SectionTag';
import { ChevronDown, Copy, Check, ExternalLink, Zap } from 'lucide-react';

function CodeBlock({ code, color }: { code: string; color: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden mt-3" style={{ background: '#0d0d0f', border: '1px solid #1c1c1f' }}>
      <button
        onClick={async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="absolute top-2 right-2 p-1.5 rounded-lg transition-colors"
        style={{ color: copied ? '#10b981' : '#3f3f46', background: '#18181b' }}
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
      </button>
      <pre className="text-xs p-3.5 overflow-x-auto leading-relaxed" style={{ color: `${color}cc`, margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TipCard({ tip, isFr }: { tip: PowerTip; isFr: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all duration-200"
      style={{ background: '#111113', borderColor: expanded ? `${tip.color}40` : '#27272a' }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <span className="text-lg shrink-0 mt-0.5">{tip.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-white mb-1">
            {isFr ? tip.titleFr : tip.title}
          </div>
          <div className="text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1"
            style={{ background: `${tip.color}15`, color: tip.color }}>
            <Zap size={9} />
            {isFr ? tip.impactFr : tip.impact}
          </div>
        </div>
        <ChevronDown
          size={14}
          className="shrink-0 mt-1 transition-transform duration-200"
          style={{ color: '#52525b', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-xs leading-relaxed mb-2" style={{ color: '#a1a1aa' }}>
            {isFr ? tip.descriptionFr : tip.description}
          </p>
          {tip.code && <CodeBlock code={tip.code} color={tip.color} />}
          {tip.source && (
            <div className="mt-2 flex items-center gap-1">
              <ExternalLink size={9} style={{ color: '#3f3f46' }} />
              <span className="text-xs" style={{ color: '#3f3f46' }}>{tip.source}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function PowerSetupSection() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? powerTips : powerTips.filter(t => t.category === active);

  return (
    <section id="power-setup" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTag
          label={isFr ? 'Setup de pro' : 'Power setup'}
          color="#f97316"
        />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {isFr ? 'Transforme ton workspace en machine de guerre' : 'Turn your workspace into a powerhouse'}
        </h2>
        <p className="text-lg mb-10 max-w-2xl" style={{ color: '#71717a' }}>
          {isFr
            ? 'Hooks, raccourcis, agents multiples, et configurations que les power users utilisent pour être 10x plus productifs. Données réelles, pas de théorie.'
            : 'Hooks, shortcuts, multi-agent orchestration, and configs that power users rely on to be 10x more productive. Real data, not theory.'}
        </p>

        {/* Quick stats banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { val: '30-50%', descEn: 'less tokens with .claudeignore', descFr: 'de tokens en moins avec .claudeignore', color: '#fbbf24' },
            { val: '32K', descEn: 'thinking tokens via ultrathink', descFr: 'tokens de réflexion via ultrathink', color: '#c084fc' },
            { val: '5', descEn: 'concurrent subagents max', descFr: 'sous-agents simultanés max', color: '#e879f9' },
            { val: '66%', descEn: 'of MCP servers have security issues', descFr: 'des serveurs MCP ont des failles', color: '#ef4444' },
          ].map(s => (
            <div key={s.val} className="rounded-xl border p-4 text-center" style={{ background: '#111113', borderColor: '#27272a' }}>
              <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.val}</div>
              <div className="text-xs" style={{ color: '#52525b' }}>{isFr ? s.descFr : s.descEn}</div>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {powerCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
              style={{
                background: active === cat.id ? '#f97316' : '#18181b',
                color: active === cat.id ? '#fff' : '#71717a',
                border: `1px solid ${active === cat.id ? '#f97316' : '#27272a'}`,
              }}
            >
              {cat.icon} {isFr ? cat.labelFr : cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs mb-4" style={{ color: '#52525b' }}>
          {filtered.length} {isFr ? 'astuces' : 'tips'} — {isFr ? 'clique pour développer' : 'click to expand'}
        </div>

        {/* Tips grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(tip => (
            <TipCard key={tip.id} tip={tip} isFr={isFr} />
          ))}
        </div>
      </div>
    </section>
  );
}
