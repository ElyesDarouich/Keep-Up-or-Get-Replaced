export interface PowerTip {
  id: string;
  icon: string;
  color: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  category: 'hooks' | 'config' | 'shortcuts' | 'agents' | 'workflow';
  code?: string;
  impact: string;
  impactFr: string;
  source?: string;
}

export const powerTips: PowerTip[] = [
  // ─── HOOKS ────────────────────────────────────────────
  {
    id: 'auto-format',
    icon: '✨',
    color: '#a78bfa',
    title: 'Auto-format on every edit',
    titleFr: 'Auto-format à chaque édition',
    description: 'PostToolUse hook runs Prettier/gofmt automatically after every Write or Edit. No more formatting diffs in PRs. Works with any formatter.',
    descriptionFr: 'Un hook PostToolUse lance Prettier/gofmt automatiquement après chaque Write ou Edit. Plus de diffs de formatage dans les PRs.',
    category: 'hooks',
    code: `// settings.json → hooks
{
  "event": "PostToolUse",
  "matcher": "Write|Edit",
  "command": "npx prettier --write $FILE_PATH"
}`,
    impact: 'Zero formatting noise in diffs',
    impactFr: 'Zéro bruit de formatage dans les diffs',
    source: 'code.claude.com/docs/en/hooks-guide',
  },
  {
    id: 'pre-commit-lint',
    icon: '🛡️',
    color: '#f472b6',
    title: 'Pre-commit lint gate',
    titleFr: 'Gate de lint pré-commit',
    description: 'PreToolUse hook on git commit runs ESLint + TypeScript check. Exit code 2 blocks the commit. Catches unused imports, type errors, undefined variables before they ship.',
    descriptionFr: 'Un hook PreToolUse sur git commit lance ESLint + vérification TypeScript. Le code de sortie 2 bloque le commit. Attrape les imports inutilisés et erreurs de type.',
    category: 'hooks',
    code: `{
  "event": "PreToolUse",
  "matcher": "Bash",
  "command": "if echo $TOOL_INPUT | grep -q 'git commit'; then npx eslint . && npx tsc --noEmit; fi"
}`,
    impact: 'Blocks bad code before it commits',
    impactFr: 'Bloque le mauvais code avant le commit',
    source: 'dev.to/lukaszfryc/claude-code-hooks-complete-guide',
  },
  {
    id: 'session-context',
    icon: '📋',
    color: '#38bdf8',
    title: 'Auto-inject session context',
    titleFr: 'Injection automatique du contexte de session',
    description: 'SessionStart hook pulls git branch, recent commits, open issues, and env details into Claude\'s context. Every session starts with full project awareness — no manual briefing needed.',
    descriptionFr: 'Un hook SessionStart récupère la branche git, les commits récents, les issues ouvertes et les détails d\'environnement dans le contexte de Claude.',
    category: 'hooks',
    code: `{
  "event": "SessionStart",
  "command": "echo 'Branch:' $(git branch --show-current) && git log --oneline -5 && echo 'Issues:' && gh issue list -L 3"
}`,
    impact: 'Claude knows your project state instantly',
    impactFr: 'Claude connaît l\'état de ton projet instantanément',
    source: 'serenitiesai.com/articles/claude-code-hooks-guide-2026',
  },
  {
    id: 'block-danger',
    icon: '🚫',
    color: '#ef4444',
    title: 'Block destructive commands',
    titleFr: 'Bloquer les commandes destructrices',
    description: 'PreToolUse hook blocks rm -rf, DROP TABLE, force push, and other dangerous ops. Returns exit code 2 to deny permission. Safety net that catches accidents before they happen.',
    descriptionFr: 'Un hook PreToolUse bloque rm -rf, DROP TABLE, force push et autres opérations dangereuses. Retourne le code 2 pour refuser la permission.',
    category: 'hooks',
    code: `{
  "event": "PreToolUse",
  "matcher": "Bash",
  "command": "if echo $TOOL_INPUT | grep -qE 'rm -rf|DROP TABLE|--force|--hard'; then exit 2; fi"
}`,
    impact: 'Prevents catastrophic mistakes',
    impactFr: 'Empêche les erreurs catastrophiques',
    source: 'code.claude.com/docs/en/hooks-guide',
  },

  // ─── CONFIG ────────────────────────────────────────────
  {
    id: 'claudeignore',
    icon: '🚫',
    color: '#fbbf24',
    title: '.claudeignore — cut 30-50% context',
    titleFr: '.claudeignore — réduire 30-50% du contexte',
    description: 'Exclude node_modules, .next/, dist/, build/, lock files, and generated code. A single .next/ exclusion cuts context by 30-40% in Next.js. Biggest bang-for-buck optimization.',
    descriptionFr: 'Exclure node_modules, .next/, dist/, build/, fichiers lock et code généré. Une seule exclusion .next/ réduit le contexte de 30-40% en Next.js.',
    category: 'config',
    code: `# .claudeignore
node_modules/
.next/
dist/
build/
*.lock
coverage/
*.min.js
*.map`,
    impact: '30-50% token reduction',
    impactFr: 'Réduction de 30-50% des tokens',
    source: '32blog.com/en/claude-code/claude-code-token-cost-reduction-50-percent',
  },
  {
    id: 'claude-md',
    icon: '📄',
    color: '#10b981',
    title: 'CLAUDE.md — your project brain',
    titleFr: 'CLAUDE.md — le cerveau de ton projet',
    description: 'Keep it under 200 lines. Include: coding standards, file structure overview, test commands, common mistakes, and naming conventions. Loads automatically every session — most reliable way to encode project context.',
    descriptionFr: 'Garder sous 200 lignes. Inclure : standards de code, aperçu de la structure, commandes de test, erreurs courantes, conventions de nommage. Se charge automatiquement chaque session.',
    category: 'config',
    code: `# CLAUDE.md
## Stack: React 18 + FastAPI + PostgreSQL
## Test: npm test (frontend), pytest (backend)
## Style: Tailwind, no inline styles
## Naming: camelCase (TS), snake_case (Python)
## NEVER commit .env files
## Run lint before commit: npm run lint`,
    impact: '90% reduction vs no project docs (~800 tokens vs 11K)',
    impactFr: 'Réduction de 90% vs pas de docs projet (~800 tokens vs 11K)',
    source: 'github.com/nadimtuhin/claude-token-optimizer',
  },
  {
    id: 'settings-levels',
    icon: '⚙️',
    color: '#818cf8',
    title: '3 levels of settings.json',
    titleFr: '3 niveaux de settings.json',
    description: 'Global (~/.claude/settings.json) for all projects. Project shared (.claude/settings.json) committed to git for team standards. Project local (.claude/settings.local.json) gitignored for personal overrides.',
    descriptionFr: 'Global (~/.claude/settings.json) pour tous les projets. Projet partagé (.claude/settings.json) commité dans git pour les standards d\'équipe. Local (.claude/settings.local.json) gitignored.',
    category: 'config',
    code: `~/.claude/settings.json          # Global — all projects
.claude/settings.json             # Project — shared via git
.claude/settings.local.json       # Personal — gitignored`,
    impact: 'Team-wide consistency + personal overrides',
    impactFr: 'Cohérence d\'équipe + overrides personnels',
    source: 'code.claude.com/docs/en/settings',
  },

  // ─── SHORTCUTS ──────────────────────────────────────────
  {
    id: 'ultrathink',
    icon: '🧠',
    color: '#c084fc',
    title: 'Ultrathink — 32K reasoning tokens',
    titleFr: 'Ultrathink — 32K tokens de raisonnement',
    description: 'Type "ultrathink" in your prompt to unlock 31,999 thinking tokens for complex architecture, debugging, or multi-file refactors. Only works in Claude Code CLI — not on claude.ai. Use for hard problems only.',
    descriptionFr: 'Tape "ultrathink" dans ton prompt pour débloquer 31 999 tokens de réflexion pour l\'architecture complexe ou le refactoring multi-fichiers. Fonctionne uniquement dans Claude Code CLI.',
    category: 'shortcuts',
    code: `# Thinking levels (by keyword in prompt):
"think"        →  4K budget (quick)
"think hard"   →  10K budget
"think harder" →  24K budget
"ultrathink"   →  32K budget (max)`,
    impact: 'Dramatically better reasoning on complex tasks',
    impactFr: 'Raisonnement drastiquement meilleur sur les tâches complexes',
    source: 'findskill.ai/blog/claude-ultrathink-extended-thinking',
  },
  {
    id: 'command-prefixes',
    icon: '⚡',
    color: '#f97316',
    title: 'Command prefixes: !, #, @, &',
    titleFr: 'Préfixes de commande : !, #, @, &',
    description: '! executes bash directly (no model tokens). # saves to memory. @ adds context files. & runs tasks in background. These bypass the LLM for instant actions.',
    descriptionFr: '! exécute bash directement (pas de tokens modèle). # sauvegarde en mémoire. @ ajoute des fichiers de contexte. & lance des tâches en arrière-plan.',
    category: 'shortcuts',
    code: `! npm test              # Direct bash — 0 tokens
# Remember: API uses v3  # Save to memory
@ src/auth/             # Add folder to context
& Run tests in bg       # Background task`,
    impact: 'Skip the LLM for instant actions — 0 token cost',
    impactFr: 'Contourner le LLM pour actions instantanées — coût 0 token',
    source: 'help.apiyi.com/en/claude-code-tips-ultrathink-shortcuts-guide',
  },
  {
    id: 'plan-mode',
    icon: '📝',
    color: '#34d399',
    title: 'Plan mode before every big change',
    titleFr: 'Mode plan avant chaque gros changement',
    description: 'Shift+Tab toggles plan mode. Claude shows the plan without executing. Eliminates trial-and-error — the biggest source of token waste. Review the approach, then toggle back to execute.',
    descriptionFr: 'Shift+Tab bascule le mode plan. Claude montre le plan sans exécuter. Élimine le trial-and-error — la plus grande source de gaspillage de tokens.',
    category: 'shortcuts',
    code: `# Toggle plan mode
Shift+Tab  →  Plan mode (think only)
Shift+Tab  →  Execute mode (act)

# Key shortcuts
Esc        →  Interrupt
Tab        →  Toggle thinking visibility
Esc Esc    →  Go back`,
    impact: 'Eliminates biggest source of token waste',
    impactFr: 'Élimine la plus grande source de gaspillage de tokens',
    source: 'code.claude.com/docs/en/interactive-mode',
  },
  {
    id: 'compact',
    icon: '🗜️',
    color: '#06b6d4',
    title: '/compact before you hit the limit',
    titleFr: '/compact avant d\'atteindre la limite',
    description: 'Run /compact proactively to compress conversation while preserving key context. Don\'t wait until you hit the limit. Combine with /clear for a full reset. Context buffer is ~33K tokens in 2026.',
    descriptionFr: 'Lance /compact proactivement pour compresser la conversation en préservant le contexte clé. Ne pas attendre d\'atteindre la limite. Buffer de contexte ~33K tokens en 2026.',
    category: 'shortcuts',
    code: `/compact          # Compress conversation
/clear            # Full reset
/memory           # Edit persistent memory
/init             # Re-initialize project`,
    impact: 'Extends effective session length 3-5x',
    impactFr: 'Étend la durée effective de session 3-5x',
    source: 'institute.sfeir.com/en/claude-code/claude-code-context-management',
  },

  // ─── AGENTS ──────────────────────────────────────────────
  {
    id: 'subagents',
    icon: '🔀',
    color: '#e879f9',
    title: 'Subagents — parallel workers',
    titleFr: 'Sous-agents — travailleurs parallèles',
    description: 'Delegate exploratory tasks (file search, research) to subagents that have their own context window. Main context stays lightweight. Up to 5 simultaneous subagents in Claude Code v2.x.',
    descriptionFr: 'Déléguer les tâches exploratoires (recherche de fichiers, investigation) à des sous-agents avec leur propre fenêtre de contexte. Jusqu\'à 5 sous-agents simultanés en v2.x.',
    category: 'agents',
    code: `# Claude auto-spawns subagents for:
- File search across large repos
- Research tasks (web search, docs)
- Parallel code exploration
- Independent test runs

# Max 5 concurrent subagents`,
    impact: 'Main context stays clean — no bloat from exploration',
    impactFr: 'Contexte principal reste propre — pas de pollution par l\'exploration',
    source: 'code.claude.com/docs/en/agent-teams',
  },
  {
    id: 'worktrees',
    icon: '🌳',
    color: '#4ade80',
    title: 'Git worktrees — zero merge conflicts',
    titleFr: 'Git worktrees — zéro conflits de merge',
    description: 'Each subagent works in an isolated git worktree — its own branch and repo copy. Multiple agents edit code in parallel without stepping on each other. Auto-cleaned if no changes made.',
    descriptionFr: 'Chaque sous-agent travaille dans un worktree git isolé — sa propre branche et copie du repo. Plusieurs agents modifient le code en parallèle sans se gêner.',
    category: 'agents',
    code: `# Agent with worktree isolation
Agent(
  prompt="Refactor auth module",
  isolation="worktree"
)
# → Creates temp branch
# → Agent works independently
# → Merge when done`,
    impact: 'Parallel editing without conflicts',
    impactFr: 'Édition parallèle sans conflits',
    source: 'popularaitools.ai/blog/claude-code-git-worktrees-parallel-coding-2026',
  },
  {
    id: 'agent-teams',
    icon: '👥',
    color: '#f472b6',
    title: 'Agent Teams — multi-agent collaboration',
    titleFr: 'Agent Teams — collaboration multi-agents',
    description: 'Experimental feature: orchestrate teams of Claude Code sessions. One lead coordinates, teammates work independently in their own context and worktree. They can message each other directly — unlike subagents.',
    descriptionFr: 'Fonctionnalité expérimentale : orchestrer des équipes de sessions Claude Code. Un lead coordonne, les coéquipiers travaillent indépendamment avec leur propre contexte et worktree.',
    category: 'agents',
    code: `# 3-tier orchestration (2026):
Tier 1: Single session    # Interactive work
Tier 2: Subagents         # Parallel sprints
Tier 3: Agent Teams       # Drain backlog overnight`,
    impact: 'Ship features with a team of AI agents',
    impactFr: 'Livrer des features avec une équipe d\'agents IA',
    source: 'code.claude.com/docs/en/agent-teams',
  },

  // ─── WORKFLOW ──────────────────────────────────────────────
  {
    id: 'mcp-sweet-spot',
    icon: '🔌',
    color: '#fbbf24',
    title: 'MCP sweet spot: 3-5 servers max',
    titleFr: 'MCP sweet spot : 3-5 serveurs max',
    description: '3 MCP servers is optimal. 5 is the max before token overhead hurts. Each idle server costs ~1,750 tokens/message. Pick servers that cover your actual weekly workflow — not every shiny tool.',
    descriptionFr: '3 serveurs MCP est optimal. 5 est le max avant que le coût en tokens fasse mal. Chaque serveur inactif coûte ~1 750 tokens/message. Choisis ceux qui couvrent ton workflow réel.',
    category: 'workflow',
    code: `# Recommended starter set:
1. github         # PR/issue management
2. sequential-thinking  # Better reasoning
3. context7       # Live docs, no hallucination

# Add based on need:
4. playwright     # If you do web testing
5. filesystem     # If you need file ops`,
    impact: '~1,750 tokens saved per idle server removed',
    impactFr: '~1 750 tokens économisés par serveur inactif supprimé',
    source: 'builder.io/blog/best-mcp-servers-2026',
  },
  {
    id: 'structured-prompts',
    icon: '📐',
    color: '#818cf8',
    title: 'Structured > narrative prompts',
    titleFr: 'Structuré > prompts narratifs',
    description: 'A structured prompt (Role → Context → Task → Constraints) consumes 30% fewer tokens than a narrative paragraph. Be specific: "Refactor auth.py to use JWT with refresh tokens" beats "improve the auth".',
    descriptionFr: 'Un prompt structuré (Rôle → Contexte → Tâche → Contraintes) consomme 30% moins de tokens qu\'un paragraphe narratif. Être spécifique est la clé.',
    category: 'workflow',
    code: `# Structured prompt format:
Role: Senior backend engineer
Context: FastAPI + SQLAlchemy app
Task: Add rate limiting to /api/auth/*
Constraints: Use slowapi, 10 req/min
End condition: Tests pass, no regressions`,
    impact: '30% fewer tokens than narrative prompts',
    impactFr: '30% de tokens en moins que les prompts narratifs',
    source: 'institute.sfeir.com/en/claude-code/claude-code-context-management',
  },
  {
    id: 'print-mode',
    icon: '🖨️',
    color: '#fb923c',
    title: 'Print mode (-p) for CI/CD',
    titleFr: 'Mode print (-p) pour CI/CD',
    description: 'Run Claude Code with -p flag in non-interactive mode. Pipe prompts in, get results out. Perfect for CI pipelines: auto-generate changelogs, review PRs, update docs on every push.',
    descriptionFr: 'Lancer Claude Code avec le flag -p en mode non-interactif. Injecter des prompts, récupérer les résultats. Parfait pour les pipelines CI.',
    category: 'workflow',
    code: `# CI/CD integration examples:
echo "Review this diff" | claude -p
cat CHANGELOG_PROMPT | claude -p > CHANGELOG.md
claude -p "Generate release notes for v2.1"`,
    impact: 'AI-powered CI without manual intervention',
    impactFr: 'CI alimenté par l\'IA sans intervention manuelle',
    source: 'computingforgeeks.com/claude-code-cheat-sheet',
  },
  {
    id: 'security-66',
    icon: '🔒',
    color: '#ef4444',
    title: '66% of MCP servers have security issues',
    titleFr: '66% des serveurs MCP ont des problèmes de sécurité',
    description: 'Stick to vendor-maintained servers (GitHub, Figma, Sentry, Microsoft) or AAIF reference servers. Audit third-party servers before installing. PreToolUse hooks are your safety net.',
    descriptionFr: 'Utiliser les serveurs maintenus par les éditeurs (GitHub, Figma, Sentry, Microsoft) ou les serveurs de référence AAIF. Auditer les serveurs tiers avant installation.',
    category: 'workflow',
    code: `# Security checklist for MCP servers:
✓ Vendor-maintained or AAIF reference?
✓ Open source? Check the code
✓ PreToolUse hooks to block risky ops
✓ Never expose DB credentials directly
✓ Use .env for all tokens`,
    impact: 'Avoid supply chain attacks on your agent',
    impactFr: 'Éviter les attaques supply chain sur ton agent',
    source: 'builder.io/blog/best-mcp-servers-2026',
  },
];

export const powerCategories = [
  { id: 'all', label: 'All', labelFr: 'Tout', icon: '🔥' },
  { id: 'hooks', label: 'Hooks', labelFr: 'Hooks', icon: '🪝' },
  { id: 'config', label: 'Config', labelFr: 'Config', icon: '⚙️' },
  { id: 'shortcuts', label: 'Shortcuts', labelFr: 'Raccourcis', icon: '⌨️' },
  { id: 'agents', label: 'Multi-Agent', labelFr: 'Multi-Agent', icon: '🤖' },
  { id: 'workflow', label: 'Workflow', labelFr: 'Workflow', icon: '🔄' },
];
