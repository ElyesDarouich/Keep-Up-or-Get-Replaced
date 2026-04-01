export interface TokenTip {
  id: string;
  icon: string;
  color: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  impact: 'high' | 'medium' | 'low';
  category: 'planning' | 'prompting' | 'tools' | 'workflow';
  code?: string;
  stat?: string;
  source?: string;
}

export const tokenTips: TokenTip[] = [
  // ─── PLANNING ──────────────────────────────────────────────────
  {
    id: 'planning-md',
    icon: '📋',
    color: '#7c3aed',
    title: 'Write a PLANNING.md before every complex task',
    titleFr: 'Écrire un PLANNING.md avant chaque tâche complexe',
    description: 'The biggest token drain is the agent exploring your codebase blind — reading dozens of files to understand what to do. Write a PLANNING.md: goal, relevant files, constraints, expected output. One file read instead of 40 Glob/Read/Grep calls.',
    descriptionFr: 'Le plus grand gaspillage de tokens est l\'agent qui explore ta codebase à l\'aveugle — lisant des dizaines de fichiers. Écris un PLANNING.md : objectif, fichiers pertinents, contraintes, sortie attendue. Un fichier lu au lieu de 40 appels Glob/Read/Grep.',
    impact: 'high',
    category: 'planning',
    stat: '40–55%',
    source: 'practitioner reports',
    code: `# PLANNING.md
## Goal
Refactor auth module to use JWT instead of sessions.

## Files to touch
- src/auth/session.ts → replace with jwt.ts
- src/middleware/auth.ts → update verify logic
- src/routes/login.ts → update response shape

## Do NOT touch
- src/db/ (schema stays the same)
- any test files

## Expected output
All /api/* routes use Authorization: Bearer <token>
Tests pass. No DB schema changes.`,
  },
  {
    id: 'planning-with-files',
    icon: '🗂️',
    color: '#06b6d4',
    title: 'Use the planning-with-files skill (Manus-style)',
    titleFr: 'Utiliser le skill planning-with-files (style Manus)',
    description: 'This Claude Code skill (github: OthmanAdi/planning-with-files) implements the Manus AI workflow pattern — treat context window as RAM and filesystem as disk. It creates 3 markdown files: task_plan.md, findings.md, progress.md. When you /clear, the agent reads these instead of re-exploring your codebase.',
    descriptionFr: 'Ce skill Claude Code (github: OthmanAdi/planning-with-files) implémente le pattern Manus AI — traite la fenêtre de contexte comme RAM et le filesystem comme disque. Il crée 3 fichiers markdown : task_plan.md, findings.md, progress.md. Quand tu /clear, l\'agent lit ces fichiers au lieu de ré-explorer ta codebase.',
    impact: 'high',
    category: 'planning',
    stat: '40–55%',
    source: 'github.com/OthmanAdi/planning-with-files',
    code: `# The 3-file system (created automatically by the skill)

task_plan.md    → phases, goals, subtasks breakdown
findings.md     → research results, decisions made, discoveries
progress.md     → session logs, test results, what was done

# Workflow:
# 1. Start session → skill creates the 3 files
# 2. Agent explores codebase → writes to findings.md
# 3. /clear (burn exploration tokens)
# 4. New session reads the files → executes without re-exploring
# Result: 40-55% fewer tokens on complex multi-session tasks`,
  },
  {
    id: 'agents-md',
    icon: '📄',
    color: '#10b981',
    title: 'Add an AGENTS.md to every project',
    titleFr: 'Ajouter un AGENTS.md à chaque projet',
    description: 'Over 60,000 open-source repos have adopted AGENTS.md since 2025. An arxiv study (2601.20404) found it correlates with 28.64% lower runtime and 16.58% fewer output tokens. Every major tool reads it: Cursor, Claude Code, Codex, Windsurf, Zed.',
    descriptionFr: 'Plus de 60 000 repos open-source ont adopté AGENTS.md depuis 2025. Une étude arxiv (2601.20404) a trouvé une corrélation avec 28,64% moins de temps d\'exécution et 16,58% moins de tokens de sortie. Tous les outils majeurs le lisent : Cursor, Claude Code, Codex, Windsurf, Zed.',
    impact: 'high',
    category: 'planning',
    stat: '16.58%',
    source: 'arxiv 2601.20404',
    code: `# AGENTS.md (project root — read by all major AI tools)

## Stack
FastAPI + PostgreSQL + React + Vite + Tailwind CSS

## Code conventions
- async/await everywhere in Python
- SQLAlchemy 2.0 style (select() not session.query())
- No print() — use structlog logger
- Tests: pytest + httpx AsyncClient

## File structure
src/
  api/        → FastAPI routers
  db/         → SQLAlchemy models + migrations
  services/   → business logic
  tests/      → mirrors src/ structure

## Never do
- Don't add docstrings unless explicitly asked
- Don't refactor outside the task scope
- Don't run npm install without asking first`,
  },
  {
    id: 'claudeignore',
    icon: '🚫',
    color: '#f87171',
    title: '.claudeignore — the biggest single config win',
    titleFr: '.claudeignore — le plus grand gain de configuration',
    description: 'Add a .claudeignore to exclude node_modules, .next/, dist/, __pycache__, *.lock, binaries. These dirs can represent 90%+ of your file tree but 0% of your actual task. Without this, the agent scans them constantly.',
    descriptionFr: 'Ajoute un .claudeignore pour exclure node_modules, .next/, dist/, __pycache__, *.lock, binaires. Ces dossiers peuvent représenter 90%+ de ton arbre de fichiers mais 0% de ta tâche réelle. Sans ça, l\'agent les scanne constamment.',
    impact: 'high',
    category: 'workflow',
    source: 'Claude Code best practices docs',
    code: `# .claudeignore (project root)
node_modules/
.next/
dist/
build/
__pycache__/
*.pyc
.venv/
venv/
*.lock
*.log
*.min.js
*.min.css
coverage/
.git/
*.png
*.jpg
*.pdf
*.zip`,
  },
  // ─── PROMPTING ─────────────────────────────────────────────────
  {
    id: 'prompt-format',
    icon: '🎯',
    color: '#f472b6',
    title: 'The 6-part prompt format — 5 exchanges → 1',
    titleFr: 'Le format de prompt en 6 parties — 5 échanges → 1',
    description: 'Structure every complex prompt: Role → Context → Task → Reasoning → Tools → End condition. This eliminates all follow-up clarification questions in a single shot. One complete prompt beats five back-and-forths every time.',
    descriptionFr: 'Structure chaque prompt complexe : Rôle → Contexte → Tâche → Raisonnement → Outils → Condition de fin. Cela élimine toutes les questions de clarification en un seul envoi. Un prompt complet bat cinq allers-retours à chaque fois.',
    impact: 'high',
    category: 'prompting',
    code: `**Role:** You are a senior backend engineer.

**Context:** FastAPI app + PostgreSQL. Auth uses JWT.
Relevant files: src/auth/jwt.ts, src/routes/login.ts

**Task:** Add /forgot-password endpoint:
1. Accept email, check user exists
2. Store reset token in Redis (15min TTL)
3. Return 200 always (prevent user enumeration)

**Reasoning:** Think step by step. Check security
edge cases before writing any code.

**Tools:** Read src/auth/ and src/db/models.py only.
Do not explore anything else.

**End condition:** Stop when endpoint works + has a test
+ Redis TTL is verified. Commit: "feat: forgot-password"`,
  },
  {
    id: 'at-file',
    icon: '📎',
    color: '#fbbf24',
    title: 'Use @file references — skip the exploration',
    titleFr: 'Utiliser les références @fichier — éviter l\'exploration',
    description: 'Instead of "find the auth file and fix the bug", write "@src/auth/jwt.ts fix the token expiry bug on line ~45". Direct @file references skip Glob → Read → Understand cycles entirely. Each skipped exploration cycle saves hundreds of tokens.',
    descriptionFr: 'Au lieu de "trouve le fichier auth et corrige le bug", écris "@src/auth/jwt.ts corrige le bug d\'expiration de token vers la ligne 45". Les références @fichier directes sautent entièrement les cycles Glob → Read → Comprendre.',
    impact: 'high',
    category: 'prompting',
    code: `# Instead of:
"Find the authentication bug and fix it"

# Write:
"@src/auth/jwt.ts the token expires 1 hour early
because the expiry calculation on line ~45 uses
Date.now() instead of Math.floor(Date.now()/1000).
Fix it. Run the existing auth tests. Stop."`,
  },
  {
    id: 'plan-mode',
    icon: '⏸️',
    color: '#a78bfa',
    title: 'Shift+Tab Plan Mode before complex tasks',
    titleFr: 'Mode Plan Shift+Tab avant les tâches complexes',
    description: 'In Claude Code, Shift+Tab activates Plan Mode — the agent produces a complete plan without executing anything. Review it, correct the approach, then approve. Prevents costly trial-and-error runs where the agent builds the wrong thing for 10 minutes.',
    descriptionFr: 'Dans Claude Code, Shift+Tab active le Mode Plan — l\'agent produit un plan complet sans rien exécuter. Révise-le, corrige l\'approche, puis approuve. Évite les runs d\'essai-erreur coûteux où l\'agent construit la mauvaise chose pendant 10 minutes.',
    impact: 'high',
    category: 'workflow',
    source: 'Claude Code official docs',
  },
  // ─── TOOLS ─────────────────────────────────────────────────────
  {
    id: 'repomix',
    icon: '📦',
    color: '#38bdf8',
    title: 'Repomix — 70% token reduction on exploration',
    titleFr: 'Repomix — 70% de réduction des tokens d\'exploration',
    description: 'Repomix packs your entire codebase into one optimized file using Tree-sitter compression (~70% token reduction vs naive concat). The agent reads one file call instead of 40. Now has MCP server mode for dynamic querying. Strips secrets automatically with Secretlint.',
    descriptionFr: 'Repomix compresse toute ta codebase en un seul fichier optimisé avec la compression Tree-sitter (~70% de réduction des tokens vs concat naïve). L\'agent fait un appel fichier au lieu de 40. Maintenant avec mode serveur MCP. Supprime automatiquement les secrets avec Secretlint.',
    impact: 'high',
    category: 'tools',
    stat: '~70%',
    source: 'repomix.com',
    code: `# Install
npm install -g repomix

# Pack your repo (respects .gitignore)
repomix --output repo-context.txt

# Pack only relevant paths
repomix src/auth/ src/middleware/ --output auth-context.txt

# As MCP server (agents can query dynamically)
repomix --mcp`,
  },
  {
    id: 'context7',
    icon: '📚',
    color: '#a78bfa',
    title: 'Context7 MCP — fresh docs, zero hallucinated APIs',
    titleFr: 'Context7 MCP — docs à jour, zéro API hallucinée',
    description: 'When agents look up library docs from training data, they hallucinate outdated APIs (Next.js 15, Prisma 6, Tailwind 4...) — then waste tokens fixing wrong code. Context7 (by Upstash) injects current version-specific docs on demand. With Tool Search enabled, idle cost is near-zero.',
    descriptionFr: 'Quand les agents consultent les docs depuis les données d\'entraînement, ils hallucinent des APIs obsolètes — puis gaspillent des tokens à corriger du mauvais code. Context7 (par Upstash) injecte les docs actuelles et versionnées à la demande. Avec Tool Search activé, le coût inactif est quasi nul.',
    impact: 'medium',
    category: 'tools',
    stat: '70–90%',
    source: 'claudelog.com/claude-code-mcps/context7-mcp',
    code: `# Install Context7 MCP
npx @context7/mcp

# Enable Tool Search in Claude Code settings
# (lazy-loads MCP — zero idle token cost)

# Usage: just mention it in your prompt
"Use context7 to get the latest FastAPI 0.115
dependency injection docs, then implement..."`,
  },
  {
    id: 'rtk',
    icon: '🗜️',
    color: '#fb923c',
    title: 'RTK — compress CLI output by 89% before it hits context',
    titleFr: 'RTK — compresser la sortie CLI de 89% avant qu\'elle touche le contexte',
    description: 'RTK (rtk-ai.app) is a CLI proxy that compresses terminal output before it enters the agent\'s context window. One team reported 89% CLI output compression, saving 138M tokens across 15,720 intercepted commands. Works with Claude Code, Cursor, and Aider.',
    descriptionFr: 'RTK (rtk-ai.app) est un proxy CLI qui compresse la sortie terminal avant qu\'elle entre dans la fenêtre de contexte de l\'agent. Une équipe a rapporté 89% de compression de sortie CLI, économisant 138M de tokens sur 15 720 commandes interceptées. Compatible avec Claude Code, Cursor et Aider.',
    impact: 'high',
    category: 'tools',
    stat: '89%',
    source: 'rtk-ai.app',
  },
  {
    id: 'mcp-audit',
    icon: '🔌',
    color: '#e879f9',
    title: 'Audit your MCP servers — each idle one costs ~1,750 tokens/message',
    titleFr: 'Auditer tes serveurs MCP — chacun inactif coûte ~1 750 tokens/message',
    description: 'Every connected MCP server injects its tool list into every message, even when not used. A 4-server setup = ~7,000 tokens of overhead per message just from tool descriptions. Disable servers you don\'t use per project. Use Tool Search (lazy-loading) for large MCP setups.',
    descriptionFr: 'Chaque serveur MCP connecté injecte sa liste d\'outils dans chaque message, même quand il n\'est pas utilisé. Un setup à 4 serveurs = ~7 000 tokens de surcharge par message rien que pour les descriptions d\'outils. Désactive les serveurs que tu n\'utilises pas par projet.',
    impact: 'medium',
    category: 'tools',
    stat: '~1,750',
    source: 'jdhodges.com/blog/claude-code-mcp-server-token-costs',
  },
  // ─── WORKFLOW ──────────────────────────────────────────────────
  {
    id: 'compact',
    icon: '🗜️',
    color: '#4ade80',
    title: '/compact at 70% context — not at 100%',
    titleFr: '/compact à 70% du contexte — pas à 100%',
    description: 'In Claude Code, /compact summarizes the conversation history and resets with only the summary loaded. Run it proactively at ~70% context usage — compacting at overflow is less effective because the model must first process the full overloaded context.',
    descriptionFr: 'Dans Claude Code, /compact résume l\'historique de conversation et remet à zéro avec seulement le résumé chargé. Lance-le de façon proactive à ~70% d\'utilisation du contexte — compacter en débordement est moins efficace car le modèle doit d\'abord traiter le contexte surchargé.',
    impact: 'medium',
    category: 'workflow',
    source: 'Claude Code best practices',
    code: `# During a long session, run:
/compact

# Best practice: run at ~70% context usage
# (before overflow, not after)
# Result: fresh context with compressed summary
# Agent retains understanding, you save tokens`,
  },
  {
    id: 'spec-clear-execute',
    icon: '🔄',
    color: '#60a5fa',
    title: 'Spec → /clear → Execute (the 2-session pattern)',
    titleFr: 'Spec → /clear → Exécution (le pattern 2 sessions)',
    description: 'Session 1: explore the codebase and write a complete SPEC.md (spend exploration tokens here). Then /clear. Session 2: hand the agent the spec — it executes without re-exploring. All the "what does this file do?" exploration tokens are spent only once.',
    descriptionFr: 'Session 1 : explore la codebase et écris un SPEC.md complet (dépense les tokens d\'exploration ici). Puis /clear. Session 2 : donne la spec à l\'agent — il exécute sans ré-explorer. Tous les tokens d\'exploration "que fait ce fichier ?" ne sont dépensés qu\'une fois.',
    impact: 'high',
    category: 'workflow',
    stat: '40–55%',
    source: 'medium.com/@simonsruggi',
    code: `# Session 1 — Explore & Spec
"Read the auth module thoroughly and write a complete
SPEC.md describing: current structure, what needs to
change, which files to touch, edge cases, test plan."

# → Agent explores, writes SPEC.md, uses ~5,000 tokens
/clear

# Session 2 — Execute (fresh context)
"Read SPEC.md and implement everything in it.
Do not explore any other files."
# → Agent executes from spec, saves all re-exploration`,
  },
  {
    id: 'claude-md',
    icon: '⚙️',
    color: '#818cf8',
    title: 'CLAUDE.md under 5K tokens — prune it ruthlessly',
    titleFr: 'CLAUDE.md sous 5K tokens — taille-le impitoyablement',
    description: 'CLAUDE.md is loaded on every single message. Keep it under 5K tokens / 200 lines. Bloated CLAUDE.md files (with outdated rules, examples, full changelogs) waste 20–30% of your token budget silently on every message.',
    descriptionFr: 'CLAUDE.md est chargé à chaque message. Garde-le sous 5K tokens / 200 lignes. Les CLAUDE.md gonflés (avec des règles obsolètes, exemples, changelogs complets) gaspillent 20–30% de ton budget de tokens silencieusement à chaque message.',
    impact: 'medium',
    category: 'workflow',
    stat: '20–30%',
    source: 'Claude Code official best practices',
  },
  {
    id: 'one-task',
    icon: '⚡',
    color: '#34d399',
    title: 'One task per session, one thing per message',
    titleFr: 'Une tâche par session, une chose par message',
    description: 'Bundling 3 tasks in one message forces the agent to maintain all 3 contexts simultaneously. Finish one → commit → /clear → start next. Fresh sessions have zero context debt. Also: one thing per message within a session — don\'t mix "add feature X and also fix bug Y".',
    descriptionFr: 'Regrouper 3 tâches en un message force l\'agent à maintenir les 3 contextes simultanément. Finis une → commit → /clear → commence la suivante. Les nouvelles sessions ont zéro dette de contexte. Aussi : une chose par message dans une session.',
    impact: 'medium',
    category: 'workflow',
  },
];

