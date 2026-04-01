export interface InfoSource {
  platform: 'twitter' | 'reddit' | 'instagram' | 'github';
  icon: string;
  color: string;
  accounts: {
    handle: string;
    name: string;
    why: string;
    whyFr: string;
  }[];
}

export const infoSources: InfoSource[] = [
  {
    platform: 'twitter',
    icon: '𝕏',
    color: '#e4e4e7',
    accounts: [
      { handle: '@AnthropicAI', name: 'Anthropic', why: 'Claude updates straight from the source', whyFr: 'Mises à jour de Claude directement à la source' },
      { handle: '@OpenAI', name: 'OpenAI', why: 'GPT and o-series announcements', whyFr: 'Annonces GPT et série o' },
      { handle: '@karpathy', name: 'Andrej Karpathy', why: 'Deep technical breakdowns from ex-Tesla/OpenAI', whyFr: 'Analyses techniques profondes de l\'ex-Tesla/OpenAI' },
      { handle: '@ylecun', name: 'Yann LeCun', why: 'Meta\'s AI chief, contrarian takes worth reading', whyFr: 'Le directeur IA de Meta, des opinions contrariantes qui valent la peine d\'être lues' },
      { handle: '@demishassabis', name: 'Demis Hassabis', why: 'Google DeepMind CEO — research-first perspective', whyFr: 'PDG de Google DeepMind — perspective axée sur la recherche' },
      { handle: '@sama', name: 'Sam Altman', why: 'OpenAI CEO hints and product directions', whyFr: 'Indices et directions produit du PDG d\'OpenAI' },
    ],
  },
  {
    platform: 'reddit',
    icon: '🤖',
    color: '#ff4500',
    accounts: [
      { handle: 'r/LocalLLaMA', name: 'LocalLLaMA', why: 'Best community for open-source models, benchmarks, local setups', whyFr: 'Meilleure communauté pour les modèles open-source, benchmarks, setups locaux' },
      { handle: 'r/ClaudeAI', name: 'Claude AI', why: 'Tips, prompts, and news about Claude', whyFr: 'Conseils, prompts et news sur Claude' },
      { handle: 'r/ChatGPT', name: 'ChatGPT', why: 'OpenAI updates, prompt techniques, community discoveries', whyFr: 'Mises à jour OpenAI, techniques de prompt, découvertes communautaires' },
      { handle: 'r/MachineLearning', name: 'MachineLearning', why: 'Research papers and technical discussions', whyFr: 'Articles de recherche et discussions techniques' },
      { handle: 'r/artificial', name: 'Artificial', why: 'General AI news and trending discussions', whyFr: 'Actualités IA générales et discussions tendance' },
    ],
  },
  {
    platform: 'instagram',
    icon: '📸',
    color: '#e1306c',
    accounts: [
      { handle: '@aibreakdown', name: 'AI Breakdown', why: 'Short reels explaining complex AI concepts clearly', whyFr: 'Courtes reels expliquant clairement des concepts IA complexes' },
      { handle: '@futuretools.io', name: 'FutureTools', why: 'New AI tool drops daily', whyFr: 'Nouvelles sorties d\'outils IA quotidiennes' },
      { handle: '@ai.explained', name: 'AI Explained', why: 'Visual breakdowns of how models work', whyFr: 'Décompositions visuelles du fonctionnement des modèles' },
    ],
  },
  {
    platform: 'github',
    icon: '⚡',
    color: '#6ee7b7',
    accounts: [
      { handle: 'anthropics/claude-code', name: 'Claude Code', why: 'Follow releases, read changelogs, star for updates', whyFr: 'Suivre les releases, lire les changelogs, star pour les mises à jour' },
      { handle: 'openai/openai-python', name: 'OpenAI Python SDK', why: 'See new API features as they land in the SDK', whyFr: 'Voir les nouvelles fonctionnalités API dès leur intégration dans le SDK' },
      { handle: 'modelcontextprotocol/servers', name: 'MCP Servers', why: 'All official MCP server implementations', whyFr: 'Toutes les implémentations officielles de serveurs MCP' },
      { handle: 'BerriAI/litellm', name: 'LiteLLM', why: '100+ model APIs unified in one library', whyFr: '100+ APIs de modèles unifiées dans une seule bibliothèque' },
      { handle: 'AUTOMATIC1111/stable-diffusion-webui', name: 'SD WebUI', why: 'Image generation ecosystem updates', whyFr: 'Mises à jour de l\'écosystème de génération d\'images' },
    ],
  },
];
