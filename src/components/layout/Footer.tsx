import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      className="border-t mt-32 py-16"
      style={{ borderColor: '#27272a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold mx-auto mb-4"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
        >
          AI
        </div>
        <p className="font-semibold text-white mb-2">{t('footer.built')}</p>
        <p className="text-sm" style={{ color: '#71717a' }}>{t('footer.tagline')}</p>
        <div className="mt-8 pt-8 border-t text-xs" style={{ borderColor: '#27272a', color: '#52525b' }}>
          © 2026 Keep Up or Get Replaced
        </div>
      </div>
    </footer>
  );
}
