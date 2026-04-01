import { useTranslation } from 'react-i18next';
import { SectionTag } from '../ui/SectionTag';
import { Check } from 'lucide-react';

const levels = [
  { key: 'l1', color: '#10b981', number: '01' },
  { key: 'l2', color: '#fbbf24', number: '02' },
  { key: 'l3', color: '#7c3aed', number: '03' },
];

export function AutomationSection() {
  const { t } = useTranslation();
  const setupItems = t('automation.setupItems', { returnObjects: true }) as string[];

  return (
    <section id="automation" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTag label={t('automation.tag')} color="#10b981" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {t('automation.title')}
        </h2>
        <p className="text-lg mb-16 max-w-2xl" style={{ color: '#71717a' }}>
          {t('automation.subtitle')}
        </p>

        {/* 3 levels */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {levels.map((level) => (
            <div
              key={level.key}
              className="relative rounded-2xl border p-6 overflow-hidden card-hover"
              style={{ background: '#111113', borderColor: '#27272a' }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${level.color}12, transparent 70%)` }}
              />
              <div
                className="text-4xl font-black mb-4 opacity-20"
                style={{ color: level.color }}
              >
                {level.number}
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">
                {t(`automation.levels.${level.key}.label`)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#71717a' }}>
                {t(`automation.levels.${level.key}.desc`)}
              </p>
              <div
                className="mt-4 h-0.5 rounded-full"
                style={{ background: `linear-gradient(to right, ${level.color}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* My setup */}
        <div
          className="rounded-2xl border p-8 relative overflow-hidden"
          style={{ background: '#111113', borderColor: '#27272a' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top right, rgba(124,58,237,0.07), transparent 60%)' }}
          />
          <h3 className="font-semibold text-white text-lg mb-6">{t('automation.mySetup')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.isArray(setupItems) && setupItems.map((item: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: '#18181b' }}
              >
                <div
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: '#7c3aed20' }}
                >
                  <Check size={10} style={{ color: '#7c3aed' }} />
                </div>
                <span className="text-sm" style={{ color: '#a1a1aa' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
