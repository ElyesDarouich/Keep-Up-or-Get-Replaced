import { useTranslation } from 'react-i18next';
import { codingAgents } from '../../data/agents';
import { SectionTag } from '../ui/SectionTag';
import { Check, X, ExternalLink } from 'lucide-react';

function BoolCell({ value }: { value: boolean }) {
  return value
    ? <Check size={15} style={{ color: '#10b981' }} />
    : <X size={15} style={{ color: '#3f3f46' }} />;
}

export function AgentsSection() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  return (
    <section id="agents" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTag label={t('agents.tag')} color="#06b6d4" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {t('agents.title')}
        </h2>
        <p className="text-lg mb-10 max-w-2xl" style={{ color: '#71717a' }}>
          {t('agents.subtitle')}
        </p>

        {/* Copilot vs Agent explainer */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12 max-w-2xl">
          <div className="rounded-2xl border p-5" style={{ background: '#111113', borderColor: '#27272a' }}>
            <div className="text-xs font-medium mb-2" style={{ color: '#52525b' }}>Copilot</div>
            <p className="text-sm" style={{ color: '#a1a1aa' }}>{t('agents.whatIs.copilot')}</p>
          </div>
          <div className="rounded-2xl border p-5 relative overflow-hidden"
            style={{ background: '#111113', borderColor: '#06b6d4' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(6,182,212,0.06), transparent 60%)' }} />
            <div className="text-xs font-medium mb-2" style={{ color: '#06b6d4' }}>Agent</div>
            <p className="text-sm" style={{ color: '#a1a1aa' }}>{t('agents.whatIs.agent')}</p>
          </div>
        </div>

        {/* Source note */}
        <p className="text-xs mb-6" style={{ color: '#3f3f46' }}>
          📊 Source: awesomeagents.ai · shakudo.io · siliconangle.com · March 2026
        </p>

        {/* Desktop table */}
        <div className="hidden lg:block rounded-2xl border overflow-hidden" style={{ borderColor: '#27272a', background: '#111113' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a', background: '#18181b' }}>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('agents.cols.tool')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('agents.cols.model')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('agents.cols.fileAccess')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('agents.cols.browserControl')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('agents.cols.githubInt')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('agents.cols.freeTier')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('agents.cols.bestFor')}</th>
              </tr>
            </thead>
            <tbody>
              {codingAgents.map((agent, i) => (
                <tr key={agent.name}
                  className="transition-colors"
                  style={{ borderBottom: i < codingAgents.length - 1 ? '1px solid #1c1c1f' : 'none' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#18181b'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {/* Tool name */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <a href={agent.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-medium text-sm group"
                          style={{ color: agent.popular ? agent.color : '#fafafa' }}>
                          {agent.name}
                          <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        {agent.badge && (
                          <span className="text-xs px-1.5 py-0.5 rounded"
                            style={{ background: `${agent.color}18`, color: agent.color }}>
                            {isFr ? agent.badgeFr : agent.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs" style={{ color: '#52525b' }}>{agent.pricing}</span>
                    </div>
                  </td>
                  {/* Model */}
                  <td className="px-5 py-4">
                    <span className="text-xs leading-relaxed" style={{ color: '#71717a', maxWidth: '180px', display: 'block' }}>
                      {agent.model}
                    </span>
                  </td>
                  <td className="px-5 py-4"><BoolCell value={agent.fileAccess} /></td>
                  <td className="px-5 py-4"><BoolCell value={agent.browserControl} /></td>
                  <td className="px-5 py-4"><BoolCell value={agent.githubIntegration} /></td>
                  {/* Free tier */}
                  <td className="px-5 py-4">
                    <span className="text-xs leading-relaxed" style={{ color: agent.freeTier ? '#10b981' : '#71717a' }}>
                      {isFr ? agent.freeTierNoteFr : agent.freeTierNote}
                    </span>
                  </td>
                  {/* Best for */}
                  <td className="px-5 py-4 text-xs max-w-xs" style={{ color: '#a1a1aa' }}>
                    {isFr ? agent.bestForFr : agent.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden flex flex-col gap-3">
          {codingAgents.map((agent) => (
            <div key={agent.name} className="rounded-2xl border p-4 card-hover"
              style={{ background: '#111113', borderColor: '#27272a' }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <a href={agent.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-semibold text-sm"
                    style={{ color: agent.color }}>
                    {agent.name} <ExternalLink size={11} />
                  </a>
                  {agent.badge && (
                    <span className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: `${agent.color}18`, color: agent.color }}>
                      {isFr ? agent.badgeFr : agent.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs shrink-0 ml-2" style={{ color: '#52525b' }}>{agent.pricing}</span>
              </div>
              <p className="text-xs mb-1 leading-relaxed" style={{ color: '#52525b' }}>{agent.model}</p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: '#71717a' }}>
                {isFr ? agent.descriptionFr : agent.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs mb-2">
                <span style={{ color: agent.fileAccess ? '#10b981' : '#3f3f46' }}>
                  {agent.fileAccess ? '✓' : '✗'} Files
                </span>
                <span style={{ color: agent.browserControl ? '#10b981' : '#3f3f46' }}>
                  {agent.browserControl ? '✓' : '✗'} Browser
                </span>
                <span style={{ color: agent.githubIntegration ? '#10b981' : '#3f3f46' }}>
                  {agent.githubIntegration ? '✓' : '✗'} GitHub
                </span>
              </div>
              <div className="text-xs" style={{ color: agent.freeTier ? '#10b981' : '#71717a' }}>
                {isFr ? agent.freeTierNoteFr : agent.freeTierNote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
