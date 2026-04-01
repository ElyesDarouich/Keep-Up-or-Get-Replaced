import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { skills, skillCategories, type Skill } from '../../data/skills';
import { SectionTag } from '../ui/SectionTag';
import { Terminal, Star, Info, X, Copy, Check } from 'lucide-react';

function SkillPopup({ skill, isFr, onClose }: { skill: Skill; isFr: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const category = skillCategories.find(c => c.id === skill.category);
  const domains = (isFr ? skill.descriptionFr : skill.description).split(/[,.]/).filter(Boolean).map(s => s.trim()).filter(s => s.length > 2).slice(0, 5);

  const examplePrompt = `${skill.command}: ${isFr ? skill.descriptionFr.split('.')[0] : skill.description.split('.')[0]}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: '#111113', border: `1px solid ${skill.color}40` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at top left, ${skill.color}10, transparent 60%)` }} />

        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-4" style={{ borderBottom: '1px solid #1c1c1f' }}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${skill.color}18` }}>
              <Terminal size={15} style={{ color: skill.color }} />
            </div>
            <div>
              <code className="text-base font-mono font-bold" style={{ color: skill.color }}>
                {skill.command}
              </code>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${skill.color}15`, color: skill.color }}>
                  {isFr ? category?.labelFr : category?.label}
                </span>
                {skill.essential && (
                  <span className="text-xs flex items-center gap-1" style={{ color: '#fbbf24' }}>
                    <Star size={10} fill="currentColor" />
                    {isFr ? 'Essentiel' : 'Essential'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-colors"
            style={{ color: '#52525b' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
            onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          {/* Description */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#52525b' }}>
              {isFr ? 'Description' : 'Description'}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
              {isFr ? skill.descriptionFr : skill.description}
            </p>
          </div>

          {/* Key domains */}
          {domains.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#52525b' }}>
                {isFr ? 'Domaines clés' : 'Key domains'}
              </div>
              <div className="flex flex-wrap gap-2">
                {domains.map((d, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg"
                    style={{ background: '#18181b', color: '#71717a', border: '1px solid #27272a' }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Example prompt */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#52525b' }}>
              {isFr ? 'Exemple d\'utilisation' : 'Example usage'}
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ background: '#0d0d0f', border: '1px solid #1c1c1f' }}>
              <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5" style={{ borderBottom: '1px solid #1c1c1f' }}>
                {['#ef4444', '#fbbf24', '#10b981'].map(c => (
                  <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                ))}
                <span className="text-xs ml-1" style={{ color: '#3f3f46' }}>claude-code</span>
              </div>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(examplePrompt);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-lg"
                style={{ color: copied ? '#10b981' : '#52525b', background: '#18181b' }}
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
              </button>
              <pre className="text-xs p-4 overflow-x-auto leading-relaxed" style={{ color: '#a5f3fc', margin: 0 }}>
                <code>{`> ${examplePrompt}`}</code>
              </pre>
            </div>
          </div>

          {/* Install hint */}
          <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: '#0d0d0f', border: '1px solid #1c1c1f' }}>
            <Terminal size={13} style={{ color: '#52525b' }} />
            <span className="text-xs" style={{ color: '#52525b' }}>
              {isFr
                ? 'Installe ce skill depuis le Claude Code Skills Marketplace ou copie-le dans '
                : 'Install from the Claude Code Skills Marketplace or place in '}
              <code style={{ color: '#71717a' }}>~/.claude/skills/</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
  const [active, setActive] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6">
      {selectedSkill && (
        <SkillPopup skill={selectedSkill} isFr={isFr} onClose={() => setSelectedSkill(null)} />
      )}

      <div className="max-w-7xl mx-auto">
        <SectionTag label={t('skills.tag')} color="#a78bfa" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
          {t('skills.title')}
        </h2>
        <p className="text-lg mb-10 max-w-2xl" style={{ color: '#71717a' }}>
          {t('skills.subtitle')}
        </p>

        {/* How to install */}
        <div
          className="rounded-2xl border p-6 mb-10 relative overflow-hidden"
          style={{ background: '#111113', borderColor: '#a78bfa40' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at bottom left, rgba(167,139,250,0.06), transparent 60%)' }}
          />
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={16} style={{ color: '#a78bfa' }} />
            <h3 className="font-semibold text-white text-sm">{t('skills.howTo.title')}</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex items-start gap-3 flex-1 p-3 rounded-xl"
                style={{ background: '#18181b' }}
              >
                <div
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: '#a78bfa20', color: '#a78bfa' }}
                >
                  {n}
                </div>
                <span className="text-sm" style={{ color: '#a1a1aa' }}>
                  {t(`skills.howTo.step${n}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
              style={{
                background: active === cat.id ? '#a78bfa' : '#18181b',
                color: active === cat.id ? '#fff' : '#71717a',
                border: `1px solid ${active === cat.id ? '#a78bfa' : '#27272a'}`,
              }}
            >
              {isFr ? cat.labelFr : cat.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="mb-5 text-xs" style={{ color: '#52525b' }}>
          {filtered.length} {isFr ? 'skills' : 'skills'}
          {filtered.filter(s => s.essential).length > 0 && (
            <span className="ml-3">
              ★ = {isFr ? 'essentiels' : 'essential'}
            </span>
          )}
          <span className="ml-3" style={{ color: '#3f3f46' }}>
            — {isFr ? 'clique sur' : 'click'} <Info size={10} className="inline" /> {isFr ? 'pour voir les détails' : 'to see details'}
          </span>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((skill) => (
            <div
              key={skill.command}
              className="rounded-xl border p-4 flex flex-col gap-2 card-hover"
              style={{
                background: '#111113',
                borderColor: skill.essential ? skill.color + '40' : '#27272a',
              }}
            >
              <div className="flex items-center justify-between">
                <code
                  className="text-xs font-mono border-none p-0 bg-transparent"
                  style={{ color: skill.color }}
                >
                  {skill.command}
                </code>
                <div className="flex items-center gap-1.5">
                  {skill.essential && <Star size={12} style={{ color: skill.color }} fill="currentColor" />}
                  <button
                    onClick={() => setSelectedSkill(skill)}
                    className="p-1 rounded-lg transition-colors"
                    style={{ color: '#3f3f46' }}
                    onMouseEnter={e => (e.currentTarget.style.color = skill.color)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#3f3f46')}
                    title={isFr ? 'Voir les détails' : 'View details'}
                  >
                    <Info size={13} />
                  </button>
                </div>
              </div>
              <div className="font-medium text-sm text-white">
                {isFr ? skill.nameFr : skill.name}
              </div>
              <p className="text-xs leading-relaxed flex-1" style={{ color: '#71717a' }}>
                {isFr ? skill.descriptionFr : skill.description}
              </p>
              <div
                className="mt-auto text-xs px-2 py-0.5 rounded-full self-start"
                style={{ background: `${skill.color}15`, color: skill.color }}
              >
                {skillCategories.find(c => c.id === skill.category)?.[isFr ? 'labelFr' : 'label'] ?? skill.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