export const promptTemplate = {
  en: {
    title: 'The 6-part prompt template',
    subtitle: 'Copy this, fill in the blanks. One prompt replaces 5 back-and-forths.',
    parts: [
      { label: 'Role', color: '#7c3aed', placeholder: 'You are a senior [role] working on [project type].' },
      { label: 'Context', color: '#06b6d4', placeholder: 'Relevant files: [files]. Current behavior: [X]. Goal: [Y].' },
      { label: 'Task', color: '#10b981', placeholder: 'Implement [specific thing]. Must [req 1], [req 2]. Do NOT [anti-req].' },
      { label: 'Reasoning', color: '#fbbf24', placeholder: 'Think step by step. Check edge cases before writing code.' },
      { label: 'Tools', color: '#f472b6', placeholder: 'Read ONLY [specific files]. Do not explore anything else.' },
      { label: 'End condition', color: '#fb923c', placeholder: 'Stop when [test passes]. Commit: "[conventional message]".' },
    ],
  },
  fr: {
    title: 'Le template de prompt en 6 parties',
    subtitle: 'Copie ça, remplis les blancs. Un prompt remplace 5 allers-retours.',
    parts: [
      { label: 'Rôle', color: '#7c3aed', placeholder: 'Tu es un [rôle] senior travaillant sur [type de projet].' },
      { label: 'Contexte', color: '#06b6d4', placeholder: 'Fichiers pertinents : [fichiers]. Comportement actuel : [X]. Objectif : [Y].' },
      { label: 'Tâche', color: '#10b981', placeholder: 'Implémente [chose]. Doit [exigence 1], [exigence 2]. Ne PAS [anti-exigence].' },
      { label: 'Raisonnement', color: '#fbbf24', placeholder: 'Pense étape par étape. Vérifie les cas limites avant d\'écrire du code.' },
      { label: 'Outils', color: '#f472b6', placeholder: 'Lis UNIQUEMENT [fichiers]. N\'explore rien d\'autre.' },
      { label: 'Condition de fin', color: '#fb923c', placeholder: 'Arrête quand [test passe]. Commit : "[message conventionnel]".' },
    ],
  },
};
