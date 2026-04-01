import { useTranslation } from 'react-i18next';
import { codingModels, benchmarkCaveat } from '../../data/models';
import { SectionTag } from '../ui/SectionTag';
import { Trophy, Zap, GitBranch } from 'lucide-react';

const badgeIcons: Record<string, { icon: typeof Trophy; label: string; labelFr: string; color: string }> = {
  topPick: { icon: Trophy, label: 'Top Pick', labelFr: 'Top Choix', color: '#fbbf24' },
  opensource: { icon: GitBranch, label: 'Open Source', labelFr: 'Open Source', color: '#4ade80' },
  fast: { icon: Zap, label: 'Fast', labelFr: 'Rapide', color: '#06b6d4' },
};

function ScoreBar({ value, color }: { value: number; color: string }) {
  if (!value) return <div className="h-1.5 rounded-full w-6" style={{ background: '#27272a' }} />;
  return (
    <div className="flex-1 h-1.5 rounded-full" style={{ background: '#27272a' }}>
      <div
        className="h-1.5 rounded-full"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

export function ModelsSection() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const sorted = [...codingModels].sort((a, b) => b.sweBenchNum - a.sweBenchNum);

  return (
    <section id="models" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTag label={t('models.tag')} color="#7c3aed" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {t('models.title')}
        </h2>
        <p className="text-lg mb-4 max-w-2xl" style={{ color: '#71717a' }}>
          {t('models.subtitle')}
        </p>

        <div className="flex flex-col gap-2 mb-10">
          <p className="text-xs px-3 py-2 rounded-lg max-w-3xl"
            style={{ color: '#a16207', background: '#1c1400', border: '1px solid #854d0e40' }}
          >
            {benchmarkCaveat[isFr ? 'fr' : 'en']}
          </p>
          <p className="text-xs" style={{ color: '#3f3f46' }}>
            📊 Source: llm-stats.com · benchlm.ai · artificialanalysis.ai — March 31, 2026
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block rounded-2xl border overflow-hidden" style={{ borderColor: '#27272a', background: '#111113' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a', background: '#18181b' }}>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('models.cols.model')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('models.cols.provider')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7c3aed' }}>SWE-bench ↓</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#06b6d4' }}>HumanEval</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#10b981' }}>LiveCodeBench</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('models.cols.context')}</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>{t('models.cols.free')}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((model, i) => (
                <tr
                  key={model.name}
                  className="transition-colors"
                  style={{ borderBottom: i < sorted.length - 1 ? '1px solid #1c1c1f' : 'none' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#18181b'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {/* Model name + badges */}
                  <td className="px-5 py-4 min-w-[220px]">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-medium text-white text-sm">{model.name}</span>
                        {model.badges.map((badge) => {
                          const b = badgeIcons[badge];
                          if (!b) return null;
                          const Icon = b.icon;
                          return (
                            <span key={badge} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium"
                              style={{ background: `${b.color}18`, color: b.color }}>
                              <Icon size={9} />{isFr ? b.labelFr : b.label}
                            </span>
                          );
                        })}
                      </div>
                      <span className="text-xs leading-tight" style={{ color: '#52525b' }}>{model.description}</span>
                    </div>
                  </td>
                  {/* Provider */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium px-2 py-1 rounded whitespace-nowrap"
                      style={{ background: `${model.providerColor}15`, color: model.providerColor }}>
                      {model.provider}
                    </span>
                  </td>
                  {/* SWE-bench */}
                  <td className="px-5 py-4 min-w-[100px]">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-white">{model.sweBench}</span>
                      <ScoreBar value={model.sweBenchNum} color="#7c3aed" />
                    </div>
                  </td>
                  {/* HumanEval */}
                  <td className="px-5 py-4 min-w-[100px]">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-white">{model.humanEval}</span>
                      <ScoreBar value={model.humanEvalNum} color="#06b6d4" />
                    </div>
                  </td>
                  {/* LiveCodeBench */}
                  <td className="px-5 py-4 min-w-[110px]">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-white">{model.liveCodeBench}</span>
                      <ScoreBar value={model.liveCodeBenchNum} color="#10b981" />
                    </div>
                  </td>
                  {/* Context */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono whitespace-nowrap" style={{ color: '#a1a1aa' }}>{model.contextWindow}</span>
                  </td>
                  {/* Free tier */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                      style={{
                        background: model.freeTier === 'yes' ? '#10b98120' : model.freeTier === 'limited' ? '#fbbf2420' : '#f8717120',
                        color: model.freeTier === 'yes' ? '#10b981' : model.freeTier === 'limited' ? '#fbbf24' : '#f87171',
                      }}>
                      {t(`models.${model.freeTier}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden flex flex-col gap-3">
          {sorted.map((model) => (
            <div key={model.name} className="rounded-2xl border p-4 card-hover"
              style={{ background: '#111113', borderColor: '#27272a' }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                    <span className="font-semibold text-white text-sm">{model.name}</span>
                    {model.badges.map((badge) => {
                      const b = badgeIcons[badge];
                      if (!b) return null;
                      const Icon = b.icon;
                      return (
                        <span key={badge} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs"
                          style={{ background: `${b.color}18`, color: b.color }}>
                          <Icon size={9} />{isFr ? b.labelFr : b.label}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-xs" style={{ color: '#52525b' }}>{model.provider} · {model.contextWindow} · {model.releaseDate}</span>
                </div>
                <span className="shrink-0 text-xs font-medium px-2 py-1 rounded-full"
                  style={{
                    background: model.freeTier === 'yes' ? '#10b98120' : model.freeTier === 'limited' ? '#fbbf2420' : '#f8717120',
                    color: model.freeTier === 'yes' ? '#10b981' : model.freeTier === 'limited' ? '#fbbf24' : '#f87171',
                  }}>
                  {t(`models.${model.freeTier}`)}
                </span>
              </div>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: '#71717a' }}>{model.description}</p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs mb-1" style={{ color: '#7c3aed' }}>SWE-bench</div>
                  <div className="text-sm font-bold text-white mb-1">{model.sweBench}</div>
                  <ScoreBar value={model.sweBenchNum} color="#7c3aed" />
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: '#06b6d4' }}>HumanEval</div>
                  <div className="text-sm font-bold text-white mb-1">{model.humanEval}</div>
                  <ScoreBar value={model.humanEvalNum} color="#06b6d4" />
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: '#10b981' }}>LiveCode</div>
                  <div className="text-sm font-bold text-white mb-1">{model.liveCodeBench}</div>
                  <ScoreBar value={model.liveCodeBenchNum} color="#10b981" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
