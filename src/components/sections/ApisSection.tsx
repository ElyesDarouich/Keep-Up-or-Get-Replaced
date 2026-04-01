import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiProviders, nvidiaModels, groqModels } from '../../data/apis';
import { SectionTag } from '../ui/SectionTag';
import { ExternalLink, Zap } from 'lucide-react';

const useCaseFilters = [
  { id: 'all', label: 'All', labelFr: 'Tous' },
  { id: 'Agentic', label: 'Agentic', labelFr: 'Agentique' },
  { id: 'Coding', label: 'Coding', labelFr: 'Code' },
  { id: 'RAG', label: 'RAG', labelFr: 'RAG' },
  { id: 'Chatbot', label: 'Chatbot', labelFr: 'Chatbot' },
  { id: 'Security', label: 'Security', labelFr: 'Sécurité' },
  { id: 'Lightweight', label: 'Lightweight', labelFr: 'Léger' },
];

export function ApisSection() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const [activeUseCase, setActiveUseCase] = useState('all');

  const filteredNvidia = activeUseCase === 'all'
    ? nvidiaModels
    : nvidiaModels.filter((m) => m.category.toLowerCase().includes(activeUseCase.toLowerCase()));

  return (
    <section id="apis" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTag label={t('apis.tag')} color="#76b900" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {t('apis.title')}
        </h2>
        <p className="text-lg mb-12 max-w-2xl" style={{ color: '#71717a' }}>
          {t('apis.subtitle')}
        </p>

        {/* Provider cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {apiProviders.map((provider) => (
            <div
              key={provider.name}
              className="rounded-2xl border p-6 flex flex-col gap-4 card-hover relative overflow-hidden"
              style={{
                background: '#111113',
                borderColor: provider.featured ? provider.color + '50' : '#27272a',
              }}
            >
              {provider.featured && (
                <div
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{ background: `radial-gradient(circle, ${provider.color}10, transparent 70%)` }}
                />
              )}

              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: provider.bgColor }}
                  >
                    {provider.logo}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{provider.name}</div>
                    {provider.featured && (
                      <div className="text-xs flex items-center gap-1" style={{ color: provider.color }}>
                        <Zap size={10} fill="currentColor" /> Featured
                      </div>
                    )}
                  </div>
                </div>
                <a
                  href={provider.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    background: provider.bgColor,
                    color: provider.color,
                    border: `1px solid ${provider.color}40`,
                  }}
                >
                  {t('apis.cols.signup')} <ExternalLink size={10} />
                </a>
              </div>

              {/* Description */}
              <p className="text-sm" style={{ color: '#71717a' }}>
                {isFr ? provider.descriptionFr : provider.description}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t('apis.cols.rpmFree'), value: provider.rpmFree },
                  { label: t('apis.cols.tpmFree'), value: provider.tpmFree },
                  { label: t('apis.cols.bestFor'), value: isFr ? provider.bestForFr : provider.bestFor },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl p-3" style={{ background: '#18181b' }}>
                    <div className="text-xs mb-1" style={{ color: '#52525b' }}>{stat.label}</div>
                    <div className="text-xs font-medium text-white leading-tight">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Models */}
              <div className="flex flex-wrap gap-1">
                {provider.models.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: '#1a1a1f', color: '#71717a', border: '1px solid #27272a' }}
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Note */}
              {(isFr ? provider.noteFr : provider.note) && (
                <div
                  className="text-xs p-3 rounded-xl"
                  style={{ background: `${provider.color}0a`, color: provider.color, border: `1px solid ${provider.color}20` }}
                >
                  💡 {isFr ? provider.noteFr : provider.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Groq rate limits table */}
        <div
          className="rounded-2xl border p-6 mb-8 relative overflow-hidden"
          style={{ background: '#111113', borderColor: '#f9731650' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top left, rgba(249,115,22,0.07), transparent 60%)' }}
          />
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🚀</span>
            <h3 className="font-semibold text-white">Groq — Free tier rate limits (real numbers)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr style={{ borderBottom: '1px solid #27272a' }}>
                  {['Model', 'RPM', 'RPD', 'TPM', 'TPD', 'Category'].map((col) => (
                    <th key={col} className="pb-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#52525b' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groqModels.map((m, i) => (
                  <tr
                    key={m.name}
                    style={{ borderBottom: i < groqModels.length - 1 ? '1px solid #1c1c1f' : 'none' }}
                  >
                    <td className="py-2.5 pr-4 font-mono text-xs" style={{ color: '#a5f3fc' }}>{m.name}</td>
                    <td className="py-2.5 pr-4 text-sm font-medium text-white">{m.rpm}</td>
                    <td className="py-2.5 pr-4 text-sm font-medium text-white">{m.rpd.toLocaleString()}</td>
                    <td className="py-2.5 pr-4 text-sm font-medium text-white">{m.tpm.toLocaleString()}</td>
                    <td className="py-2.5 pr-4 text-sm font-medium text-white">{m.tpd.toLocaleString()}</td>
                    <td className="py-2.5">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f9731618', color: '#f97316' }}>
                        {m.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-4" style={{ color: '#52525b' }}>
            RPM = requests/min · RPD = requests/day · TPM = tokens/min · TPD = tokens/day · Cached tokens don't count against limits.
          </p>
        </div>

        {/* Nvidia spotlight */}
        <div
          className="rounded-2xl border p-8 relative overflow-hidden"
          style={{ background: '#111113', borderColor: '#76b90050' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top right, rgba(118,185,0,0.07), transparent 60%)' }}
          />

          <SectionTag label={t('apis.nvidiaModels.tag')} color="#76b900" />
          <h3 className="text-xl font-bold text-white mt-3 mb-2">{t('apis.nvidiaModels.title')}</h3>
          <p className="text-sm mb-6" style={{ color: '#71717a' }}>{t('apis.highlight')}</p>
          <p className="text-sm mb-8 p-4 rounded-xl" style={{ background: '#18181b', color: '#a1a1aa' }}>
            {isFr ? apiProviders[0].descriptionFr : apiProviders[0].description} {isFr ? apiProviders[0].noteFr : apiProviders[0].note}
          </p>

          {/* Use case filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {useCaseFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveUseCase(f.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: activeUseCase === f.id ? '#76b900' : '#18181b',
                  color: activeUseCase === f.id ? '#000' : '#71717a',
                  border: `1px solid ${activeUseCase === f.id ? '#76b900' : '#27272a'}`,
                }}
              >
                {isFr ? f.labelFr : f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredNvidia.map((model) => (
              <div
                key={model.name}
                className="rounded-xl border p-4 card-hover"
                style={{ background: '#18181b', borderColor: '#27272a' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{model.icon}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${model.color}18`, color: model.color }}
                  >
                    {isFr ? model.categoryFr : model.category}
                  </span>
                </div>
                <div className="font-mono text-xs text-white mb-2 truncate">{model.name}</div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: '#71717a' }}>
                  {isFr ? model.descriptionFr : model.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#52525b' }}>Context: {model.contextWindow}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
