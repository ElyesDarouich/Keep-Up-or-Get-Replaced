export type AgentId = 'claude-code' | 'cursor' | 'aider' | 'all';

export interface MCPTool {
  name: string;
  description: string;
  descriptionFr: string;
  keyTools: string[];
  useCase: string;
  useCaseFr: string;
  installCommand: string;
  color: string;
  icon: string;
  forAgents: AgentId[];
  essential?: boolean;
  category: 'dev' | 'automation' | 'design' | 'productivity' | 'ai';
}

export const mcpTools: MCPTool[] = [
  // --- DEV ---
  {
    name: 'github',
    description: 'Full GitHub integration — create PRs, manage issues, push files, search repos, branch operations.',
    descriptionFr: 'Intégration GitHub complète — créer des PRs, gérer les issues, pousser des fichiers, chercher dans les repos.',
    keyTools: ['create_pull_request', 'push_files', 'get_issue', 'search_code', 'create_branch', 'list_commits'],
    useCase: 'Any developer with a GitHub workflow. Essential for agentic code automation.',
    useCaseFr: 'Tout développeur avec un workflow GitHub. Essentiel pour l\'automatisation de code agentique.',
    installCommand: 'npx @modelcontextprotocol/server-github',
    color: '#6ee7b7',
    icon: '🐙',
    forAgents: ['claude-code', 'aider', 'all'],
    essential: true,
    category: 'dev',
  },
  {
    name: 'github-work',
    description: 'GitHub MCP for work/org accounts — same full feature set as github but scoped to enterprise orgs.',
    descriptionFr: 'MCP GitHub pour les comptes professionnels/org — même ensemble de fonctionnalités mais scopé aux org enterprise.',
    keyTools: ['create_pull_request', 'push_files', 'create_pull_request_review', 'get_pull_request_status', 'merge_pull_request'],
    useCase: 'Teams using GitHub Enterprise or organization accounts.',
    useCaseFr: 'Équipes utilisant GitHub Enterprise ou des comptes d\'organisation.',
    installCommand: 'npx @modelcontextprotocol/server-github --org',
    color: '#4ade80',
    icon: '🏢',
    forAgents: ['claude-code', 'aider', 'all'],
    category: 'dev',
  },
  {
    name: 'filesystem',
    description: 'Read, write, edit, move, search files and directories. Foundation of any local agent setup.',
    descriptionFr: 'Lire, écrire, éditer, déplacer et rechercher des fichiers et répertoires. Fondation de tout setup d\'agent local.',
    keyTools: ['read_file', 'write_file', 'edit_file', 'directory_tree', 'search_files', 'move_file', 'get_file_info'],
    useCase: 'Local file operations. Every coding agent needs this.',
    useCaseFr: 'Opérations sur les fichiers locaux. Tout agent de code en a besoin.',
    installCommand: 'npx @modelcontextprotocol/server-filesystem /your/path',
    color: '#fbbf24',
    icon: '📁',
    forAgents: ['claude-code', 'cursor', 'aider', 'all'],
    essential: true,
    category: 'dev',
  },
  {
    name: 'sequential-thinking',
    description: 'Forces step-by-step reasoning before acting. Dramatically improves accuracy on complex multi-step tasks.',
    descriptionFr: 'Force le raisonnement étape par étape avant d\'agir. Améliore considérablement la précision sur les tâches complexes.',
    keyTools: ['sequentialthinking'],
    useCase: 'Complex debugging, architecture decisions, multi-step analysis before execution.',
    useCaseFr: 'Débogage complexe, décisions d\'architecture, analyse multi-étapes avant exécution.',
    installCommand: 'npx @modelcontextprotocol/server-sequential-thinking',
    color: '#a78bfa',
    icon: '🧠',
    forAgents: ['claude-code', 'all'],
    essential: true,
    category: 'ai',
  },
  // --- AUTOMATION ---
  {
    name: 'playwright',
    description: 'Full browser automation — navigate, click, fill forms, screenshot, intercept network requests, run JS.',
    descriptionFr: 'Automatisation complète du navigateur — naviguer, cliquer, remplir des formulaires, prendre des captures d\'écran, intercepter les requêtes réseau.',
    keyTools: ['browser_navigate', 'browser_click', 'browser_fill_form', 'browser_take_screenshot', 'browser_snapshot', 'browser_evaluate', 'browser_network_requests'],
    useCase: 'Web scraping, UI testing, automating web tasks, visual debugging.',
    useCaseFr: 'Web scraping, tests UI, automatisation de tâches web, débogage visuel.',
    installCommand: 'npx @playwright/mcp',
    color: '#f472b6',
    icon: '🎭',
    forAgents: ['claude-code', 'all'],
    essential: true,
    category: 'automation',
  },
  {
    name: 'ruflo',
    description: 'Swarm orchestration powerhouse — AgentDB memory, hive-mind consensus, neural patterns, WASM agents, performance benchmarking, pre/post hooks, workflow automation.',
    descriptionFr: 'Puissance d\'orchestration swarm — mémoire AgentDB, consensus hive-mind, patterns neuronaux, agents WASM, benchmarking de performance, hooks pre/post, automatisation de workflow.',
    keyTools: ['swarm_init', 'swarm_status', 'agentdb_store', 'agentdb_search', 'agentdb_retrieve', 'hive_mind_consensus', 'neural_patterns', 'wasm_agent', 'workflow_automation', 'coordination_sync'],
    useCase: 'Advanced multi-agent swarm orchestration, persistent agent memory, parallel task coordination.',
    useCaseFr: 'Orchestration avancée de swarm multi-agents, mémoire d\'agent persistante, coordination de tâches en parallèle.',
    installCommand: 'npx ruflo-mcp',
    color: '#e879f9',
    icon: '🐝',
    forAgents: ['claude-code'],
    essential: true,
    category: 'automation',
  },
  // --- AI / REASONING ---
  {
    name: 'magic (21st.dev)',
    description: 'AI-powered UI component builder. Generate polished React/Vue components from descriptions, logo search, component inspiration.',
    descriptionFr: 'Constructeur de composants UI alimenté par IA. Génère des composants React/Vue soignés à partir de descriptions, recherche de logos, inspiration de composants.',
    keyTools: ['21st_magic_component_builder', '21st_magic_component_refiner', '21st_magic_component_inspiration', 'logo_search'],
    useCase: 'Frontend devs who want AI to generate professional UI components instantly.',
    useCaseFr: 'Développeurs frontend qui veulent que l\'IA génère des composants UI professionnels instantanément.',
    installCommand: 'npx @21st-dev/magic@latest',
    color: '#38bdf8',
    icon: '✨',
    forAgents: ['claude-code', 'cursor'],
    essential: true,
    category: 'ai',
  },
  // --- DESIGN ---
  {
    name: 'pencil',
    description: 'Design file editor for .pen files. Batch read/write UI layouts, style guides, variables, screenshots — web and mobile.',
    descriptionFr: 'Éditeur de fichiers de design .pen. Lecture/écriture en batch de layouts UI, guides de style, variables, captures d\'écran — web et mobile.',
    keyTools: ['batch_get', 'batch_design', 'get_editor_state', 'get_guidelines', 'get_variables', 'set_variables', 'get_screenshot', 'snapshot_layout'],
    useCase: 'Designers and fullstack devs who want AI-driven UI design generation and iteration.',
    useCaseFr: 'Designers et devs fullstack qui veulent de la génération et itération de design UI par IA.',
    installCommand: 'npx @pencilapp/mcp',
    color: '#fb923c',
    icon: '🎨',
    forAgents: ['claude-code'],
    category: 'design',
  },
  {
    name: 'plantuml',
    description: 'Generate, encode, and decode PlantUML architecture diagrams directly in your agent workflow.',
    descriptionFr: 'Générer, encoder et décoder des diagrammes d\'architecture PlantUML directement dans ton workflow d\'agent.',
    keyTools: ['generate_plantuml_diagram', 'encode_plantuml', 'decode_plantuml'],
    useCase: 'Auto-generating architecture diagrams, documentation, system design visuals.',
    useCaseFr: 'Génération automatique de diagrammes d\'architecture, documentation, visuels de conception système.',
    installCommand: 'npx @modelcontextprotocol/server-plantuml',
    color: '#4ade80',
    icon: '📊',
    forAgents: ['claude-code', 'all'],
    category: 'design',
  },
  // --- PRODUCTIVITY ---
  {
    name: 'Google Stitch',
    description: 'Google\'s AI workflow composition MCP — stitch together Gemini, Vertex AI, BigQuery, Cloud Run, and Search into unified pipelines. Multi-modal, event-driven.',
    descriptionFr: 'MCP de composition de workflows IA de Google — assemble Gemini, Vertex AI, BigQuery, Cloud Run et Search en pipelines unifiés. Multi-modal, orienté événements.',
    keyTools: ['stitch_pipeline', 'stitch_node_gemini', 'stitch_node_vertex', 'stitch_trigger', 'stitch_run', 'stitch_status', 'stitch_logs'],
    useCase: 'Composing multi-step AI pipelines across Google Cloud services without leaving your agent.',
    useCaseFr: 'Composer des pipelines IA multi-étapes à travers les services Google Cloud sans quitter ton agent.',
    installCommand: 'npx @google-cloud/mcp-stitch',
    color: '#34d399',
    icon: '🧵',
    forAgents: ['claude-code', 'all'],
    category: 'ai',
  },
  {
    name: 'Nano Banana 2',
    description: 'Lightweight no-code automation MCP. Chain actions, set triggers, call webhooks, transform data — all described in plain language. V2 adds parallel branching and retry logic.',
    descriptionFr: 'MCP d\'automatisation no-code ultra-léger. Enchaîner des actions, définir des déclencheurs, appeler des webhooks, transformer des données — tout en langage naturel. V2 ajoute le branchement parallèle et la logique de retry.',
    keyTools: ['nb_run_flow', 'nb_trigger', 'nb_webhook', 'nb_transform', 'nb_branch', 'nb_retry', 'nb_log'],
    useCase: 'Non-devs and devs who want fast no-code automations triggered from any agent.',
    useCaseFr: 'Non-développeurs et devs qui veulent des automatisations no-code rapides déclenchées depuis n\'importe quel agent.',
    installCommand: 'npx nano-banana-mcp@2',
    color: '#fbbf24',
    icon: '🍌',
    forAgents: ['claude-code', 'cursor', 'all'],
    category: 'automation',
  },
  {
    name: 'Gmail + Calendar',
    description: 'Read emails, send emails, schedule meetings, manage calendar events — all from your agent.',
    descriptionFr: 'Lire des emails, envoyer des emails, planifier des réunions, gérer les événements du calendrier — tout depuis ton agent.',
    keyTools: ['authenticate', 'list_emails', 'send_email', 'create_event', 'list_events', 'update_event'],
    useCase: 'Personal productivity agents, scheduling automation, email triage.',
    useCaseFr: 'Agents de productivité personnelle, automatisation de la planification, tri des emails.',
    installCommand: 'npx @modelcontextprotocol/server-google-workspace',
    color: '#f87171',
    icon: '📧',
    forAgents: ['claude-code'],
    category: 'productivity',
  },
];

export const mcpCategories = [
  { id: 'all', label: 'All tools', labelFr: 'Tous les outils' },
  { id: 'dev', label: 'Dev', labelFr: 'Dev' },
  { id: 'automation', label: 'Automation', labelFr: 'Automatisation' },
  { id: 'ai', label: 'AI / Reasoning', labelFr: 'IA / Raisonnement' },
  { id: 'design', label: 'Design', labelFr: 'Design' },
  { id: 'productivity', label: 'Productivity', labelFr: 'Productivité' },
];
