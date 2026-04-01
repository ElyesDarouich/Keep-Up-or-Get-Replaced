import { useTranslation } from 'react-i18next';
import { infoSources } from '../../data/sources';
import { SectionTag } from '../ui/SectionTag';

const platformColors: Record<string, string> = {
  twitter: '#e4e4e7',
  reddit: '#ff4500',
  instagram: '#e1306c',
  github: '#6ee7b7',
};

export function SourcesSection() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';

  return (
    <section id="sources" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTag label={t('sources.tag')} color="#06b6d4" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {t('sources.title')}
        </h2>
        <p className="text-lg mb-12 max-w-2xl" style={{ color: '#71717a' }}>
          {t('sources.subtitle')}
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {infoSources.map((source) => {
            const color = platformColors[source.platform];
            return (
              <div
                key={source.platform}
                className="rounded-2xl border overflow-hidden"
                style={{ background: '#111113', borderColor: '#27272a' }}
              >
                {/* Header */}
                <div
                  className="px-5 py-4 flex items-center gap-3 border-b"
                  style={{ borderColor: '#27272a', background: '#18181b' }}
                >
                  <span className="text-xl">{source.icon}</span>
                  <span className="font-semibold" style={{ color }}>
                    {t(`sources.platforms.${source.platform}`)}
                  </span>
                </div>

                {/* Accounts */}
                <div className="divide-y" style={{ borderColor: '#1c1c1f' }}>
                  {source.accounts.map((account) => (
                    <div
                      key={account.handle}
                      className="px-5 py-3 transition-colors"
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#18181b'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-sm font-medium" style={{ color }}>
                            {account.handle}
                          </span>
                          <span className="text-xs ml-2" style={{ color: '#52525b' }}>
                            {account.name}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: '#71717a' }}>
                        {isFr ? account.whyFr : account.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
