import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const navItems = [
  { key: 'models', href: '#models' },
  { key: 'agents', href: '#agents' },
  { key: 'automation', href: '#automation' },
  { key: 'powerSetup', href: '#power-setup' },
  { key: 'mcp', href: '#mcp' },
  { key: 'skills', href: '#skills' },
  { key: 'tokenTips', href: '#token-tips' },
  { key: 'apis', href: '#apis' },
  { key: 'sources', href: '#sources' },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(9,9,11,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #27272a' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
          >
            AI
          </div>
          <span className="font-semibold text-white text-sm hidden sm:block">
            Keep Up or Get Replaced
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="px-3 py-1.5 text-sm rounded-lg transition-colors duration-150"
              style={{ color: '#a1a1aa' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#fafafa';
                (e.target as HTMLElement).style.background = '#18181b';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = '#a1a1aa';
                (e.target as HTMLElement).style.background = 'transparent';
              }}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150"
            style={{
              borderColor: '#3f3f46',
              color: '#a1a1aa',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#7c3aed';
              (e.currentTarget as HTMLElement).style.color = '#fafafa';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#3f3f46';
              (e.currentTarget as HTMLElement).style.color = '#a1a1aa';
            }}
          >
            {i18n.language === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: '#a1a1aa' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t"
          style={{
            background: 'rgba(9,9,11,0.98)',
            backdropFilter: 'blur(12px)',
            borderColor: '#27272a',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm rounded-lg transition-colors"
                style={{ color: '#a1a1aa' }}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
