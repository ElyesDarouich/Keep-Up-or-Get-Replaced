import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mcpTools, mcpCategories, type AgentId } from '../../data/mcpTools';
import { SectionTag } from '../ui/SectionTag';
import { Copy, Check } from 'lucide-react';

const agentFilters = [
  { id: 'all', label: 'All tools', labelFr: 'Tous les outils' },
  { id: 'claude-code', label: 'Claude Code', labelFr: 'Claude Code' },
  { id: 'cursor', label: 'Cursor', labelFr: 'Cursor' },
  { id: 'aider', label: 'Aider', labelFr: 'Aider' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-1.5 rounded-lg transition-all"
      style={{ color: copied ? '#10b981' : '#52525b', background: '#27272a' }}
      title="Copy"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

export function MCPSection() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const [activeAgent, setActiveAgent] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = mcpTools.filter((tool) => {
    const agentMatch = activeAgent === 'all' || tool.forAgents.includes(activeAgent as AgentId) || tool.forAgents.includes('all');
    const catMatch = activeCategory === 'all' || tool.category === activeCategory;
    return agentMatch && catMatch;
  });

  return (
    <section id="mcp" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTag label={t('mcp.tag')} color="#f472b6" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {t('mcp.title')}
        </h2>
        <p className="text-lg mb-10 max-w-2xl" style={{ color: '#71717a' }}>
          {t('mcp.subtitle')}
        </p>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs shrink-0" style={{ color: '#52525b' }}>{t('mcp.selectLabel')}:</span>
            {agentFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveAgent(f.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150"
                style={{
                  background: activeAgent === f.id ? '#7c3aed' : '#18181b',
                  color: activeAgent === f.id ? '#fff' : '#71717a',
                  border: `1px solid ${activeAgent === f.id ? '#7c3aed' : '#27272a'}`,
                }}
              >
                {isFr ? f.labelFr : f.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center sm:border-l sm:pl-4" style={{ borderColor: '#27272a' }}>
            {mcpCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150"
                style={{
                  background: activeCategory === c.id ? '#f472b6' : '#18181b',
                  color: activeCategory === c.id ? '#fff' : '#71717a',
                  border: `1px solid ${activeCategory === c.id ? '#f472b6' : '#27272a'}`,
                }}
              >
                {isFr ? c.labelFr : c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count badge */}
        <div className="mb-5 text-xs" style={{ color: '#52525b' }}>
          {filtered.length} {isFr ? 'outils' : 'tools'}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border p-5 flex flex-col gap-4 card-hover"
              style={{
                background: '#111113',
                borderColor: tool.essential ? tool.color + '40' : '#27272a',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tool.icon}</span>
                  <div>
                    <div className="font-medium text-white text-sm">{tool.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {tool.essential && (
                        <span className="text-xs" style={{ color: tool.color }}>essential</span>
                      )}
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full capitalize"
                        style={{ background: '#18181b', color: '#52525b', border: '1px solid #27272a' }}
                      >
                        {tool.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed" style={{ color: '#71717a' }}>
                {isFr ? tool.descriptionFr : tool.description}
              </p>

              {/* Key tools */}
              <div>
                <div className="text-xs font-medium mb-2" style={{ color: '#52525b' }}>
                  {t('mcp.keyTools')}
                </div>
                <div className="flex flex-wrap gap-1">
                  {tool.keyTools.slice(0, 4).map((k) => (
                    <span
                      key={k}
                      className="text-xs px-1.5 py-0.5 rounded font-mono"
                      style={{ background: '#1a1a1f', color: '#a5f3fc', border: '1px solid #27272a' }}
                    >
                      {k}
                    </span>
                  ))}
                  {tool.keyTools.length > 4 && (
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ color: '#52525b', background: '#18181b' }}>
                      +{tool.keyTools.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Use case */}
              <div className="text-xs" style={{ color: '#71717a' }}>
                <span style={{ color: '#52525b' }}>{t('mcp.useCase')}: </span>
                {isFr ? tool.useCaseFr : tool.useCase}
              </div>

              {/* Install command */}
              <div className="mt-auto">
                <div className="text-xs font-medium mb-1.5" style={{ color: '#52525b' }}>
                  {t('mcp.install')}
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: '#0d0d0f', border: '1px solid #1c1c1f' }}>
                  <code className="text-xs flex-1 truncate border-none bg-transparent p-0" style={{ color: '#86efac' }}>
                    {tool.installCommand}
                  </code>
                  <CopyButton text={tool.installCommand} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
