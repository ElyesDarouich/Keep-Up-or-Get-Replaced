import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { tokenTips, promptTemplate, type TokenTip } from '../../data/tokenTips';
import { SectionTag } from '../ui/SectionTag';
import { Copy, Check, Zap, Star } from 'lucide-react';

type Category = 'all' | 'planning' | 'prompting' | 'tools' | 'workflow';

const categoryFilters: { id: Category; label: string; labelFr: string; color: string }[] = [
  { id: 'all', label: 'All tips', labelFr: 'Tous les conseils', color: '#71717a' },
  { id: 'planning', label: 'Planning', labelFr: 'Planification', color: '#7c3aed' },
  { id: 'prompting', label: 'Prompting', labelFr: 'Prompting', color: '#f472b6' },
  { id: 'tools', label: 'Tools', labelFr: 'Outils', color: '#38bdf8' },
  { id: 'workflow', label: 'Workflow', labelFr: 'Workflow', color: '#10b981' },
];

const impactColors = {
  high: { bg: '#ef444420', text: '#ef4444', label: 'High impact', labelFr: 'Impact élevé' },
  medium: { bg: '#fbbf2420', text: '#fbbf24', label: 'Medium', labelFr: 'Moyen' },
  low: { bg: '#3f3f4640', text: '#71717a', label: 'Low', labelFr: 'Faible' },
};

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mt-3 rounded-xl overflow-hidden" style={{ background: '#0d0d0f', border: '1px solid #1c1c1f' }}>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute top-2 right-2 p-1.5 rounded-lg transition-all z-10"
        style={{ color: copied ? '#10b981' : '#52525b', background: '#18181b' }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
      <pre className="text-xs p-4 overflow-x-auto leading-relaxed" style={{ color: '#a5f3fc', margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function PromptTemplateCard({ isFr }: { isFr: boolean }) {
  const tpl = isFr ? promptTemplate.fr : promptTemplate.en;
  const [copied, setCopied] = useState(false);
  const fullPrompt = tpl.parts.map(p => `**${p.label}:** ${p.placeholder}`).join('\n\n');

  return (
    <div className="rounded-2xl border p-6 relative overflow-hidden"
      style={{ background: '#111113', borderColor: '#f472b650' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(244,114,182,0.06), transparent 60%)' }} />
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Star size={14} style={{ color: '#f472b6' }} fill="#f472b6" />
            <span className="font-semibold text-white text-sm">{tpl.title}</span>
          </div>
          <p className="text-xs" style={{ color: '#71717a' }}>{tpl.subtitle}</p>
        </div>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(fullPrompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{ background: '#f472b620', color: '#f472b6', border: '1px solid #f472b640' }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? (isFr ? 'Copié !' : 'Copied!') : (isFr ? 'Copier tout' : 'Copy all')}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {tpl.parts.map((part, idx) => (
          <div key={idx} className="rounded-xl p-3" style={{ background: '#18181b', border: `1px solid ${part.color}25` }}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: part.color }} />
              <span className="text-xs font-semibold" style={{ color: part.color }}>{part.label}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#71717a' }}>{part.placeholder}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenTipsSection() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activeCategory === 'all' ? tokenTips : tokenTips.filter(t => t.category === activeCategory);
  const highImpact = filtered.filter(t => t.impact === 'high');
  const rest = filtered.filter(t => t.impact !== 'high');

  return (
    <section id="token-tips" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTag label={isFr ? 'Économiser des tokens' : 'Save your tokens'} color="#fbbf24" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {isFr ? 'Comment ne pas brûler ton quota en 10 minutes' : "How to not burn your quota in 10 minutes"}
        </h2>
        <p className="text-lg mb-4 max-w-2xl" style={{ color: '#71717a' }}>
          {isFr
            ? 'La plupart des tokens sont gaspillés sur l\'exploration de la codebase, les allers-retours de clarification et les grandes fenêtres de contexte. Voici comment éviter ça.'
            : 'Most tokens are wasted on codebase exploration, clarification back-and-forths, and large context windows. Here\'s how to avoid all of it.'}
        </p>

        {/* Stat banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { stat: '60–80%', label: isFr ? 'tokens économisés avec PLANNING.md' : 'tokens saved with PLANNING.md', color: '#7c3aed' },
            { stat: '5→1', label: isFr ? 'prompts avec le format 6 parties' : 'prompts with 6-part format', color: '#f472b6' },
            { stat: '~70%', label: isFr ? 'moins d\'appels d\'outils avec Repomix' : 'fewer tool calls with Repomix', color: '#38bdf8' },
            { stat: '/compact', label: isFr ? 'compresse le contexte, garde la progression' : 'compresses context, keeps progress', color: '#10b981' },
          ].map((s) => (
            <div key={s.stat} className="rounded-2xl border p-4 text-center"
              style={{ background: '#111113', borderColor: '#27272a' }}>
              <div className="text-xl font-bold mb-1" style={{ color: s.color }}>{s.stat}</div>
              <div className="text-xs" style={{ color: '#71717a' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryFilters.map((c) => (
            <button key={c.id} onClick={() => setActiveCategory(c.id)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeCategory === c.id ? c.color : '#18181b',
                color: activeCategory === c.id ? (c.id === 'all' ? '#fff' : '#000') : '#71717a',
                border: `1px solid ${activeCategory === c.id ? c.color : '#27272a'}`,
              }}>
              {isFr ? c.labelFr : c.label}
            </button>
          ))}
        </div>

        {/* Prompt template (always shown when prompting or all) */}
        {(activeCategory === 'all' || activeCategory === 'prompting') && (
          <div className="mb-6">
            <PromptTemplateCard isFr={isFr} />
          </div>
        )}

        {/* High impact tips */}
        {highImpact.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={13} style={{ color: '#ef4444' }} fill="#ef4444" />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#ef4444' }}>
                {isFr ? 'Impact élevé' : 'High impact'}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {highImpact.map((tip) => (
                <TipCard key={tip.id} tip={tip} isFr={isFr}
                  expanded={expandedId === tip.id}
                  onToggle={() => setExpandedId(expandedId === tip.id ? null : tip.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Rest */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((tip) => (
              <TipCard key={tip.id} tip={tip} isFr={isFr}
                expanded={expandedId === tip.id}
                onToggle={() => setExpandedId(expandedId === tip.id ? null : tip.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TipCard({ tip, isFr, expanded, onToggle }: {
  tip: TokenTip;
  isFr: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const impact = impactColors[tip.impact];
  return (
    <div className="rounded-2xl border overflow-hidden card-hover cursor-pointer"
      style={{ background: '#111113', borderColor: expanded ? tip.color + '50' : '#27272a' }}
      onClick={onToggle}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{tip.icon}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: impact.bg, color: impact.text }}>
              {isFr ? impact.labelFr : impact.label}
            </span>
          </div>
          <span className="text-xs shrink-0" style={{ color: '#3f3f46' }}>
            {expanded ? '▲' : '▼'}
          </span>
        </div>
        <h3 className="font-semibold text-white text-sm mb-2">
          {isFr ? tip.titleFr : tip.title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: '#71717a' }}>
          {isFr ? tip.descriptionFr : tip.description}
        </p>
        {expanded && tip.code && <CodeBlock code={tip.code} />}
      </div>
    </div>
  );
}
