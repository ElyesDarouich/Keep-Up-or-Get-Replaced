export interface APIProvider {
  name: string;
  logo: string;
  color: string;
  bgColor: string;
  description: string;
  descriptionFr: string;
  models: string[];
  rpmFree: string;
  tpmFree: string;
  dailyLimit: string;
  bestFor: string;
  bestForFr: string;
  signupUrl: string;
  freeTier: boolean;
  featured?: boolean;
  note?: string;
  noteFr?: string;
}

export const apiProviders: APIProvider[] = [
  {
    name: 'Nvidia NIM',
    logo: '⚡',
    color: '#76b900',
    bgColor: 'rgba(118, 185, 0, 0.1)',
    description: 'Access 100+ enterprise-grade AI models on Nvidia GPU infrastructure. Specialized for every use case with generous free credits.',
    descriptionFr: 'Accédez à plus de 100 modèles IA de qualité entreprise sur l\'infrastructure GPU Nvidia. Spécialisé pour chaque cas d\'usage avec des crédits gratuits généreux.',
    models: ['Llama 3.3 70B', 'DeepSeek V3.1', 'DeepSeek R1', 'Kimi K2.5', 'Qwen3.5', 'NV-Embed-v2', 'Nemotron 30B', '+ 90 more'],
    rpmFree: '~40 RPM',
    tpmFree: 'Per credits',
    dailyLimit: '1,000 credits free (up to 5,000 on request)',
    bestFor: 'RAG, agentic workflows, chatbots, embeddings, vision',
    bestForFr: 'RAG, workflows agentiques, chatbots, embeddings, vision',
    signupUrl: 'https://build.nvidia.com',
    freeTier: true,
    featured: true,
    note: 'No credit card required. Credits never expire. Switch between 100+ models with one API endpoint. Request up to 5,000 credits for free.',
    noteFr: 'Aucune carte bancaire requise. Les crédits n\'expirent jamais. Changez entre 100+ modèles avec un seul endpoint. Demandez jusqu\'à 5 000 crédits gratuitement.',
  },
  {
    name: 'Groq Cloud',
    logo: '🚀',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.1)',
    description: 'Fastest inference on the market. Groq\'s custom LPU hardware runs LLMs at 500+ tokens/second. Real free tier, no card needed.',
    descriptionFr: 'L\'inférence la plus rapide du marché. Le matériel LPU personnalisé de Groq fait tourner les LLMs à 500+ tokens/seconde. Vrai tier gratuit, aucune carte requise.',
    models: ['Llama 3.3 70B', 'Llama 3.1 8B', 'Llama 4 Scout', 'Gemma2 9B', 'Mixtral 8x7B', 'DeepSeek R1 Distill'],
    rpmFree: '30 RPM',
    tpmFree: '6K–20K TPM',
    dailyLimit: '1K–14.4K RPD depending on model',
    bestFor: 'Speed-critical apps, real-time chat, voice assistants, quick prototypes',
    bestForFr: 'Apps nécessitant de la vitesse, chat temps réel, assistants vocaux, prototypes rapides',
    signupUrl: 'https://console.groq.com',
    freeTier: true,
    featured: true,
    note: 'llama-3.1-8b-instant: 30 RPM / 14,400 RPD / 20,000 TPM / 500,000 TPD. Llama-3.3-70b: 30 RPM / 1,000 RPD / 6,000 TPM. Cached tokens don\'t count against limits.',
    noteFr: 'llama-3.1-8b-instant : 30 RPM / 14 400 RPD / 20 000 TPM / 500 000 TPD. Llama-3.3-70b : 30 RPM / 1 000 RPD / 6 000 TPM. Les tokens mis en cache ne comptent pas.',
  },
  {
    name: 'GitHub Models',
    logo: '🐙',
    color: '#6e40c9',
    bgColor: 'rgba(110, 64, 201, 0.1)',
    description: 'Test frontier models with your GitHub account. GPT-4o, GPT-4.1, Llama, Mistral, DeepSeek — all accessible for free.',
    descriptionFr: 'Testez les modèles frontier avec ton compte GitHub. GPT-4o, GPT-4.1, Llama, Mistral, DeepSeek — tous accessibles gratuitement.',
    models: ['GPT-4.1', 'GPT-4o', 'o1-mini', 'o3-mini', 'Llama 3.3 70B', 'Mistral Large', 'DeepSeek R1', 'Phi-4'],
    rpmFree: '10–15 RPM',
    tpmFree: '8K tokens/req',
    dailyLimit: 'Low tier: 150 RPD · High tier: 50 RPD',
    bestFor: 'Prototyping, GitHub Copilot extensions, developer tooling',
    bestForFr: 'Prototypage, extensions GitHub Copilot, outils développeur',
    signupUrl: 'https://github.com/marketplace/models',
    freeTier: true,
    note: 'Free with any GitHub account. Low-tier models (GPT-4o-mini, Phi-4): 15 RPM / 150 RPD. High-tier (GPT-4.1, o3-mini): 10 RPM / 50 RPD. Pay-as-you-go available beyond free limits.',
    noteFr: 'Gratuit avec tout compte GitHub. Modèles low-tier (GPT-4o-mini, Phi-4) : 15 RPM / 150 RPD. High-tier (GPT-4.1, o3-mini) : 10 RPM / 50 RPD. Pay-as-you-go disponible.',
  },
  {
    name: 'Hugging Face',
    logo: '🤗',
    color: '#ff9a00',
    bgColor: 'rgba(255, 154, 0, 0.1)',
    description: 'The open-source AI hub. 1M+ models and datasets. Free Serverless Inference API for logged-in users — shared compute, throttled.',
    descriptionFr: 'Le hub IA open-source. Plus d\'1M de modèles et datasets. API d\'inférence serverless gratuite pour les utilisateurs connectés — compute partagé, throttlé.',
    models: ['Qwen2.5-Coder', 'Llama 3.3', 'Mistral 7B', 'FLUX.1', 'Phi-4', 'Falcon 40B', 'Stable Diffusion'],
    rpmFree: 'Variable',
    tpmFree: 'Not published',
    dailyLimit: 'Hundreds/hour free (throttled under load)',
    bestFor: 'Open-source models, fine-tuning, research, local deployment, image generation',
    bestForFr: 'Modèles open-source, fine-tuning, recherche, déploiement local, génération d\'images',
    signupUrl: 'https://huggingface.co',
    freeTier: true,
    note: 'Free tier limits are not officially documented and change over time. Popular models often return 503s under load. PRO ($9/mo) gives 2M credits/month priority access.',
    noteFr: 'Les limites du tier gratuit ne sont pas officiellement documentées et changent avec le temps. Les modèles populaires retournent souvent des 503 sous charge. PRO (9$/mois) donne 2M crédits/mois en accès prioritaire.',
  },
];

