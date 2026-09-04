export const fireworksReferenceContent = {
  meta: {
    researchedAt: '2026-09-04',
    source: 'https://fireworks.ai/',
    label: 'Unofficial reference reconstruction',
  },
  announcement: {
    label: 'The Training API is now generally available',
    href: 'https://fireworks.ai/training',
  },
  navigation: [
    { label: 'Platform', href: '#platform' },
    { label: 'Models', href: '#models' },
    { label: 'Customers', href: '#customers' },
    { label: 'Updates', href: '#updates' },
  ],
  nexus: {
    eyebrow: 'FIREWORKS NEXUS',
    title: 'Frontier coding intelligence with control over the bill.',
    description:
      'Connect the coding tools engineers already use, route each task across open and closed models, and manage spend without rebuilding the developer workflow.',
    stats: [
      { value: '33%', label: 'illustrative savings per merged PR' },
      { value: '54%', label: 'illustrative overall AI spend saved' },
      { value: '100+', label: 'tokens per second available' },
    ],
    primary: { label: 'Explore Nexus', href: 'https://fireworks.ai/nexus' },
    secondary: {
      label: 'Book a demo',
      href: 'https://fireworks.ai/contact-reserved',
    },
  },
  hero: {
    eyebrow: 'FROM THE CREATORS OF PYTORCH',
    title: ['Own the model.', 'Own the learning loop.'],
    description:
      'Train and serve leading open models as specialized intelligence that compounds around your data, evaluation signals, and domain expertise.',
    primary: {
      label: 'Start building',
      href: 'https://fireworks.ai/models',
    },
    secondary: {
      label: 'Contact Fireworks',
      href: 'https://fireworks.ai/contact-reserved',
    },
  },
  gtc: {
    eyebrow: 'NVIDIA GTC 2026',
    title:
      'Infrastructure designed as the manufacturing layer for AI factories.',
    description:
      'A featured conversation between Jensen Huang and Fireworks CEO Lin Qiao positions the company as a specialized training and inference layer for teams building their own intelligence.',
  },
  platform: {
    eyebrow: 'BUILD YOUR FRONTIER',
    title:
      'Infrastructure for intelligence that improves with every iteration.',
    description:
      'Fireworks connects open models, proprietary data, training workflows, evaluation, and production serving in one continuous system.',
    pillars: [
      {
        index: '01',
        name: 'Training',
        audience: 'FROM GUIDED RUNS TO FRONTIER RL',
        description:
          'Choose the level of control that matches the maturity of the workload, then move checkpoints into production quickly.',
        modes: [
          'Guided engagements that define the task, plan, expected cost, and approved run.',
          'Configuration-led jobs where Fireworks handles scheduling and production handoff.',
          'Custom training logic with user-defined losses, trainers, reinforcement-learning loops, rollout serving, and weight synchronization.',
        ],
        href: 'https://fireworks.ai/training',
      },
      {
        index: '02',
        name: 'Inference',
        audience: 'FROM DEVELOPMENT TO GLOBAL SCALE',
        description:
          'Serve current open models and post-trained variants on an engine optimized across kernels, memory, scheduling, and serving.',
        modes: [
          'Serverless access with per-token billing, service tiers, and compatible OpenAI or Anthropic interfaces.',
          'On-Demand dedicated deployments, multi-region options, and support for post-trained models.',
          'Reserved capacity with guaranteed resources, higher quotas, and early hardware access.',
        ],
        href: 'https://fireworks.ai/inference',
      },
    ],
  },
  models: {
    eyebrow: 'MODEL LIBRARY',
    title: 'Run leading open models through one API surface.',
    description:
      'The homepage highlights text, vision, image, and audio models with context windows and per-token pricing where available.',
    items: [
      { name: 'DeepSeek v3.2', context: '163,840', kind: 'LLM' },
      {
        name: 'GLM 5.2',
        context: '1,048,576',
        kind: 'LLM',
        price: '$1.4 / $4.4',
      },
      {
        name: 'Kimi K3',
        context: '1,048,576',
        kind: 'Vision',
        price: '$3 / $15',
      },
      {
        name: 'Kimi K2.7 Code',
        context: '262,144',
        kind: 'Vision',
        price: '$0.95 / $4',
      },
      {
        name: 'MiniMax M3',
        context: '512,000',
        kind: 'LLM',
        price: '$0.3 / $1.2',
      },
      {
        name: 'Qwen3.7 Plus',
        context: '262,144',
        kind: 'Vision',
        price: '$0.4 / $1.6',
      },
      { name: 'DeepSeek V4 Pro', context: '1,048,576', kind: 'LLM' },
      { name: 'DeepSeek V4 Flash', context: '1,048,576', kind: 'LLM' },
      {
        name: 'Kimi K2.6',
        context: '262,144',
        kind: 'Vision',
        price: '$0.95 / $4',
      },
      { name: 'GLM 5.1', context: '202,752', kind: 'LLM' },
      { name: 'Gemma 4 31B IT NVFP4', context: '262,144', kind: 'Vision' },
      { name: 'Gemma 4 26B A4B IT', context: '262,144', kind: 'Vision' },
      { name: 'Qwen3.6 Plus', context: '—', kind: 'Vision' },
      {
        name: 'MiniMax M2.7',
        context: '196,608',
        kind: 'LLM',
        price: '$0.3 / $1.2',
      },
      { name: 'OpenAI gpt-oss-20b', context: '131,072', kind: 'LLM' },
      { name: 'FLUX.1 Kontext Pro', context: '—', kind: 'Image' },
      { name: 'Whisper V3 Large', context: '—', kind: 'Audio' },
      { name: 'DeepSeek R1 05/28', context: '163,840', kind: 'LLM' },
      { name: 'Kimi K2.5', context: '262,144', kind: 'Vision' },
    ],
    href: 'https://fireworks.ai/models',
  },
  customers: {
    eyebrow: 'CUSTOMER SIGNALS',
    title:
      'Teams use Fireworks for evaluation, model ownership, and production scale.',
    items: [
      {
        company: 'Motif',
        person: 'Hanbin Jung · Partnership Lead',
        summary:
          'Uses a single Azure endpoint for repeatable, high-volume evaluation and faster model decisions.',
      },
      {
        company: 'Gumloop',
        person: 'Gonzalo Soto Mallqui · CPO',
        summary:
          'Reported confidently moving a widely used internal agent from a closed model to GLM without a noticeable experience regression.',
      },
      {
        company: 'Cursor',
        person: 'Federico Cassano · AI Researcher',
        summary:
          'Uses elastic production and reinforcement-learning inference to shift capacity with traffic demand.',
      },
      {
        company: 'Vercel',
        person: 'Malte Ubl · CTO',
        summary:
          'Combines models and reinforcement learning to keep pace with rapidly changing coding-model performance.',
      },
      {
        company: 'Notion',
        person: 'Sarah Sachs · AI Lead',
        summary:
          'Reported lowering latency from roughly two seconds to about 350 milliseconds for AI features at scale.',
      },
      {
        company: 'Genspark',
        person: 'Kay Zhu · CTO',
        summary:
          'Described gaining control of its AI roadmap and improving quality within four weeks.',
      },
      {
        company: 'Quora',
        person: 'Spencer Chan · Product Lead',
        summary:
          'Reported a threefold response-time improvement after migrating an open-model workload.',
      },
      {
        company: 'Sourcegraph',
        person: 'Beyang Liu · CTO',
        summary:
          'Relies on fast model inference while focusing its own effort on tuning, code search, and deep code context.',
      },
      {
        company: 'UiPath',
        person: 'Mircea Neagovici-Negoescu · SVP, Head of AI',
        summary:
          'Runs open models through Azure Foundry for computer-use products with an emphasis on speed, cost, and quality.',
      },
      {
        company: 'rLLM',
        person: 'Kyle Montgomery & Sijun Tan · Core Contributors',
        summary:
          'Uses the Training SDK to concentrate on autonomous-agent research while Fireworks manages infrastructure.',
      },
      {
        company: 'Cresta',
        person: 'Tim Shi · Co-Founder',
        summary:
          'Uses Multi-LoRA as part of a strategy for custom AI trained on private enterprise data.',
      },
    ],
  },
  updates: {
    eyebrow: 'LATEST UPDATES',
    title: 'Recent releases and research from Fireworks.',
    items: [
      {
        date: '2026-08-31',
        type: 'Company News',
        title: 'Training API reaches general availability',
        href: 'https://fireworks.ai/blog',
      },
      {
        date: '2026-08-26',
        type: 'Model Release',
        title: 'DeepSeek V4 Pro performance and cost-per-task results',
        href: 'https://fireworks.ai/blog',
      },
      {
        date: '2026-08-26',
        type: 'Use Case',
        title: 'DeepSeek V4 Pro for security-agent economics',
        href: 'https://fireworks.ai/blog',
      },
    ],
  },
  footer: [
    {
      title: 'Platform',
      links: [
        { label: 'AI Native', href: 'https://fireworks.ai/ai-native' },
        { label: 'Enterprise', href: 'https://fireworks.ai/enterprise' },
        { label: 'Customers', href: 'https://fireworks.ai/customers' },
      ],
    },
    {
      title: 'Use Cases',
      links: [
        {
          label: 'Code Assistance',
          href: 'https://fireworks.ai/usecases/code-assistance',
        },
        {
          label: 'Conversational AI',
          href: 'https://fireworks.ai/usecases/conversational-ai',
        },
        {
          label: 'Agentic Systems',
          href: 'https://fireworks.ai/usecases/agentic-systems',
        },
        { label: 'Search', href: 'https://fireworks.ai/usecases/search' },
        {
          label: 'Multimodal',
          href: 'https://fireworks.ai/usecases/multimodal',
        },
        {
          label: 'Enterprise RAG',
          href: 'https://fireworks.ai/usecases/enterprise-rag',
        },
      ],
    },
    {
      title: 'Developers',
      links: [
        { label: 'Model Library', href: 'https://fireworks.ai/models' },
        { label: 'Docs', href: 'https://docs.fireworks.ai/' },
        {
          label: 'API',
          href: 'https://docs.fireworks.ai/api-reference/introduction',
        },
        { label: 'Changelog', href: 'https://docs.fireworks.ai/changelog' },
      ],
    },
    {
      title: 'Pricing & Partners',
      links: [
        { label: 'Pricing', href: 'https://fireworks.ai/pricing' },
        { label: 'Partners', href: 'https://fireworks.ai/partners' },
        { label: 'Enterprise', href: 'https://fireworks.ai/contact-reserved' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: 'https://fireworks.ai/blog' },
        { label: 'Demos', href: 'https://demos.fireworks.ai/' },
        {
          label: 'Cookbooks',
          href: 'https://docs.fireworks.ai/examples/introduction',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Leadership & Investors', href: 'https://fireworks.ai/team' },
        { label: 'Careers', href: 'https://fireworks.ai/careers' },
        { label: 'Trust Center', href: 'https://trust.fireworks.ai/' },
      ],
    },
  ],
} as const;