export interface NvidiaModel {
  name: string;
  category: string;
  categoryFr: string;
  icon: string;
  color: string;
  description: string;
  descriptionFr: string;
  contextWindow: string;
  useCase: string;
  useCaseFr: string;
}

export const nvidiaModels: NvidiaModel[] = [
  {
    name: 'Llama-3.3-70B-Instruct',
    category: 'Agentic',
    categoryFr: 'Agentique',
    icon: '🤖',
    color: '#818cf8',
    description: 'Meta\'s best open model. Excellent for complex reasoning and multi-step agent workflows. High SWE-bench relative to open models.',
    descriptionFr: 'Le meilleur modèle ouvert de Meta. Excellent pour le raisonnement complexe et les workflows d\'agents multi-étapes.',
    contextWindow: '128K',
    useCase: 'Agentic workflows, complex analysis',
    useCaseFr: 'Workflows agentiques, analyse complexe',
  },
  {
    name: 'DeepSeek-V3.1',
    category: 'Coding',
    categoryFr: 'Code',
    icon: '💻',
    color: '#38bdf8',
    description: 'Best open-source model for raw code generation. Rivals proprietary models on HumanEval. Free on NIM.',
    descriptionFr: 'Meilleur modèle open-source pour la génération de code brute. Rivalise avec les modèles propriétaires sur HumanEval.',
    contextWindow: '128K',
    useCase: 'Code generation, debugging, refactoring',
    useCaseFr: 'Génération de code, débogage, refactoring',
  },
  {
    name: 'DeepSeek-R1',
    category: 'Agentic',
    categoryFr: 'Agentique',
    icon: '🧠',
    color: '#c084fc',
    description: 'Chain-of-thought reasoning model. Top 5 on LiveCodeBench. Strong for complex problem-solving and multi-step planning.',
    descriptionFr: 'Modèle de raisonnement chain-of-thought. Top 5 sur LiveCodeBench. Fort pour la résolution de problèmes complexes.',
    contextWindow: '128K',
    useCase: 'Complex reasoning, agentic planning, algorithm problems',
    useCaseFr: 'Raisonnement complexe, planification agentique, problèmes algorithmiques',
  },
  {
    name: 'NV-Embed-v2',
    category: 'RAG / Embeddings',
    categoryFr: 'RAG / Embeddings',
    icon: '🔍',
    color: '#4ade80',
    description: 'Nvidia\'s flagship embedding model. #1 on MTEB benchmark. Purpose-built for high-quality RAG retrieval.',
    descriptionFr: 'Le modèle d\'embedding phare de Nvidia. #1 sur le benchmark MTEB. Conçu spécifiquement pour le retrieval RAG haute qualité.',
    contextWindow: '32K',
    useCase: 'RAG pipelines, semantic search, document retrieval',
    useCaseFr: 'Pipelines RAG, recherche sémantique, récupération de documents',
  },
  {
    name: 'Kimi-K2.5',
    category: 'Coding',
    categoryFr: 'Code',
    icon: '⭐',
    color: '#fbbf24',
    description: '#1 on HumanEval (99.0%). Best open-source model for pure code generation tasks. Available free on NIM.',
    descriptionFr: '#1 sur HumanEval (99.0%). Meilleur modèle open-source pour les tâches de génération de code pure.',
    contextWindow: '128K',
    useCase: 'Best-in-class code generation, completions',
    useCaseFr: 'Génération de code de premier ordre, completions',
  },
  {
    name: 'LlamaGuard-3-8B',
    category: 'Security / Safety',
    categoryFr: 'Sécurité / Sûreté',
    icon: '🛡️',
    color: '#f87171',
    description: 'Purpose-built content safety classifier. Use alongside any LLM to add a safety layer to your app.',
    descriptionFr: 'Classificateur de sécurité de contenu dédié. À utiliser avec n\'importe quel LLM pour ajouter une couche de sécurité à ton app.',
    contextWindow: '8K',
    useCase: 'Content moderation, safety layers, harmful content detection',
    useCaseFr: 'Modération de contenu, couches de sécurité, détection de contenu nuisible',
  },
  {
    name: 'Nemotron-3-Nano-30B',
    category: 'Lightweight / Fast',
    categoryFr: 'Léger / Rapide',
    icon: '⚡',
    color: '#f97316',
    description: 'Nvidia\'s own efficient MoE model. Low latency, credits-efficient, good for high-throughput chatbot workloads.',
    descriptionFr: 'Modèle MoE efficace de Nvidia. Faible latence, économe en crédits, bon pour les charges de travail chatbot à haut débit.',
    contextWindow: '128K',
    useCase: 'Real-time responses, high-throughput chatbots, cost efficiency',
    useCaseFr: 'Réponses temps réel, chatbots haut débit, efficacité des coûts',
  },
  {
    name: 'Qwen3.5-VL-400B-MoE',
    category: 'RAG / Embeddings',
    categoryFr: 'RAG / Embeddings',
    icon: '👁️',
    color: '#34d399',
    description: 'Massive vision + text MoE model. Understands images, charts, documents alongside text. Perfect for multimodal RAG.',
    descriptionFr: 'Grand modèle MoE vision + texte. Comprend images, graphiques, documents en plus du texte. Parfait pour le RAG multimodal.',
    contextWindow: '128K',
    useCase: 'Multimodal RAG, document understanding, chart analysis',
    useCaseFr: 'RAG multimodal, compréhension de documents, analyse de graphiques',
  },
];

export interface GroqModel {
  name: string;
  rpm: number;
  rpd: number;
  tpm: number;
  tpd: number;
  category: string;
}

export const groqModels: GroqModel[] = [
  { name: 'llama-3.1-8b-instant', rpm: 30, rpd: 14400, tpm: 20000, tpd: 500000, category: 'Fast / General' },
  { name: 'llama-3.3-70b-versatile', rpm: 30, rpd: 1000, tpm: 6000, tpd: 100000, category: 'Powerful / General' },
  { name: 'llama-4-scout', rpm: 30, rpd: 1000, tpm: 6000, tpd: 100000, category: 'Latest Llama' },
  { name: 'gemma2-9b-it', rpm: 30, rpd: 14400, tpm: 15000, tpd: 500000, category: 'Fast / Efficient' },
  { name: 'mixtral-8x7b-instruct', rpm: 30, rpd: 14400, tpm: 5000, tpd: 500000, category: 'MoE / Fast' },
  { name: 'deepseek-r1-distill-llama-70b', rpm: 30, rpd: 1000, tpm: 6000, tpd: 100000, category: 'Reasoning' },
];
